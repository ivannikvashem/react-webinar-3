import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cartItems = [];
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину
   * @param item {Object}
   */
  addItemToCart(cartItem) {
    const objectInstance = this.state.cartItems.find(x => x.code == cartItem.code);

    if (!objectInstance) {
      this.setState({
        ...this.state,
        cartItems: [...this.state.cartItems, {code: cartItem.code, title: cartItem.title, price: cartItem.price, count: 1, totalPrice: cartItem.price}]
      })
    } else {
      this.setState({
        ...this.state,
        cartItems: this.state.cartItems.map(x => {
          if (x.code === cartItem.code) {
            return {...x, count: x.count + 1, totalPrice: x.totalPrice + cartItem.price};
          }
          return x;
        })
      })
    }
  }

  removeItem(code) {
    console.log(code)
    this.setState({
      ...this.state,
      cartItems: this.state.cartItems.filter(item => item.code !== code),
    });
  }
}

export default Store;
