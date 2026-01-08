import { useEffect } from 'react';

export default function BackendRedirect({ to }) {
  useEffect(() => {
    const backendOrigin = import.meta.env.VITE_BACKEND_ORIGIN;
    const path = to && to.startsWith('/') ? to : '/' + (to || '');
    window.location.href = backendOrigin + path;
  }, [to]);

  return null;
}
