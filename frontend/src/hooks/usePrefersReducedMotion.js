import { useEffect, useState } from 'react';

export default function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);
  return reduced;
}
