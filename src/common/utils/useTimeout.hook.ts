import { useEffect } from 'react';

function useTimeout(callback: () => void, status: string, delay = 1500) {
  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (status === 'success') {
      timerId = setTimeout(() => {
        callback();
      }, delay);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [status]);
}

export default useTimeout;
