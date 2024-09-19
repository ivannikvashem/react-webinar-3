import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

  const callbacks = {
    onItemAction: e => {
      e.stopPropagation();
      props.onItemAction(props.item);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">
        {props.item.title}{' '}
      </div>
      <div className="Item-info">
        {props.item.price.toLocaleString('ru-RU') + ' ₽'}
      </div>

      {props.item.count ?
        <div className="Item-info">
        {props.item.count + ' шт'}
        </div> : ''
      }

      <div className="Item-actions">
        <button onClick={callbacks.onItemAction}>{props.itemActionName}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  itemActionName: PropTypes.string,
  onItemAction: PropTypes.func,
};

export default React.memo(Item);
