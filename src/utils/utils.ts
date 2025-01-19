export const integerRange = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const convertSecondsToTime = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds = totalSeconds % ( 24 * 3600 );
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  totalSeconds %= 60;
  const seconds = Math.floor(totalSeconds);

  const format: string[] = [];
  if (days > 0) format.push(`${days}d`);
  if (hours > 0) format.push(`${hours}h`);
  if (minutes > 0) format.push(`${minutes}m`);
  format.push(`${seconds}s`);

  return format.join(' ');
}
