export function formatTo12HourTime(isoString: string): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) return ''; // handle invalid date

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // 0 -> 12
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}
