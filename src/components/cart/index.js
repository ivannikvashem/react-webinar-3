import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Modal from 'components/modal'
import { plural } from '../../utils';
import { totalCartItemsAmount } from '../../utils'


function Cart({ cartItems = [], onCartItemRemove = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);


  return (
    <div className="Cart">
      <div className="Cart-State">
        <span>В корзине: </span>
        <strong>{cartItems.length ? `${cartItems.length} ${plural(cartItems.length, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'})}`: 'пусто'} </strong> <strong> {totalCartItemsAmount(cartItems) != 0 ? '/ ' + totalCartItemsAmount(cartItems) + ' ₽' : ''}</strong>
      </div>
      <button onClick={openModal}>&nbsp;Перейти&nbsp;</button>
      <Modal isOpen={isOpen} onClose={closeModal} data={cartItems} bottomData={'Итого: ' + totalCartItemsAmount(cartItems) + ' ₽'} onAction={onCartItemRemove}/>
    </div>
);
}

const countCartItems = (cartItems) => {
  let count = 0;
  cartItems.forEach(x => {
    count += x.count;
  })
  return count;
}

Cart.propTypes = {
  cartItems: PropTypes.array,
};

export default React.memo(Cart);
