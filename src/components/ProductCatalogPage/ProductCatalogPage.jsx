// # 9. Оптимизация списка товаров (useMemo + useCallback)

// ### Описание

// Создай страницу со списком товаров и поиском.

// ### Требования

// Нужно:

// - список из 100+ товаров
// - поле поиска
// - фильтрация по названию

// Оптимизация:

// - фильтрация должна быть обёрнута в `useMemo`
// - обработчик поиска должен быть обёрнут в `useCallback`

// ### Подсказки

// - `useMemo(() => ..., [dependencies])`
// - `useCallback(() => ..., [dependencies])`

// ### Цель задания

// Понять:

// - зачем нужны `useMemo` и `useCallback`
// - как оптимизировать лишние вычисления

// ---

import { useState, useMemo, useEffect } from 'react';

const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(t);
    };
  }, [delay, value]);

  return debouncedValue;
};

const items = [
  { id: 1, name: 'tulip', img: '🌷', price: 2.67, quantity: 3 },
  { id: 2, name: 'orchid', img: '🌸', price: 5.12, quantity: 2 },
  { id: 3, name: 'rose', img: '🌹', price: 3.45, quantity: 5 },
  { id: 4, name: 'sunflower', img: '🌻', price: 1.99, quantity: 4 },
  { id: 5, name: 'lily', img: '🌺', price: 4.2, quantity: 1 },
  { id: 6, name: 'peony', img: '🌸', price: 6.15, quantity: 2 },
  { id: 7, name: 'daisy', img: '🌼', price: 1.5, quantity: 6 },
  { id: 8, name: 'lavender', img: '💜', price: 2.85, quantity: 3 },
  { id: 9, name: 'cherry blossom', img: '🌸', price: 3.9, quantity: 2 },
  { id: 10, name: 'hibiscus', img: '🌺', price: 2.4, quantity: 4 },

  { id: 11, name: 'iris', img: '🌸', price: 3.1, quantity: 2 },
  { id: 12, name: 'daffodil', img: '🌼', price: 2.2, quantity: 5 },
  { id: 13, name: 'violet', img: '💜', price: 1.8, quantity: 6 },
  { id: 14, name: 'gardenia', img: '🌼', price: 4.75, quantity: 1 },
  { id: 15, name: 'lotus', img: '🪷', price: 6.9, quantity: 2 },
  { id: 16, name: 'magnolia', img: '🌸', price: 5.3, quantity: 2 },
  { id: 17, name: 'carnation', img: '🌺', price: 2.1, quantity: 5 },
  { id: 18, name: 'hyacinth', img: '🌸', price: 3.6, quantity: 3 },
  { id: 19, name: 'camellia', img: '🌺', price: 4.1, quantity: 2 },
  { id: 20, name: 'bluebell', img: '🔵', price: 1.7, quantity: 6 },

  { id: 21, name: 'poppy', img: '🌺', price: 2.3, quantity: 4 },
  { id: 22, name: 'begonia', img: '🌸', price: 3.2, quantity: 3 },
  { id: 23, name: 'geranium', img: '🌺', price: 2.6, quantity: 4 },
  { id: 24, name: 'azalea', img: '🌸', price: 4.4, quantity: 2 },
  { id: 25, name: 'anemone', img: '🌼', price: 3.0, quantity: 3 },
  { id: 26, name: 'dahlia', img: '🌺', price: 5.5, quantity: 2 },
  { id: 27, name: 'marigold', img: '🌼', price: 1.9, quantity: 5 },
  { id: 28, name: 'zinnia', img: '🌸', price: 2.7, quantity: 4 },
  { id: 29, name: 'freesia', img: '🌼', price: 3.8, quantity: 2 },
  { id: 30, name: 'ranunculus', img: '🌸', price: 4.6, quantity: 2 },

  { id: 31, name: 'snapdragon', img: '🌼', price: 2.5, quantity: 4 },
  { id: 32, name: 'aster', img: '🌸', price: 2.9, quantity: 3 },
  { id: 33, name: 'begonia red', img: '🌺', price: 3.1, quantity: 2 },
  { id: 34, name: 'tulip pink', img: '🌷', price: 2.8, quantity: 5 },
  { id: 35, name: 'tulip white', img: '🌷', price: 2.6, quantity: 4 },
  { id: 36, name: 'tulip yellow', img: '🌷', price: 2.7, quantity: 3 },
  { id: 37, name: 'orchid white', img: '🌸', price: 6.2, quantity: 2 },
  { id: 38, name: 'orchid purple', img: '🌸', price: 6.5, quantity: 2 },
  { id: 39, name: 'orchid pink', img: '🌸', price: 6.1, quantity: 2 },
  { id: 40, name: 'rose red', img: '🌹', price: 3.9, quantity: 5 },

  { id: 41, name: 'rose white', img: '🌹', price: 3.7, quantity: 4 },
  { id: 42, name: 'rose pink', img: '🌹', price: 3.8, quantity: 5 },
  { id: 43, name: 'sunflower mini', img: '🌻', price: 1.6, quantity: 6 },
  { id: 44, name: 'sunflower giant', img: '🌻', price: 2.4, quantity: 3 },
  { id: 45, name: 'lily white', img: '🌺', price: 4.5, quantity: 2 },
  { id: 46, name: 'lily pink', img: '🌺', price: 4.3, quantity: 2 },
  { id: 47, name: 'peony white', img: '🌸', price: 6.4, quantity: 2 },
  { id: 48, name: 'peony pink', img: '🌸', price: 6.7, quantity: 2 },
  { id: 49, name: 'lavender french', img: '💜', price: 2.9, quantity: 3 },
  { id: 50, name: 'lavender wild', img: '💜', price: 2.6, quantity: 4 },

  { id: 51, name: 'iris blue', img: '🌸', price: 3.3, quantity: 2 },
  { id: 52, name: 'iris purple', img: '🌸', price: 3.4, quantity: 2 },
  { id: 53, name: 'daisy white', img: '🌼', price: 1.4, quantity: 6 },
  { id: 54, name: 'daisy yellow', img: '🌼', price: 1.6, quantity: 5 },
  { id: 55, name: 'lotus pink', img: '🪷', price: 7.1, quantity: 2 },
  { id: 56, name: 'lotus white', img: '🪷', price: 7.3, quantity: 2 },
  { id: 57, name: 'magnolia white', img: '🌸', price: 5.6, quantity: 2 },
  { id: 58, name: 'magnolia pink', img: '🌸', price: 5.8, quantity: 2 },
  { id: 59, name: 'camellia red', img: '🌺', price: 4.2, quantity: 3 },
  { id: 60, name: 'camellia white', img: '🌺', price: 4.0, quantity: 3 },

  { id: 61, name: 'poppy red', img: '🌺', price: 2.2, quantity: 5 },
  { id: 62, name: 'poppy orange', img: '🌺', price: 2.3, quantity: 4 },
  { id: 63, name: 'geranium pink', img: '🌺', price: 2.7, quantity: 4 },
  { id: 64, name: 'geranium red', img: '🌺', price: 2.8, quantity: 4 },
  { id: 65, name: 'azalea white', img: '🌸', price: 4.5, quantity: 2 },
  { id: 66, name: 'azalea pink', img: '🌸', price: 4.6, quantity: 2 },
  { id: 67, name: 'dahlia red', img: '🌺', price: 5.7, quantity: 2 },
  { id: 68, name: 'dahlia white', img: '🌺', price: 5.4, quantity: 2 },
  { id: 69, name: 'marigold orange', img: '🌼', price: 1.8, quantity: 6 },
  { id: 70, name: 'marigold yellow', img: '🌼', price: 1.7, quantity: 6 },

  { id: 71, name: 'zinnia pink', img: '🌸', price: 2.8, quantity: 4 },
  { id: 72, name: 'zinnia red', img: '🌸', price: 2.9, quantity: 4 },
  { id: 73, name: 'freesia white', img: '🌼', price: 3.7, quantity: 3 },
  { id: 74, name: 'freesia yellow', img: '🌼', price: 3.6, quantity: 3 },
  { id: 75, name: 'ranunculus pink', img: '🌸', price: 4.7, quantity: 2 },
  { id: 76, name: 'ranunculus white', img: '🌸', price: 4.8, quantity: 2 },
  { id: 77, name: 'snapdragon pink', img: '🌼', price: 2.6, quantity: 4 },
  { id: 78, name: 'snapdragon white', img: '🌼', price: 2.4, quantity: 4 },
  { id: 79, name: 'aster purple', img: '🌸', price: 3.0, quantity: 3 },
  { id: 80, name: 'aster blue', img: '🌸', price: 2.8, quantity: 3 },

  { id: 81, name: 'orchid mini', img: '🌸', price: 5.9, quantity: 2 },
  { id: 82, name: 'rose garden mix', img: '🌹', price: 4.0, quantity: 5 },
  { id: 83, name: 'tulip spring mix', img: '🌷', price: 3.0, quantity: 6 },
  { id: 84, name: 'sunflower field', img: '🌻', price: 2.2, quantity: 4 },
  { id: 85, name: 'lily bouquet', img: '🌺', price: 4.9, quantity: 2 },
  { id: 86, name: 'peony deluxe', img: '🌸', price: 7.0, quantity: 2 },
  { id: 87, name: 'lavender bouquet', img: '💜', price: 3.0, quantity: 3 },
  { id: 88, name: 'daisy field', img: '🌼', price: 1.5, quantity: 6 },
  { id: 89, name: 'hibiscus tropical', img: '🌺', price: 2.6, quantity: 4 },
  { id: 90, name: 'lotus sacred', img: '🪷', price: 7.5, quantity: 2 },

  { id: 91, name: 'rose luxury', img: '🌹', price: 5.0, quantity: 5 },
  { id: 92, name: 'orchid premium', img: '🌸', price: 7.2, quantity: 2 },
  { id: 93, name: 'tulip luxury', img: '🌷', price: 3.5, quantity: 5 },
  { id: 94, name: 'sunflower premium', img: '🌻', price: 2.8, quantity: 3 },
  { id: 95, name: 'lily premium', img: '🌺', price: 5.2, quantity: 2 },
  { id: 96, name: 'peony royal', img: '🌸', price: 7.4, quantity: 2 },
  { id: 97, name: 'lavender elite', img: '💜', price: 3.2, quantity: 3 },
  { id: 98, name: 'daisy premium', img: '🌼', price: 1.9, quantity: 6 },
  { id: 99, name: 'camellia elite', img: '🌺', price: 4.8, quantity: 3 },
  { id: 100, name: 'orchid ultimate', img: '🌸', price: 8.0, quantity: 2 },
];

const ProductCatalogPage = () => {
  const [query, setQuery] = useState('');

  const debouncedValue = useDebounce(query);

  const filteredItems = useMemo(() => {
    const normalizedQuery = debouncedValue.trim().toLowerCase();

    if (!normalizedQuery) return items;
    return items.filter(item =>
      item.name.toLowerCase().includes(normalizedQuery)
    );
  }, [debouncedValue]);

  return (
    <>
      <h2>ProductCatalogPage</h2>
      <p>
        Поиск товаров с оптимизацией: <strong>useDebounce</strong>
        снижает количество вычислений при вводе, <strong>useMemo</strong>
        кеширует фильтрацию списка.
      </p>{' '}
      <input
        type="text"
        onChange={e => setQuery(e.target.value)}
        value={query}
        placeholder="Start typing flower name ..."
      />
      <ul>
        {filteredItems.map(({ id, name, img, price, quantity }) => (
          <li key={id}>
            <p> {img}</p>
            <h3>{name}</h3>
            <p>Price: {price}$</p>
            <p>Quantity in stock: {quantity}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductCatalogPage;
