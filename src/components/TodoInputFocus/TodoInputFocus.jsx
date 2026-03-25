// # 4. Фокус на input через useRef

// ### Описание

// Создай форму добавления задач (Todo input). После добавления задачи фокус должен
// автоматически возвращаться в поле ввода.

// ### Требования

// Нужно:

// - создать input
// - создать кнопку `Add`
// - хранить список задач в `useState`
// - после добавления задачи:
//   - поле очищается
//   - курсор автоматически возвращается в input

// ### Подсказки

// - `useRef(null)`
// - `inputRef.current.focus()`

// ### Цель задания

// Понять:

// - как `useRef` работает с DOM
// - как управлять элементами интерфейса напрямую

// ---
import { useRef, useState } from 'react';

const TodoInputFocus = () => {
  const [todoList, setTodoList] = useState([
    'Купить билет на поезд',
    'Сделать тренировку по йоге',
    'Разобрать почту и удалить спам',
  ]);
  const inputRef = useRef(null);

  const handelSubmit = evt => {
    evt.preventDefault();

    let currentValue = evt.target.todo.value;
    if (!currentValue) return;
    setTodoList(prev => {
      return [...prev, currentValue.trim()];
    });

    evt.target.todo.value = '';

    inputRef.current.focus();
  };

  return (
    <>
      <h2>Todo Input Focus</h2>
      <p>
        Реализация формы добавления задач. После добавления задачи фокус должен
        автоматически возвращаться в поле ввода.
      </p>
      <form onSubmit={handelSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="Веедите задачу"
          ref={inputRef}
        />
        <button type="submit"> Add</button>
      </form>
      {todoList.length > 0 && (
        <>
          <h3>Todo list</h3>
          <ul>
            {todoList.map(task => (
              <li key={task}>{task}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default TodoInputFocus;
