import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const { oauthLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (error) {
      // Redirect to login with error
      navigate('/login?error=' + encodeURIComponent(error));
      return;
    }

    if (token) {
      // Set the token
      oauthLogin(token);
      
      // Check if there's a pending return URL
      const returnTo = sessionStorage.getItem('smartinvoice:return-to');
      if (returnTo) {
        sessionStorage.removeItem('smartinvoice:return-to');
        navigate(returnTo);
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  }, [searchParams, oauthLogin, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712]">
      <Loader2 size={48} className="text-[#18adf2] animate-spin mb-4" />
      <p className="text-white/70 font-medium">Authentification en cours...</p>
    </div>
  );
}
