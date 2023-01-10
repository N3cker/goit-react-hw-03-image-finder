import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = props => {
  return (
    <ul className={styles.imageGallery}>
      {props.images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onModalOpen={props.onModalOpen}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
