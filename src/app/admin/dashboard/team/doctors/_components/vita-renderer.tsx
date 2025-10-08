'use client';

import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';

interface VitaRendererProps {
  text: string;
}

export const VitaRenderer: React.FC<VitaRendererProps> = ({ text }) => {
  const sanitizedHtml = useMemo(() => {
    if (typeof window === 'undefined') {
      // Return a simple placeholder or empty content on the server
      return { __html: '' };
    }
    return { __html: DOMPurify.sanitize(text) };
  }, [text]);

  if (!text) {
    return null;
  }

  // Use a container with typography styles for better rendering of Quill's HTML
  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={sanitizedHtml}
    />
  );
};
