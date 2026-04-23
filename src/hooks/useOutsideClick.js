import { useEffect } from 'react';

export function useOutsideClick(ref, callback) {
  useEffect(() => {
    const handleClick = (e) => {
      if (!ref.current) return;

      if (!ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
}
