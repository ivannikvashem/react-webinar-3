import React, {useCallback, useState} from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartItems = store.getState().cartItems;

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const callbacks = {
    onAddItemToCart: useCallback(
      item => {
        store.addItemToCart(item);
      },
      [store],
    ),

    onRemoveCartItem: useCallback(
      item => {
        store.removeItem(item);
      },
      [store],
    ),

    onCartOpen: useCallback(
      state => {
        if (state) {
          openModal();
        }
      }, []
    )
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart cartItems={cartItems} onCartItemRemove={callbacks.onRemoveCartItem} isOpen={callbacks.onCartOpen}/>
      <List
        list={list}
        onItemAction={callbacks.onAddItemToCart} itemActionName={'Добавить'}
      />

      <Modal isOpen={isOpen}>
        <>
          <Head title={'Корзина'} actionText={'Закрыть'} action={closeModal}/>
          <List
            list={cartItems.list}
            onItemAction={callbacks.onRemoveCartItem}
            itemActionName={'Удалить'}
          />
          <strong className="Modal-bottom">Итого {cartItems.totalPrice.toLocaleString('ru-RU')} ₽</strong>
        </>
      </Modal>
    </PageLayout>
  );

}

export default App;
