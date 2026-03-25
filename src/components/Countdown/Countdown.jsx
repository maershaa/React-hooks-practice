import { useEffect, useState } from 'react';

const Countdown = ({ start }) => {
  const [count, setCount] = useState(start);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!isClicked) return;

    const intervalId = setInterval(() => {
      setCount(prev => {
        if (prev < 1) {
          clearInterval(intervalId);
          alert("Time's up!");
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
      setIsClicked(false);
    };
  }, [isClicked]);

  return (
    <>
      <h2>Countdown</h2>
      <p>
        В этом компоненте мы создаём таймер обратного отсчёта. Каждую секунду
        значение count уменьшается на 1. Когда count достигает 0, таймер
        останавливается и выводится alert "Time's up!".
      </p>
      <p>{count}</p>
      <button onClick={() => setIsClicked(true)}> Start</button>
    </>
  );
};

export default Countdown;
