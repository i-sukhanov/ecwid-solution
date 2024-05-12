import { LocalStorageKeys } from '@/enums/LocalStorage'


export function useLocalStorage<T>(key: LocalStorageKeys): {
  getItem: () => T | null;
  setItem: (value: T) => void;
  removeItem: () => void;
} {
  return {
    getItem: () => {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item) as T;
        } catch (error) {
          console.error(`Error parsing localStorage item '${key}':`, error);
        }
      }
      return null;
    },

    setItem: (value: T) => {
      try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error(`Error serializing value for localStorage item '${key}':`, error);
      }
    },

    removeItem: () => {
      localStorage.removeItem(key);
    },
  };
}
