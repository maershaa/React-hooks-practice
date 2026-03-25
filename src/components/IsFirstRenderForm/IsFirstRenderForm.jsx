// # 3. Пропуск первого рендера
// ### Описание
// Иногда в продакшене нужно **не запускать эффект при первом рендере**, а только
// при последующих изменениях.

// Создай форму изменения имени пользователя.

// ### Требования

// Нужно:

// - создать `input` для имени
// - хранить значение в `useState`
// - при изменении имени отправлять `console.log`:

// ```
// Saving name: <name>
// ```

// НО:

// - **на первом рендере логироваться ничего не должно**

// ### Подсказки

// - понадобится `useRef`
// - ref может хранить флаг `isFirstRender`

// ### Цель задания

// Понять:

// - зачем используется `useRef`
// - как хранить значения между рендерами без ререндера

// ---

import { useEffect, useRef, useState } from 'react';

const IsFirstRenderForm = () => {
  const isFirstRender = useRef(true);
  const [name, setName] = useState('');

  const handlerInput = evt => {
    setName(evt.target.value);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    console.log(`Saving name: ${name}`);
  }, [name]);

  return (
    <>
      <h2>
        Пропускаем первый рендер и выводим приветствие после того как было
        указано имя
      </h2>

      <p>
        Обновление имени с пропуском первого рендера: useRef хранит флаг без
        ререндера, useEffect срабатывает только при изменении значения.
      </p>
      <form>
        <input
          type="text"
          onChange={handlerInput}
          value={name}
          placeholder="Введите ваше имя ..."
        />
        {name && <p>Приветствую, {name}</p>}
      </form>
    </>
  );
};

export default IsFirstRenderForm;
