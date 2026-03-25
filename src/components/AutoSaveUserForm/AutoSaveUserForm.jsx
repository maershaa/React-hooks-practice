// # 6. Форма с автосохранением

// ### Описание

// Создай форму редактирования профиля пользователя.

// При изменении данных форма должна **автоматически сохраняться через 2 секунды**
// после последнего изменения.

// ### Требования

// Форма содержит:

// - `name`
// - `email`

// Нужно:

// - хранить данные формы в `useState`
// - при изменении данных запускать **отложенное сохранение**
//! - если пользователь печатает дальше — таймер должен сбрасываться

// При сохранении:

// ```
// console.log("Auto saving form...", formData)
// ```

// ### Подсказки

// - `setTimeout`
// - очистка таймера через `clearTimeout`
// - использовать `useEffect`

// ### Цель задания

// Понять:

// - debounce-логику
// - работу очистки эффектов

// ---

import { useState, useEffect } from 'react';

// ! Кастомный хук debounce
// Возвращает значение только если оно не менялось delay мс
const useDebounce = (value, delay = 2000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => {
      // запускаем таймер при каждом изменении value
      setDebouncedValue(value); // обновляем "задержанное" значение
    }, delay);

    return () => {
      clearTimeout(t); //очищаем таймер → сбрасываем debounce при новом вводе
    };
  }, [delay, value]);

  return debouncedValue;
};

//! Вариант 1
const AutoSaveUserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // debounce-версии значений обновляются только если пользователь перестал печатать на 2 секунды
  const debouncedName = useDebounce(name);
  const debouncedEmail = useDebounce(email);

  useEffect(() => {
    if (!debouncedName || !debouncedEmail) return; //не выполняем "сохранение", если одно из полей пустое

    //автосохранение (срабатывает только после паузы ввода)
    console.log('Auto saving form ...', {
      name: debouncedName,
      email: debouncedEmail,
    });
  }, [debouncedEmail, debouncedName]);

  return (
    <>
      <h2>AutoSafeUserForm</h2>
      <p>
        Здесь реализована форма с автосохранением через{' '}
        <strong>debounce</strong>. Пользователь вводит данные в поля name и
        email, значения сохраняются в состоянии (useState). Затем через
        <strong> кастомный хук useDebounce </strong> мы откладываем обновление
        значений на 2 секунды после последнего ввода. Если пользователь
        продолжает печатать, предыдущий таймер сбрасывается. Когда пользователь
        останавливается, срабатывает useEffect, и происходит "автосохранение" (в
        данном случае — вывод данных в консоль). Это позволяет избежать лишних
        вызовов, например, запросов к API при каждом вводе символа.
      </p>{' '}
      <form
        autoComplete="on"
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '10px',
          margin: '0 auto',
          width: '300px',
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {name && email && (
          <p>
            Hello, <strong>{name}</strong>. We will send an invite to your email{' '}
            <strong>{email}</strong>.
          </p>
        )}
      </form>
    </>
  );
};

export default AutoSaveUserForm;

//! Вариант 2

// const AutoSafeUserForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   });

//   const debouncedForm = useDebounce(formData);

//   useEffect(() => {
//     if (!debouncedForm.name || !debouncedForm.email) return;

//     console.log('Auto saving form...', debouncedForm);
//   }, [debouncedForm]);

//   return (
//     <>
//       <h2>AutoSafeUserForm</h2>

//       <form>
//         <input
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           onChange={e =>
//             setFormData(prev => ({
//               ...prev,
//               name: e.target.value,
//             }))
//           }
//         />

//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={e =>
//             setFormData(prev => ({
//               ...prev,
//               email: e.target.value,
//             }))
//           }
//         />
//       </form>
//     </>
//   );
// };
