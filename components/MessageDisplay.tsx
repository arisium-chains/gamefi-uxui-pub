'use client';

import { useMiniappSDK } from '@/contexts/MiniappSDKContext';
import { useEffect } from 'react';

export default function MessageDisplay() {
  const { message, clearMessage } = useMiniappSDK();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  if (!message) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-6 py-3 shadow-lg max-w-sm">
        <p className="text-sm text-gray-800 text-center">{message}</p>
        <button
          onClick={clearMessage}
          className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}