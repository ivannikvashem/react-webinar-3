import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, action, actionText }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className="Action">
        {action ? <button onClick={action}>{actionText}</button> : ''}
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  action: PropTypes.func,
  actionText: PropTypes.node
};

export default React.memo(Head);
