// # 1. Счётчик с логированием изменений

// ### Описание

// Создай компонент счётчика, который позволяет увеличивать и уменьшать число.
// Каждый раз при изменении значения необходимо логировать изменение.

// ### Требования

// Разработчик должен:

// - создать состояние `count` через `useState`
// - вывести текущее значение на экран
// - добавить кнопки:
//   - `+1`
//   - `-1`
//   - `Reset`

// - при каждом изменении `count` выводить в `console.log` сообщение:

// ```
// Count changed: <значение>
// ```

// - использовать `useEffect` для отслеживания изменения `count`

// ### Подсказки

// - `useState(0)`
// - зависимость эффекта `[count]`
// - обработчики `onClick`

// ### Цель задания

// Понять:

// - базовую работу `useState`
// - как `useEffect` реагирует на изменение состояния
// - как работает массив зависимостей

import { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  const reset = () => {
    setCount(0);
  };

  useEffect(() => {
    // console.log(`Count changed: ${count}`);
  }, [count]);

  return (
    <>
      <h2>Counter</h2>
      <p>
        В этом компоненте мы отслеживаем изменение значения счетчика. Каждый
        раз, когда вы нажимаете +1 или -1, значение count изменяется, и
        useEffect срабатывает, выводя текущее значение в консоль.
      </p>
      <p>{count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default Counter;
