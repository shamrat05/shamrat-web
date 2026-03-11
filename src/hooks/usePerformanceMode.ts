import { useEffect, useState } from 'react';

type PerformanceMode = 'full' | 'reduced';

type NavigatorPerf = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

const getInitialMode = (): PerformanceMode => {
  if (typeof window === 'undefined') return 'full';

  const nav = navigator as NavigatorPerf;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isSmallScreen = window.innerWidth < 768;

  const saveData = nav.connection?.saveData ?? false;
  const deviceMemory = nav.deviceMemory ?? 4;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
  const lowEnd = deviceMemory <= 3 || hardwareConcurrency <= 4;

  const reduced = prefersReducedMotion || saveData || lowEnd || (isCoarsePointer && isSmallScreen);
  const mode: PerformanceMode = reduced ? 'reduced' : 'full';
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.performance = mode;
  }
  return mode;
};

export const usePerformanceMode = () => {
  const [mode, setMode] = useState<PerformanceMode>(() => getInitialMode());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const nav = navigator as NavigatorPerf;
    const reducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerMql = window.matchMedia('(pointer: coarse)');

    const recompute = () => {
      const prefersReducedMotion = reducedMotionMql.matches;
      const isCoarsePointer = coarsePointerMql.matches;
      const isSmallScreen = window.innerWidth < 768;

      const saveData = nav.connection?.saveData ?? false;
      const deviceMemory = nav.deviceMemory ?? 4;
      const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;
      const lowEnd = deviceMemory <= 3 || hardwareConcurrency <= 4;

      const reduced = prefersReducedMotion || saveData || lowEnd || (isCoarsePointer && isSmallScreen);
      const nextMode: PerformanceMode = reduced ? 'reduced' : 'full';
      setMode(nextMode);
      document.documentElement.dataset.performance = nextMode;
    };

    recompute();

    const onChange = () => recompute();
    reducedMotionMql.addEventListener('change', onChange);
    coarsePointerMql.addEventListener('change', onChange);
    window.addEventListener('resize', onChange, { passive: true });

    return () => {
      reducedMotionMql.removeEventListener('change', onChange);
      coarsePointerMql.removeEventListener('change', onChange);
      window.removeEventListener('resize', onChange);
    };
  }, []);

  return {
    mode,
    isReduced: mode === 'reduced',
  };
};
