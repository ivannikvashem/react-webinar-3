import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list = [], onItemAction = () => {}, itemActionName = '' }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} onItemAction={onItemAction} itemActionName={itemActionName}/>
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onItemAction: PropTypes.func,
  itemActionName: PropTypes.node
};

export default React.memo(List);
