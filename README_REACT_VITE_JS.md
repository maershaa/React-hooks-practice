## **_Пошаговое руководство по инициализации, подключению к GitHub и деплою проекта_**

---

## Проверка Node.js

Убедись, что Node.js установлен: node --version

---

# Aлгоритм создания и деплоя проекта на REACT Vite с GitHub Pages

---

## 1️⃣ Создание проекта на Vite и установка зависимостей

Команды для проверки в какой ты папке:

```bash
pwd: Выводит полный путь к текущей директории (например, /home/user/Documents)
ls: Показывает содержимое текущей папки
```

1. Создаём новый проект через Vite:

```bash
# npm create vite@latest my-project
- подходит для всех преоктов на vite, но задаст тебе еще несколько вопросов.

#npm create vite@latest my-app -- --template react
- создаст проект одной строкой

#npm create vite@latest . -- --template react
если  вы хотите развернуть проект непосредственно в той папке, где вы сейчас находитесь (без создания подпапки), используйте точку . вместо имени проекта

```

- Переходим в папку проекта:

```bash
cd my-project
```

2. Устанавливаем все зависимости:

```bash
npm install
```

---

## 2️⃣ Инициализация Git-репозитория

1. Инициализируем локальный репозиторий:

```bash
git init
```

2. Добавляем все файлы:

```bash
git add .
```

3. Первый коммит:

```bash
git commit -m "Initial commit: create project with Vite"
```

- **Первый коммит** содержит исходники проекта, package.json, node_modules не
  обязательно пушить.

4. Переименовываем ветку в main (если нужно):

```bash
git branch -M main
```

---

## 3️⃣ Создание удалённого репозитория на GitHub

1. Создаём репозиторий на GitHub

2. Не добавляем README, чтобы не было конфликтов с локальным репозиторием.

---

## 4️⃣ Связь локального репозитория с удалённым и отправка изменений

1. Добавляем remote:

```bash
git remote add origin https://github.com/maershaa/React-hooks-practice.git
```

2. Пушим ветку main:

```bash
git push -u origin main
```

- После этого локальный репозиторий связан с GitHub.

---

## 5️⃣ Внесение изменений в файл vite.config.js

- **Файл находится в ветке main**, на уровне package.json.

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/react-mini-apps/',

  plugins: [react()], // реакт сам его добавил

  resolve: {
    alias: {
      // Alias — псевдоним пути (короткое имя вместо ../../..)
      '@': path.resolve(__dirname, './src'),
      // '@' указывает на папку src:
      // вместо '../../../../components/Button/Button'
      // используем '@/components/Button/Button'
    },
  },
});
```

---

## 6️⃣ Настройка npm-скрипта для деплоя

1. Устанавливаем пакет `gh-pages`:

```bash
npm install --save-dev gh-pages
```

2. В `package.json` добавляем скрипт:

```json
"scripts": {
    "deploy": "gh-pages -d dist"
}
```

- Скрипт берёт содержимое папки `dist/` и пушит в ветку `gh-pages`.

---

## 7️⃣ Алгоритм работы с проектом локально и на GitHub Pages

1. Работаем **на ветке main**.
2. Вносим изменения в исходники (HTML, JS, CSS, src/).
3. Проверяем локально:

```bash
npm run dev      # быстрый dev-сервер
npm run preview  # проверка сборки
```

4. Когда готово — собираем проект:

```bash
npm run build
```

- Появляется папка `dist/` с готовыми к публикации файлами.

5. Деплой на GitHub Pages:

```bash
npm run deploy
```

- Содержимое dist пушится в ветку **gh-pages**.
- GitHub Pages автоматически отдаёт сайт с этой ветки.

---

## 8️⃣ Ветки и коммиты

- **main** — исходники проекта + vite.config.js + npm-библиотеки.
- **gh-pages** — только готовая сборка (dist).

---

## Алгоритм внесения изменений и обновления сайта

**Переключаемся на ветку main** (если ещё не на ней):

```bash
git checkout main
```

**Вносим изменения в проект**

- HTML, JS, CSS, npm-библиотеки, src/ и т.д.

**Проверяем статус Git и делаем коммит**:

```bash
git status

git add .

git commit -m "feat: описание изменений"

git push

```

**Собираем проект с Vite**:

```bash
npm run build
* dist/ теперь содержит обновлённую сборку с актуальными путями, включая `base`, если он указан.

npm run deploy
* Ветка gh-pages обновится автоматически.
* Сайт на GitHub Pages сразу будет показывать новые файлы, включая JS и CSS без 404.
```

### Пример коммитов:

1. **Первый коммит**

```text
Initial commit: create project with Vite
```

- В main, содержит исходники проекта.

2. **Добавление vite.config.js**

```text
feat: add vite.config.js for multi-page support
```

- В main, чтобы сборка могла создать MPA.

3. **Деплой dist на GitHub Pages**

```text
chore: deploy dist to gh-pages
```

- Ветка gh-pages создаётся автоматически при `npm run deploy`.

4. **Изменения исходников**

```text
feat: update timer and style improvements
```

- В main, затем снова сборка и деплой.

---

## 9️⃣ Основные моменты

- **Исходники не публикуются напрямую на Pages** — только через dist.
- **gh-pages** не объединяем с main, это отдельная ветка для публикации.
- npm-библиотеки (`notifyx`, `flatpickr`) работают только после сборки Vite.
- Добавлять новые страницы MPA — через `rollupOptions.input` в vite.config.js.

## Структура проекта

```
my-project/
│
├─ dist/                 # Сборка проекта (production)
├─ node_modules/         # Зависимости
│
├─ public/
│   └── favicon.svg
│
├─ src/
│   │
│   ├─ assets/          # картинки, иконки, шрифты
│   │
│   ├─ styles/          # ГЛОБАЛЬНЫЕ стили
│   │   ├─ reset.css
│   │   ├─ variables.css
│   │   └─ global.css
│   │
│   ├─ components/      # UI компоненты
│   │   └─ Button/
│   │       ├─ Button.jsx
│   │       └─ Button.module.css
│   │
│   ├─ pages/           # Страницы
│   │   └─ Home/
│   │       └─ Home.jsx
│   │
│   ├─ hooks/           # кастомные хуки
│   │
│   ├─ services/        # API
│   │   └─ api.js
│   │
│   ├─ utils/           # вспомогательные функции
│   │
│   ├─ App.jsx
│   └─ main.jsx
│
├─ .gitignore
├─ index.html
├─ package.json
├─ vite.config.js
└─ README.md

### App.css и index.css убираем так как теперь есть папка styles и там основные стили. подключаем их в main.js:
import '@/styles/reset.css';
import '@/styles/variables.css';
import '@/styles/global.css';
```

## 📌 Правила именования коммитов

### 🔹 `init`

Используется **только один раз** — при создании проекта.  
Содержит первоначальную структуру проекта и базовые файлы.

**Пример:**  
`init: initial project structure`

---

### 🔹 `feat`

Добавлена новая функциональность (feature).  
Всё новое, что **появляется для пользователя** или с чем он может
взаимодействовать.

**Пример:**  
`feat: add reel spinning animation`  
`feat: add balance recharge modal`

---

### 🔹 `fix` / `bugfix`

Исправлена ошибка или некорректное поведение.

**Пример:**  
`fix: incorrect reel stop position`  
`bugfix: balance was not updating correctly`

---

### 🔹 `docs`

Добавлена или обновлена документация.  
README, инструкции, комментарии, описания проекта.

**Пример:**  
`docs: update README with setup instructions`

---

### 🔹 `style`

Изменения внешнего вида или форматирования кода **без изменения логики**.  
CSS, отступы, шрифты, форматирование.

**Пример:**  
`style: improve modal layout and colors`

---

### 🔹 `refactor`

Переработка кода без добавления новой функциональности и без исправления
багов.  
Улучшение структуры, читаемости, оптимизация.

**Пример:**  
`refactor: simplify spinReel logic`

---

### 🔹 `chore`

Служебные изменения.  
Обновление зависимостей, настройки сборщика, конфигурация проекта.

**Пример:**  
`chore: update project configuration` `chore: add comments and minor code cleanup`

---

### 10. Рекомендации для проекта

- [1] Установи пакет `normalize.css`, который убирает различия в отображении
  HTML-элементов между разными браузерами. Это делает базовые стили
  единообразными, чтобы ваши собственные стили работали предсказуемо и одинаково
  во всех браузерах.:

```bash
npm install normalize.css
В файле main.js импортируем его перед всеми остальными стилями: import 'normalize.css';

```

[2] В проекте у тебя будет:

### eslint.config.js

— для проверки кода (линтинг: ошибки, неиспользуемые переменные, стиль).  
Создаётся автоматически при `npm create vite@latest` (React template).

---

### vite.config.js

— конфигурация сборщика Vite.  
Создаётся автоматически.

Здесь обычно настраивают:

- алиасы путей (`@ → src`)
- плагины (React)
- base path для деплоя
- dev server
- build options

---

### jsconfig.json / tsconfig.json

— для VS Code: автоподсказки, переход по импортам, понимание алиасов. Создаётся
вручную.

Без этого файла Vite будет работать, но VS Code не будет автодополнять импорты с
`@`. Если нужно чтобы VS Code понимал `@/...` и подсказывал пути:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

[3] Подходы к использованию иконок в React

===== Библиотека `react-icons` =====

Иконки уже как React-компоненты → легко менять `size`, `color`, стилизовать
через `className`. Не требуется подключать отдельные CSS или шрифты.

```bash
npm install react-icons
```

```jsx
import { FaBeer } from 'react-icons/fa';

<FaBeer size={30} color="orange" />;
```

===== SVG как компонент =====

Храни SVG в `src/assets/icons/` и импортируй как React-компоненты. Можно менять
размеры и цвета через пропсы или CSS.

```jsx
import { ReactComponent as Logo } from './assets/icons/logo.svg';

<Logo width={50} height={50} />;
```

[4] Нужно ли указывать расширение файла при импорте (React + Vite)

| Что импортируем | Указывать расширение | Пример                                   |
| --------------- | -------------------- | ---------------------------------------- |
| React компонент | ❌ Нет               | `import Profile from './Profile'`        |
| JS / JSX файл   | ❌ Нет               | `import helpers from './helpers'`        |
| CSS             | ✅ Да                | `import './Profile.css'`                 |
| CSS Modules     | ✅ Да                | `import css from './Profile.module.css'` |
| SVG / PNG / JPG | ✅ Да                | `import avatar from './avatar.png'`      |
| JSON            | ✅ Да                | `import data from './data.json'`         |

Вот красиво оформленный вариант твоей шпаргалки в **Markdown**, с правильными
отступами, кодовыми блоками и структурой:

[5] PropTypes (шпаргалка)

**PropTypes** проверяют, какие данные реально приходят в компонент.  
Если тип не совпадает — React покажет warning в консоли.

> 🔑 PropTypes описывают то, что реально приходит в компонент,  
> а не то, во что данные потом преобразуются внутри.

---

## Установка

```bash
npm i prop-types
```

## Импорт

```js
import PropTypes from 'prop-types';
```

## Пример: User.propTypes

```js
User.propTypes = {
  // ===== Примитивы =====
  name: PropTypes.string.isRequired, // строка (обязательная)
  age: PropTypes.number, // число
  isOnline: PropTypes.bool, // boolean

  // ===== Массив строк =====
  tags: PropTypes.arrayOf(PropTypes.string),

  // ===== Массив объектов =====
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      // shape — форма объекта
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      isOnline: PropTypes.bool,
    })
  ),

  // ===== oneOf (строго один из перечисленных) =====
  status: PropTypes.oneOf(['online', 'offline', 'busy']),

  // ===== oneOfType (несколько допустимых типов) =====
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // ===== shape (объект с описанной структурой: строки, булевы значения и т.д.) =====
  profile: PropTypes.shape({
    avatar: PropTypes.string,
    location: PropTypes.string,
  }),

  // ===== exact (объект БЕЗ лишних полей) =====
  // exact — как shape, но запрещает лишние поля.
  // Если придёт больше данных, чем описано в PropTypes, будет warning
  settings: PropTypes.exact({
    theme: PropTypes.string,
    notifications: PropTypes.bool,
  }),
};
```
