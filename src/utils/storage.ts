export const saveStore = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Error setting localStorage:", err);
  }
};

export const loadStore = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    console.error("Error getting localStorage:", err);
    return null;
  }
};

export const removeStore = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Error removing localStorage:", err);
  }
};

export const clearStore = (): void => {
  try {
    localStorage.clear();
  } catch (err) {
    console.error("Error clearing localStorage:", err);
  }
};
