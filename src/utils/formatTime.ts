export function formatTime(time: { mins: number; secs: number }): string {
  function padWithZeros(i: number): string {
    return i > 9 ? `${i}` : `0${i}`;
  }

  return `${padWithZeros(time.mins)}:${padWithZeros(time.secs)}`;
}
