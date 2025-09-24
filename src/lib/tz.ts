import { format, fromUnixTime } from 'date-fns';

export type Timezone = 'IST' | 'UTC';

const TZ_STORAGE_KEY = 'crypto-platform-timezone';

export function loadTzPref(): Timezone {
  if (typeof window === 'undefined') return 'IST';
  return (localStorage.getItem(TZ_STORAGE_KEY) as Timezone) || 'IST';
}

export function saveTzPref(tz: Timezone): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TZ_STORAGE_KEY, tz);
}

export function formatUnixSec(unixSec: number, tz: Timezone = 'IST'): string {
  const date = fromUnixTime(unixSec);
  
  if (tz === 'UTC') {
    return format(date, 'MMM dd, yyyy HH:mm:ss') + ' UTC';
  } else {
    // For IST, add 5.5 hours to UTC
    const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    return format(istDate, 'MMM dd, yyyy HH:mm:ss') + ' IST';
  }
}

export function formatTime(unixSec: number, tz: Timezone = 'IST'): string {
  const date = fromUnixTime(unixSec);
  
  if (tz === 'UTC') {
    return format(date, 'HH:mm:ss');
  } else {
    const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    return format(istDate, 'HH:mm:ss');
  }
}

export function formatDate(unixSec: number, tz: Timezone = 'IST'): string {
  const date = fromUnixTime(unixSec);
  
  if (tz === 'UTC') {
    return format(date, 'MMM dd, yyyy');
  } else {
    const istDate = new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    return format(istDate, 'MMM dd, yyyy');
  }
}

export function getTimezoneOffset(tz: Timezone): number {
  return tz === 'IST' ? 5.5 : 0;
}

export function convertToTimezone(unixSec: number, tz: Timezone): Date {
  const date = fromUnixTime(unixSec);
  if (tz === 'UTC') {
    return date;
  } else {
    return new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
  }
}