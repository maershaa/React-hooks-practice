// ## 🧩 Todo List на `useReducer`

// Сделай список задач.

// ### Нужно:

// * добавлять задачу
// * удалять задачу
// * отмечать как выполненную
// * фильтровать список:

//   * `all`
//   * `active`
//   * `completed`
// * кнопка `Clear completed`

// ---

// ### Использовать:

// * `useReducer` для state
// * `useMemo` для фильтрации

// ---

// ### Actions:

// ```js
// ADD_TODO
// TOGGLE_TODO
// REMOVE_TODO
// SET_FILTER
// CLEAR_COMPLETED
// ```

// ---

// ### State:

// ```js
// {
//   todos: [],
//   filter: 'all'
// }
// ```

// ---

// 👉 Цель: научиться управлять сложным state через reducer и отделять логику от вычислений.
import { useReducer, useState, useMemo } from 'react';
import './TodoList.css';
import { MdDeleteForever } from 'react-icons/md';

const initialState = {
  todos: [
    { id: 1, text: 'Купить продукты на неделю', isCompleted: 'completed' },
    { id: 2, text: 'Записаться к стоматологу', isCompleted: 'completed' },
    {
      id: 3,
      text: 'Пройтись 30 минут на свежем воздухе',
      isCompleted: 'active',
    },
    { id: 4, text: 'Оплатить коммунальные услуги', isCompleted: 'completed' },
    { id: 5, text: 'Разобрать шкаф с одеждой', isCompleted: 'active' },
    { id: 6, text: 'Позвонить родственникам', isCompleted: 'completed' },
    { id: 7, text: 'Приготовить ужин на завтра', isCompleted: 'completed' },
  ],
  filter: 'all',
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      return {
        ...state, // копируем текущий state (чтобы не мутировать его)
        todos: [
          ...state.todos, // копируем существующий массив задач
          { ...action.payload }, // добавляем новую задачу из payload
        ],
      };
    }
    case 'TOGGLE_TODO': {
      return {
        ...state, // сохраняем остальные поля state без изменений
        todos: state.todos.map(
          todo =>
            todo.id === action.payload
              ? {
                  ...todo, // копируем текущую задачу
                  isCompleted:
                    todo.isCompleted === 'active' ? 'completed' : 'active',
                }
              : todo // остальные задачи не изменяются
        ),
      };
    } //action.payload === id

    case 'REMOVE_TODO': {
      return {
        ...state, // сохраняем остальные поля state без изменений
        todos: state.todos.filter(todo => todo.id !== action.payload), // оставляем только те задачи, у которых id НЕ совпадает с payload
      };
    } //action.payload === id

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      }; // payload может быть:
    // 'all' | 'active' | 'completed'

    case 'CLEAR_COMPLETED': {
      return {
        ...state,
        todos: state.todos.filter(todo => todo.isCompleted !== 'completed'), // оставляем только незавершённые задачи
      };
    }
    default: // Если action.type неизвестен — возвращаем state без изменений
      return state;
  }
}

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTask, setNewTask] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
  };

  const addTask = task => {
    if (!task.trim()) return;

    const id = Date.now();
    dispatch({
      type: 'ADD_TODO',
      payload: { id, text: task, isCompleted: 'active' },
    });
  };

  const removeTask = id => dispatch({ type: 'REMOVE_TODO', payload: id });

  const clear = () => dispatch({ type: 'CLEAR_COMPLETED' });

  const toggleCompleted = id => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const switchFilter = status => {
    dispatch({ type: 'SET_FILTER', payload: status });
  };

  const filteredTodos = useMemo(() => {
    switch (state.filter) {
      case 'active':
        return state.todos.filter(todo => todo.isCompleted === 'active');
      case 'completed':
        return state.todos.filter(todo => todo.isCompleted === 'completed');
      default:
        return state.todos;
    }
  }, [state.filter, state.todos]);

  return (
    <>
      <h2>Todo List на `useReducer`</h2>

      <p></p>

      <form autoComplete="false" onSubmit={handleFormSubmit}>
        <input
          placeholder="New task ..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button type="submit">Add task</button>
      </form>

      <div className="filterBtns">
        <button type="button" onClick={() => switchFilter('all')}>
          All
        </button>
        <button type="button" onClick={() => switchFilter('active')}>
          Active
        </button>
        <button type="button" onClick={() => switchFilter('completed')}>
          Completed
        </button>
      </div>
      {filteredTodos.length > 0 ? (
        <ul className="todoList">
          {filteredTodos.map(({ id, text, isCompleted }) => {
            return (
              <li key={id} className="todoItem">
                <label htmlFor={`completed-${id}`} className="todoLabel">
                  <input
                    type="checkbox"
                    id={`completed-${id}`}
                    name="completed"
                    checked={isCompleted === 'completed'}
                    onChange={() => toggleCompleted(id)}
                    className="todoInput"
                  />
                </label>

                <p
                  className={`taskText ${isCompleted === 'completed' ? 'completed' : ''}`}
                >
                  {text}
                </p>

                <button
                  type="button"
                  onClick={() => removeTask(id)}
                  className="removeBtn"
                >
                  <MdDeleteForever />
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Список заданий пуст! Добавь нове задание. </p>
      )}

      <button type="button" onClick={clear}>
        Clear completed
      </button>
    </>
  );
};

export default TodoList;
