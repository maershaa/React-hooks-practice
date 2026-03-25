import { ThemeContext } from '../index';
import { useState, useCallback, useEffect, useMemo } from 'react';

const ThemeProvider = ({ children }) => {
  // !Ленивая инициализация в React (lazy initialization) — это передача функции, а не готового значения, в хук usestate () = initialValue) , что позволяет вычислять начальное состояние только при первом рендере. Это оптимизирует производительность, избегая повторных тяжелых вычислений при каждом обновлении компонента.
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  }); //Берем тему из localStorage. если нету, то изначально задаем темную

  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []); //Используем useCallback для того чтобы функция создалась при 1 рендере и вызывалась только тогда, когда мы жмем по кнопке переключения темы

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]); //При изменении темы - записываем новую в localStorage

  const value = useMemo(() => {
    // useMemo так как с ним объект пересоздаётся только когда реально изменился theme
    return { theme, toggleTheme };
  }, [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
