import axios from 'axios';

const DRAFT_SNAPSHOT_KEY = 'smartinvoice:draft-snapshot';
const RETURN_TO_KEY = 'smartinvoice:return-to';
const MAX_DRAFT_PAYLOAD_SIZE = 250000;

let hasHandledUnauthorized = false;

function appendFieldValue(container, key, value) {
  if (!key) {
    return;
  }

  if (Object.prototype.hasOwnProperty.call(container, key)) {
    const existingValue = container[key];
    container[key] = Array.isArray(existingValue)
      ? [...existingValue, value]
      : [existingValue, value];
    return;
  }

  container[key] = value;
}

function collectFormDrafts() {
  const forms = Array.from(document.querySelectorAll('form'));

  return forms.map((form, index) => {
    const values = {};
    const elements = Array.from(form.elements || []);

    elements.forEach((element) => {
      if (!element || !element.name || element.disabled) {
        return;
      }

      const tagName = element.tagName?.toLowerCase();
      if (!tagName || !['input', 'select', 'textarea'].includes(tagName)) {
        return;
      }

      const type = (element.type || '').toLowerCase();

      // Ignore sensitive or non-serializable field types.
      if (['password', 'file', 'submit', 'button', 'reset'].includes(type)) {
        return;
      }

      if ((type === 'checkbox' || type === 'radio') && !element.checked) {
        return;
      }

      appendFieldValue(values, element.name, element.value ?? '');
    });

    return {
      id: form.id || null,
      name: form.getAttribute('name') || null,
      index,
      values,
    };
  });
}

function preserveDraftBeforeRedirect() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.dispatchEvent(
      new CustomEvent('smartinvoice:before-auth-redirect', {
        detail: { reason: 'unauthorized' },
      })
    );

    const route = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    sessionStorage.setItem(RETURN_TO_KEY, route);

    const snapshot = {
      capturedAt: new Date().toISOString(),
      route,
      forms: collectFormDrafts(),
    };

    const serialized = JSON.stringify(snapshot);
    if (serialized.length <= MAX_DRAFT_PAYLOAD_SIZE) {
      sessionStorage.setItem(DRAFT_SNAPSHOT_KEY, serialized);
    }
  } catch (snapshotError) {
    console.warn('Failed to preserve draft before auth redirect:', snapshotError);
  }
}

/**
 * Axiose instance for centralized API communication
 * Base URL is configured via environment variables (VITE_API_URL)
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically attaches the Bearer token to every request
 */
api.interceptors.request.use(
  (config) => {
    // Get token from sessionStorage
    const token = sessionStorage.getItem('token');
    
    // Priority 2: If you use Redux in the future, you can import the store and get it from there:
    // import { store } from '../store';
    // const token = store.getState().auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Global error handling for common HTTP status codes
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global handling for 401 Unauthorized
    if (error.response && error.response.status === 401) {
      if (!hasHandledUnauthorized) {
        hasHandledUnauthorized = true;
        preserveDraftBeforeRedirect();
      }

      console.error('Session expired. Redirecting to login...');
      
      // Clear token from storage
      sessionStorage.removeItem('token');
      
      // Redirect to login (Full page reload to clear any sensitive state)
      if (window.location.pathname !== '/login') {
        window.location.assign('/login');
      }
    }

    // Global handling for 403 Quota Exceeded
    if (error.response && error.response.status === 403 && error.response.data?.error === 'quota_exceeded') {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('openUpgradeModal'));
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
