// # 8. Глобальная тема приложения (useContext)

// ### Описание

// Реализуй переключение темы приложения (Light / Dark).

// ### Требования

// Нужно:

// - создать `ThemeContext`
// - создать `ThemeProvider`
// - хранить тему в состоянии
// - создать кнопку переключения темы
// - использовать тему в нескольких компонентах:
//   - Header
//   - Content
//   - Button

// ### Подсказки

// - `createContext`
// - `useContext`
// - provider должен оборачивать приложение

// ### Цель задания

// Понять:

// - как работает глобальное состояние
// - как избежать prop drilling

// ---
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme';

const ThemeSwitcher = ({ openModal }) => {
  const context = useContext(ThemeContext); //Достаем данные из Context (theme, toggleTheme)
  const { theme, toggleTheme } = context;
  // ❗ ручная защита от неправильного использования Context. если ты забыл обернуть приложение в <ThemeProvider>, то useContext(ThemeContext) вернёт null
  if (!context) {
    throw new Error('ThemeSwitcher must be used within ThemeProvider');
  }

  return (
    <>
      <button onClick={openModal}>
        Алгоритм реализации темы (Light / Dark Mode)
      </button>

      <button onClick={toggleTheme}>
        {theme === 'light' ? '🌞  Light' : '🌙  Dark'}
      </button>
    </>
  );
};

export default ThemeSwitcher;
