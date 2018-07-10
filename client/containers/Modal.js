import React from 'react';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="my-modal">
      {children}
    </div>
  )
};

export default Modal;
