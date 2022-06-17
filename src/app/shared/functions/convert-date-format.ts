// Convertit une date EU (dd/mm/yyyy) en date US (mm/dd/yyyy)
export function toUsDate(date: string): string {
  const [day, month, year] = date.split('/');
  const convertedDate = [month, day, year].join('/');

  return convertedDate;
}
