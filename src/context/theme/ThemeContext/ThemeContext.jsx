import { createContext } from 'react';

// Создаем контекст
// null — чтобы можно было отловить ошибку вне Provider
const ThemeContext = createContext(null);

export default ThemeContext;
