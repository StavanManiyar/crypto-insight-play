import { create } from 'zustand';
import { loadTzPref, saveTzPref, type Timezone } from '@/lib/tz';

interface TimezoneStore {
  timezone: Timezone;
  setTimezone: (tz: Timezone) => void;
}

export const useTimezoneStore = create<TimezoneStore>((set) => ({
  timezone: loadTzPref(),
  setTimezone: (tz: Timezone) => {
    set({ timezone: tz });
    saveTzPref(tz);
  },
}));

export function useTimezonePref() {
  return useTimezoneStore();
}