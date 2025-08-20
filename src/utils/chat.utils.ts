export const toKstDate = (iso: string | Date) => {
  const kst = typeof iso === 'string' ? Date.parse(iso) : iso.getTime();
  return new Date(kst + 9 * 60 * 60 * 1000);
};

export const toDateKey = (dt: Date) => {
  const year = dt.getUTCFullYear();
  const month = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const day = String(dt.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const toFiveMinutesKey = (dt: Date) => {
  const hour = String(dt.getUTCHours()).padStart(2, '0');
  const minute = dt.getUTCMinutes();
  const flooredMinute = String(Math.floor(minute / 5) * 5).padStart(2, '0');
  return `${hour}:${flooredMinute}`;
};
