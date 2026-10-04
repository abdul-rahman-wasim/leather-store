import { useEffect, useState } from "react";

const CUTOFF_HOUR = 18;

/** Time left until the next 18:00 atelier dispatch. Null until mounted, so server and client markup match. */
export function useDispatchCountdown(tickMs = 1000) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, tickMs);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [tickMs]);

  if (now === null) return null;
  const cutoff = new Date(now);
  cutoff.setHours(CUTOFF_HOUR, 0, 0, 0);
  const tomorrow = now >= cutoff.getTime();
  if (tomorrow) cutoff.setDate(cutoff.getDate() + 1);
  const secs = Math.floor((cutoff.getTime() - now) / 1000);
  return {
    hours: Math.floor(secs / 3600),
    minutes: Math.floor((secs % 3600) / 60),
    seconds: secs % 60,
    tomorrow,
  };
}
