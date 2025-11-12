export function getLocalStorage<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);
  if (!item) return defaultValue;
  
  try {
    return JSON.parse(item) as T;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function removeLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

export function clearLocalStorage(): void {
  localStorage.clear();
}

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  LAST_ROUTE: 'last_route',
} as const;