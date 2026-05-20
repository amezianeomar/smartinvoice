import React from 'react';

export default function HighlightText({ text = '', highlight = '' }) {
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>;
  }

  // Escape special regex characters in the highlight string to prevent errors
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = String(text).split(regex);

  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="font-black text-[#18adf2] bg-[#18adf2]/10 px-0.5 rounded shadow-sm">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}
