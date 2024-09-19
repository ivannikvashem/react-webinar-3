import React, { useState } from 'react';
import './style.css';
import List from "../list";
import Head from "../head";

const Modal = ({ isOpen, onClose, data, bottomData, onAction }) => {
  if (!isOpen) return null;

  return (
    <div className="Modal">
      <div className="Modal-content">
        <Head title={'Корзина'} action={onClose} actionText={'Закрыть'}></Head>
        <List
          list={data}
          onItemAction={onAction}
          itemActionName={'Удалить'}
        />

        <strong className="Modal-bottom">{bottomData}</strong>
      </div>
    </div>
  );
};

export default React.memo(Modal);

