import { useEffect, useRef, useState } from 'react';

const ProfileForm = () => {
  const isFirstRender = useRef(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState(undefined);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      console.log('Это первый рендер. На нем форма пуста. ');

      return;
    }
    const userInfo = {
      name: name.trim(),
      email: email.trim(),
      gender,
    };
    console.log(
      'Данные пользователя изменились, сохраняем в sessionStorage:',
      userInfo
    );

    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [name, email, gender]);

  return (
    <>
      <div>
        <h3>ProfileForm</h3>
        <p>
          Реализуем отключение выполнения useEffect при первом рендере с помощью
          useRef
        </p>
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
            placeholder="Имя"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            minLength={8}
          />

          <p>Please select your gender:</p>
          <div>
            <label
              style={{
                marginRight: '15px',
              }}
            >
              <input
                type="radio"
                name="male"
                value="male"
                checked={gender === 'male'}
                onChange={e => setGender(e.target.value)}
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="female"
                value="female"
                checked={gender === 'female'}
                onChange={e => setGender(e.target.value)}
              />
              Female
            </label>
          </div>

          <button type="submit" onClick={evt => evt.preventDefault()}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileForm;
