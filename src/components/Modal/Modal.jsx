import React from 'react';
import styles from './Modal.module.css';

const Modal = props => {
  return (
    <div className={styles.overlay} onClick={props.onModalClose}>
      <div className={styles.modal}>
        <img src={props.image.largeImageURL} alt={props.image.tags} />
      </div>
    </div>
  );
};

export default Modal;
