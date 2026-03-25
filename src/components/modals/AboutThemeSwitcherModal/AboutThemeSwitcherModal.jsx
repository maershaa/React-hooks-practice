import React from 'react';
import './AboutThemeSwitcherModal.css';

const AboutThemeSwitcherModal = () => {
  return (
    <div className="container">
      <h2 className="title">🎨 Алгоритм реализации темы (Light / Dark Mode)</h2>

      <div className="section">
        <h3 className="subtitle">
          ШАГ 1 — ThemeContext (инициализация контекста)
        </h3>

        <p className="text">Путь к файлу: context/ThemeContext.jsx</p>

        <p className="text">
          Зачем: создаёт глобальный канал передачи состояния темы между
          компонентами без prop drilling.
        </p>

        <p className="text">
          Что решает: централизованный доступ к theme и toggleTheme +
          возможность runtime-ошибки при неправильном использовании Provider.
        </p>

        <pre className="codeBlock">
          {`import { createContext } from 'react';

const ThemeContext = createContext(null);

export default ThemeContext;`}
        </pre>

        <ul className="list">
          <li className="listItem">
            null используется как guard value для раннего обнаружения ошибок
            архитектуры
          </li>
          <li className="listItem">
            контекст не содержит бизнес-логики — только контракт
          </li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h3 className="subtitle">
          ШАГ 2 — ThemeProvider (инициализация состояния темы)
        </h3>

        <p className="text">Путь к файлу: context/ThemeProvider.jsx</p>

        <p className="text">
          Зачем: инкапсулирует state machine темы (light/dark) и управляет её
          жизненным циклом.
        </p>

        <p className="text">
          Что решает: хранение состояния, ленивую инициализацию, persistence
          через localStorage.
        </p>

        <pre className="codeBlock">
          {`// !Ленивая инициализация в React (lazy initialization) — это передача функции,
          // а не готового значения, в хук usestate () = initialValue) , что позволяет вычислять 
          // начальное состояние только при первом рендере. Это оптимизирует производительность,
          //  избегая повторных тяжелых вычислений при каждом обновлении компонента.


const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'dark';
});`}
        </pre>

        <ul className="list">
          <li className="listItem">
            lazy initialization предотвращает повторные чтения localStorage
          </li>
          <li className="listItem">
            default fallback = 'dark' как системное поведение
          </li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h3 className="subtitle">
          ШАГ 3 — toggleTheme (useCallback оптимизация)
        </h3>

        <p className="text">
          Зачем: создаёт стабильную ссылку на функцию переключения темы.
        </p>

        <p className="text">
          Что решает: предотвращает лишние re-renders дочерних компонентов при
          передаче функции через Context.
        </p>

        <pre className="codeBlock">
          {`const toggleTheme = useCallback(() => {
  setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
}, []);`}
        </pre>

        <ul className="list">
          <li className="listItem">
            functional update предотвращает зависимости от theme
          </li>
          <li className="listItem">
            useCallback стабилизирует identity функции
          </li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h3 className="subtitle">
          ШАГ 4 — useEffect синхронизация DOM + localStorage
        </h3>

        <p className="text">
          Зачем: синхронизирует React state с внешними системами (DOM +
          persistence layer).
        </p>

        <p className="text">
          Что решает: визуальное применение темы через CSS + сохранение выбора
          пользователя.
        </p>

        <pre className="codeBlock">
          {`useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);`}
        </pre>

        <ul className="list">
          <li className="listItem">
            DOM layer: CSS селекторы реагируют на [data-theme]
          </li>
          <li className="listItem">
            Persistence layer: localStorage сохраняет состояние между сессиями
          </li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h3 className="subtitle">
          ШАГ 5 — useMemo (оптимизация value объекта Context)
        </h3>

        <p className="text">
          Зачем: предотвращает лишнюю пересборку объекта value в Provider.
        </p>

        <p className="text">
          Что решает: предотвращение ненужных re-renders всех consumers Context.
        </p>

        <pre className="codeBlock">
          {`const value = useMemo(() => {
  return { theme, toggleTheme };
}, [theme, toggleTheme]);`}
        </pre>

        <ul className="list">
          <li className="listItem">value сохраняет referential stability</li>
          <li className="listItem">минимизирует cascade re-render в tree</li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h3 className="subtitle">
          ШАГ 6 — ThemeContext.Provider (инъекция состояния в дерево React)
        </h3>

        <p className="text">
          Зачем: делает theme state доступным всему subtree приложения.
        </p>

        <p className="text">
          Что решает: глобальная доступность состояния без prop drilling.
        </p>

        <pre className="codeBlock">
          {`return (
  <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
);`}
        </pre>

        <ul className="list">
          <li className="listItem">единая точка распространения состояния</li>
          <li className="listItem">
            изоляция логики темы в одном provider слое
          </li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h3 className="subtitle">
          ШАГ 7 — Подключение Provider в entry point (StrictMode tree)
        </h3>

        <p className="text">Путь к файлу: main.jsx</p>

        <p className="text">
          Зачем: внедряет ThemeProvider на уровень root приложения.
        </p>

        <p className="text">
          Что решает: гарантирует доступ к теме во всех компонентах.
        </p>

        <pre className="codeBlock">
          {`<StrictMode>
  <ThemeProvider>
    <App />
  </ThemeProvider>
</StrictMode>`}
        </pre>

        <ul className="list">
          <li className="listItem">
            Provider становится глобальным state container
          </li>
          <li className="listItem">
            StrictMode не влияет на state, но помогает выявлять side effects
          </li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h3 className="subtitle">
          ШАГ 8 — useContext в App (consumption layer + runtime guard)
        </h3>

        <p className="text">Путь к файлу: App.jsx</p>

        <p className="text">
          Зачем: извлекает theme state из Context для использования в UI логике.
        </p>

        <p className="text">
          Что решает: доступ к глобальному состоянию и защита от неправильной
          архитектуры.
        </p>

        <pre className="codeBlock">
          {`const context = useContext(ThemeContext);

if (!context) {
  throw new Error('ThemeSwitcher must be used within ThemeProvider');
}

const { theme, toggleTheme } = context;`}
        </pre>

        <ul className="list">
          <li className="listItem">
            runtime guard предотвращает silent failure архитектуры
          </li>
          <li className="listItem">явная ошибка вместо undefined behavior</li>
        </ul>
      </div>

      <hr className="divider" />

      <div className="section">
        <h3 className="subtitle">
          ШАГ 9 — ThemeSwitcher (UI interaction layer)
        </h3>

        <p className="text">Путь к файлу: components/ThemeSwitcher.jsx</p>

        <p className="text">
          Зачем: предоставляет пользовательский интерфейс управления темой.
        </p>

        <p className="text">
          Что решает: связывает user interaction с global state toggle API.
        </p>

        <pre className="codeBlock">
          {`const { theme, toggleTheme } = useContext(ThemeContext);

return (
  <button onClick={toggleTheme}>
    {theme === 'light' ? '🌞 Light' : '🌙 Dark'}
  </button>
);`}
        </pre>

        <ul className="list">
          <li className="listItem">
            UI слой полностью stateless относительно логики темы
          </li>
          <li className="listItem">реагирует только на Context state</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutThemeSwitcherModal;
