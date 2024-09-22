import React, {useCallback, useEffect, useState} from 'react';
import PropTypes, {shape} from 'prop-types';
import './style.css';
import { plural } from '../../utils';


function Cart({ cartItems = {totalPrice: 0, totalCount: 0, list: []}, isOpen  }) {

  const openCartModal = () => {
    isOpen(true);
  };

  return (
    <div className="Cart">
      <div className="Cart-State">
        <span>В корзине: </span>
        <strong>{cartItems.list.length ? `${cartItems.list.length} ${plural(cartItems.list.length, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'})}`: 'пусто'} </strong> <strong> {cartItems.totalCount ? '/ ' + cartItems.totalPrice.toLocaleString('ru-RU') + ' ₽' : ''}</strong>
      </div>
      <button onClick={openCartModal}>&nbsp;Перейти&nbsp;</button>
    </div>
);
}

Cart.propTypes = {
  cartItems: PropTypes.shape({
    totalPrice: PropTypes.number,
    totalCount: PropTypes.number,
    list: PropTypes.array.isRequired,
  }).isRequired
};
export default React.memo(Cart);
