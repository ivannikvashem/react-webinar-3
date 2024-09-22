import React, { useState } from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

const Modal = ({ isOpen, children}) => {
  if (!isOpen) return null;

  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('center')}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Modal);

