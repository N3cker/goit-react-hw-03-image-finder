import React from 'react';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = props => {
  return (
    <li
      className={styles.imageGalleryItem}
      onClick={() => props.onModalOpen(props.image)}
    >
      <img
        className={styles.imageGalleryItemImage}
        src={props.image.webformatURL}
        alt={props.image.tags}
      />
    </li>
  );
};

export default ImageGalleryItem;
