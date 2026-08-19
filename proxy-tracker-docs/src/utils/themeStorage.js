const THEME_KEY = 'app-theme-dark';

export const getStoredTheme = () => {
    try {
        const stored = localStorage.getItem(THEME_KEY);
        return stored !== null ? JSON.parse(stored) : true; // default: dark mode
    } catch {
        return true;
    }
};

export const setStoredTheme = (isDark) => {
    try {
        localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
    } catch {
        console.warn('localStorage unavailable or write failed');
    }
};