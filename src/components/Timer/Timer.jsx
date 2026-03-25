// # 2. Таймер с запуском и остановкой

import { useState, useEffect, useRef } from 'react';

// ### Описание

// Создай таймер, который начинает считать секунды после нажатия кнопки.

// ### Требования

// Нужно реализовать:

// - состояние `seconds`
// - состояние `isRunning`
// - кнопки:
//   - `Start`
//   - `Stop`
//   - `Reset`

// Когда таймер запущен:

// - каждую секунду увеличивается `seconds`

// При остановке:

// - интервал должен очищаться

// ### Подсказки

// - использовать `setInterval`
// - очистка через `clearInterval`
// - очистку лучше делать внутри `useEffect`

// ### Цель задания

// Понять:

// - жизненный цикл `useEffect`
// - очистку эффектов
// - работу таймеров в React

// ---

// ! Вариант 1
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalID = useRef(null);

  useEffect(() => {
    if (isRunning === false) return;

    intervalID.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(intervalID.current);
    };
  }, [isRunning]);

  const handelStart = () => {
    if (isRunning === true) return;
    setIsRunning(true);
  };

  const handelStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };
  return (
    <>
      <h2>Timer</h2>
      <p>
        В этом компоненте мы используем три хука:
        <br />
        <strong>useState</strong> — для хранения состояния таймера (seconds) и
        флага запуска (isRunning);
        <br />
        <strong>useRef</strong> — для хранения идентификатора интервала
        (intervalID) между рендерами без повторного рендеринга;
        <br />
        <strong>useEffect</strong> — для запуска таймера при изменении isRunning
        и очистки интервала при остановке или размонтировании компонента.
      </p>
      <p>{seconds} sec</p>
      <button onClick={handelStart}> Start</button>
      <button onClick={handelStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
};

export default Timer;
// !Вариант 2 (без useEffect)
// !Минусы РЕШЕНИЯ:
// Нет автоматической очистки при размонтировании компонента:
// Если компонент будет удалён, интервал продолжит работать → утечка памяти.
// Сложнее управлять жизненным циклом:
// Очистка интервала вынесена в ручные функции handelStop и handleReset.
// Может быть дублирование интервалов, если случайно нажать Start несколько раз (хотя у тебя есть защита if (isRunning) return).

/* const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalID = useRef(null);

  const handelStart = () => {
    if (isRunning === true) return;
    setIsRunning(true);
    intervalID.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const handelStop = () => {
    setIsRunning(false);
    clearInterval(intervalID.current);
    intervalID.current = null;
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
    clearInterval(intervalID.current);
    intervalID.current = null;
  };
  return (
    <>
      <h2>Timer</h2>
      <p></p>
      <p>{seconds}</p>
      <button onClick={handelStart}> Start</button>
      <button onClick={handelStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}; 
export default Timer;
*/
