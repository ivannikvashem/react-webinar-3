import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.cartItems = {totalPrice: 0, totalCount: 0, list: []};
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
    const objectInstance = this.state.cartItems.list.find(x => x.code === cartItem.code);

    if (!objectInstance) {
      this.setState({
        ...this.state,
        cartItems: {
          list: [...this.state.cartItems.list, { code: cartItem.code, title: cartItem.title, price: cartItem.price, count: 1, totalPrice: cartItem.price }],
          totalPrice: this.state.cartItems.totalPrice + cartItem.price,
          totalCount: this.state.cartItems.list.length + 1
        }
      });
    } else {
      this.setState({
        ...this.state,
        cartItems: {
          list: this.state.cartItems.list.map(x => {
            if (x.code === cartItem.code) {
              return { ...x, count: x.count + 1, totalPrice: x.totalPrice + cartItem.price };
            }
            return x;
          }),
          totalPrice: this.state.cartItems.totalPrice + cartItem.price,
          totalCount: this.state.cartItems.list.length
        }
      });
    }
  }


  removeItem(item) {
    this.setState({
      ...this.state,
      cartItems: {
        list: this.state.cartItems.list.filter(listItem => listItem.code !== item.code),
        totalPrice: this.state.cartItems.totalPrice - item.totalPrice,
        totalCount: this.state.cartItems.list.length - 1
      }
    })
  }
}

export default Store;
