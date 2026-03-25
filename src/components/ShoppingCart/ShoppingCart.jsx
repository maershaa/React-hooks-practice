// # 7. Корзина товаров на useReducer

// ### Описание

// Создай простую корзину интернет-магазина.

// ### Требования

// Использовать **useReducer вместо useState**.

// Нужно:

// - список товаров
// - кнопка `Add to cart`
// - кнопка `Remove`
// - отображение количества товаров

// Reducer должен поддерживать действия:

// ```
// ADD_ITEM
// REMOVE_ITEM
// CLEAR_CART
// ```

// ### Подсказки

// - reducer принимает `(state, action)`
// - action имеет `{ type, payload }`

// ### Цель задания

// Понять:

// - когда `useReducer` лучше `useState`
// - архитектуру reducer-паттерна

// ---

import { useReducer } from 'react';

const initialState = [
  { id: 1, name: 'Apple', price: 0.99, quantity: 2 },
  { id: 2, name: 'Banana', price: 1.2, quantity: 3 },
];

function itemsReducer(items, action) {
  switch (action.type) {
    case 'ADD_NEW_ITEM': {
      return [
        ...items,
        {
          ...action.payload,
        },
      ];
    }

    case 'ADD_ITEM': {
      return items.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case 'REMOVE_ITEM':
      return items
        .map(item =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

    case 'CLEAR_CART':
      console.log('Сработал CLEAR_CART');
      return [];

    default:
      throw Error('Unknown action: ' + action.type);
  }
}

const ShoppingCart = () => {
  const [items, dispatch] = useReducer(itemsReducer, initialState);
  const handleForm = e => {
    e.preventDefault();

    const newId = Date.now();

    const name = e.target.name.value.trim();

    const price = parseFloat(e.target.price.value); //parseFloat(string) — берёт строку и пытается преобразовать её в число с десятичной частью. Используем для целых дробей!
    const quantity = parseInt(e.target.quantity.value) || 1; //parseInt(string) — берёт строку и преобразует её в целое число. Используем для целых чисел!

    if (!name || isNaN(price) || price <= 0 || quantity <= 0) {
      alert('Please provide valid name, price, and quantity');
      return;
    }

    const newItem = { name, price, quantity, id: newId };
    console.log('newItem', newItem);

    dispatch({
      type: 'ADD_NEW_ITEM',
      payload: newItem,
    });

    e.target.reset();
  };

  const handleAddItem = id => {
    dispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  };

  const handleDeleteItem = id => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  };

  const handleClearAll = () => {
    dispatch({
      type: 'CLEAR_CART',
    });
  };

  // ! Вариант 1   Более эффективный вариант тк 1 проход по массиву (вместо 2)
  const total = items.reduce(
    (acc, item) => {
      acc.totalQuantity += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );

  // ! Вариант 2
  // const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  // const totalPrice = items.reduce(
  //   (acc, item) => acc + item.price * item.quantity,
  //   0
  // );

  return (
    <>
      <h2>ShoppingCart</h2>
      <p>
        Здесь мы используем хук <strong>useReducer</strong> для управления
        состоянием корзины — он подходит, когда есть сложные изменения состояния
        (добавление, удаление, очистка товаров). Каждый раз, когда пользователь
        добавляет или убирает товар, мы отправляем действие <em>(dispatch)</em>{' '}
        в редьюсер, который возвращает новое состояние.
      </p>
      <form autoComplete="off" onSubmit={handleForm}>
        <input type="text" name="name" placeholder="Name..." required />
        <input
          type="number"
          name="price"
          placeholder="Price in $"
          min="0.01" // минимальная цена
          step="0.01" // разрешаем дробные числа
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          min="1" // минимум 1
          max="10" // максимум 10
          step="1" // только целые числа
        />
        <button type="submit">Add item</button>
      </form>

      {items.length > 0 && (
        <>
          <ul>
            {items.map(item => {
              const { id, name, price, quantity } = item;
              return (
                <li key={id}>
                  <h3>{name}</h3>
                  <p>
                    Price: {price.toFixed(2)}$ <span>Quantity: {quantity}</span>
                  </p>
                  <button type="button" onClick={() => handleAddItem(id)}>
                    Add
                  </button>
                  <button type="button" onClick={() => handleDeleteItem(id)}>
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
          <p>Items in cart: {total.totalQuantity}</p>
          <p>Total price: {total.totalPrice} $</p>
          <button type="button" onClick={() => handleClearAll()}>
            CLEAR CART
          </button>
        </>
      )}

      {items.length === 0 && <p>There no items in the cart!</p>}
    </>
  );
};

export default ShoppingCart;
