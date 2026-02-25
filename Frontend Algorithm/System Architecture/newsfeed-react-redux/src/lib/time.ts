const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

export function formatRelativeTime(fromEpochMs: number, nowEpochMs = Date.now()): string {
  const deltaSeconds = Math.round((fromEpochMs - nowEpochMs) / 1000);

  const divisions: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['week', 60 * 60 * 24 * 7],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];

  for (const [unit, secondsInUnit] of divisions) {
    if (Math.abs(deltaSeconds) >= secondsInUnit || unit === 'second') {
      const value = Math.trunc(deltaSeconds / secondsInUnit);
      return rtf.format(value, unit);
    }
  }

  return 'just now';
}
