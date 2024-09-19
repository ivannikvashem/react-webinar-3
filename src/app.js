import React, {useCallback, useState} from 'react';
import List from './components/list';
import Cart from './components/cart';
import Head from './components/head';
import PageLayout from './components/page-layout';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cartItems = store.getState().cartItems;
  const callbacks = {
    onAddItemToCart: useCallback(
      item => {
        store.addItemToCart(item);
      },
      [store],
    ),

    onRemoveCartItem: useCallback(
      item => {
        store.removeItem(item.code);
      },
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Cart cartItems={cartItems} onCartItemRemove={callbacks.onRemoveCartItem}/>
      <List
        list={list}
        onItemAction={callbacks.onAddItemToCart} itemActionName={'Добавить'}
      />
    </PageLayout>
  );
}

export default App;
