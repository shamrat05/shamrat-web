import { useEffect } from 'react';

export const useIdlePrefetch = (
  tasks: Array<() => Promise<unknown>>,
  timeoutMs: number = 2000
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || tasks.length === 0) return;

    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      tasks.forEach((task) => {
        try {
          task();
        } catch {
          // Prefetch is best-effort; ignore errors.
        }
      });
    };

    if ('requestIdleCallback' in window) {
      const idleId = (window as unknown as { requestIdleCallback: Function }).requestIdleCallback(run, { timeout: timeoutMs });
      return () => {
        cancelled = true;
        (window as unknown as { cancelIdleCallback: Function }).cancelIdleCallback(idleId);
      };
    }

    const timeoutId = (window as typeof globalThis).setTimeout(run, timeoutMs);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [tasks, timeoutMs]);
};
