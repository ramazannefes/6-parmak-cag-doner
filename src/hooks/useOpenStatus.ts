import { useEffect, useState } from 'react';

type OpenStatus = { open: boolean; today: number };

function compute(): OpenStatus {
  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Istanbul', hour: '2-digit', hour12: false }).format(now)
  );
  const dayKey = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Istanbul', weekday: 'short' }).format(now);
  const dayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const today = dayMap[dayKey] ?? now.getDay();
  const open = today === 0 ? hour >= 12 && hour < 19 : hour >= 11 && hour < 20;
  return { open, today };
}

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(compute);
  useEffect(() => {
    const t = setInterval(() => setStatus(compute()), 60_000);
    return () => clearInterval(t);
  }, []);
  return status;
}

export function useIstanbulClock(): string {
  const [time, setTime] = useState('--:--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('tr-TR', {
      timeZone: 'Europe/Istanbul',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}
