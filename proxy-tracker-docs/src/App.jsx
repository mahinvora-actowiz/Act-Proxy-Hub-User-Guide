import React, { createContext, useContext, useEffect, useState } from 'react';
import { getStoredTheme, setStoredTheme } from './utils/themeStorage';

import AppRouter from './router/AppRouter';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export default function App() {
  const [darkMode, setDarkMode] = useState(() => getStoredTheme());

  useEffect(() => {
    setStoredTheme(darkMode);
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <AppRouter />
    </ThemeContext.Provider>
  );
}