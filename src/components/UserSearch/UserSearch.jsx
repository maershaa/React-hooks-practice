// # 5. Поиск пользователей с API

// ### Описание

// Создай поле поиска пользователей. При вводе текста должен выполняться запрос к
// API.

// Можно использовать API:

// ```
// https://jsonplaceholder.typicode.com/users
// ```

// ### Требования

// Нужно:

// - создать `input`

// - хранить `search`

// - при изменении `search`:
//   - делать `fetch`
//   - фильтровать пользователей по имени
//   - отображать список

// - добавить состояние:
//   - `loading`
//   - `error`

// ### Подсказки

// - `useEffect`
// - зависимости `[search]`
// - `fetch` внутри эффекта

// ### Цель задания

// Понять:

// - работу `useEffect` с асинхронными запросами
// - управление состояниями загрузки

// ---

import { useEffect, useState, useMemo } from 'react';

// Кастомный Хук для дебаунса значения, чтобы поиск пользователей не срабатывал на каждый символ ввода, а только после небольшой паузы
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer); // очищаем таймер при изменении value
  }, [value, delay]);

  return debouncedValue;
};

const UserSearch = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

  const debauncedSearch = useDebounce(search, 300);

  const filteredUsers = useMemo(() => {
    if (!debauncedSearch.trim()) return []; // если поиск пустой, возвращаем пустой массив

    return users.filter(
      user =>
        user.name
          .toLowerCase()
          .includes(debauncedSearch.trim().toLowerCase()) ||
        user.username
          .toLowerCase()
          .includes(debauncedSearch.trim().toLowerCase())
    );
  }, [debauncedSearch, users]); // пересчитываем только при изменении search или users

  const getUsers = async () => {
    const resp = await fetch(BASE_URL);
    if (!resp.ok) {
      throw new Error('Not Found');
    }
    return resp.json();
  };

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []); // useEffect для загрузки пользователей один раз при монтировании

  return (
    <>
      <h2>User Search API</h2>
      <p>
        Запрос за списком пользователей на API и фильтрация по имени из
        пришедшего списка
      </p>
      {loading && <p>Loading ...</p>}
      {error && <p>😡😡😡😡Error!!!😡😡😡😡 {error}</p>}
      <p>
        Начните вводить имя пользователя.
        <br />
        <small>
          Например: <strong>'Lea'</strong>
        </small>
      </p>{' '}
      <input
        type="text"
        value={search}
        onChange={evt => setSearch(evt.target.value)}
      />
      {filteredUsers.length > 0 && (
        <ul>
          {filteredUsers.map(
            ({ id, name, username, email, address: { city }, website }) => (
              <li key={id}>
                <h3> {name}</h3>
                <h4>@{username.toLowerCase()}</h4>
                <p>Email:{email}</p>
                <p>Location:{city}</p>
                <p>Website:{website}</p>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};

export default UserSearch;
