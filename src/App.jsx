import { useContext, useState } from 'react';

import {
  Counter,
  Timer,
  IsFirstRenderForm,
  TodoInputFocus,
  TodoList,
  Countdown,
  UserSearch,
  ProfileForm,
  AutoSaveUserForm,
  ShoppingCart,
  ThemeSwitcher,
  Modal,
  AboutThemeSwitcherModal,
  ProductCatalogPage,
} from './components/index';

import { ThemeContext } from './context/theme';

function App() {
  const context = useContext(ThemeContext); //Достаем данные из Context (theme, toggleTheme)
  // ❗ ручная защита от неправильного использования Context. если ты забыл обернуть приложение в <ThemeProvider>, то useContext(ThemeContext) вернёт null
  if (!context) {
    throw new Error('ThemeSwitcher must be used within ThemeProvider');
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main>
      {/* задаем тему приложению */}
      <header>
        <ThemeSwitcher openModal={openModal} />
        {/* useContext */}
      </header>
      <hr />
      <Counter />
      {/* useState, useEffect  */}
      <hr />
      <Timer />
      {/* useState, useEffect, useRef */}
      <hr />
      <IsFirstRenderForm />
      {/* useEffect, useRef, useState  */}
      <hr />
      <TodoInputFocus />
      {/*  useRef, useState  */}
      <hr />
      <TodoList />
      <hr />
      <UserSearch />
      {/* useEffect, useState, useMemo, кастомный useDebounce */}
      <hr />
      <AutoSaveUserForm />
      {/* useState, useEffect */}
      <hr />
      <ShoppingCart />
      {/* useReducer */}
      <hr />
      <ProductCatalogPage />
      {/* useState, useMemo, useEffect, кастомный useDebounce */}
      <hr />
      <Countdown start={10} />
      {/* useState и useEffect без зависимостей */}
      <hr />
      <ProfileForm />
      {/* useEffect, useRef, useState, сохранение введенных данных в sessionStorage  */}
      <hr />
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <AboutThemeSwitcherModal />
        </Modal>
      )}
    </main>
  );
}

export default App;
