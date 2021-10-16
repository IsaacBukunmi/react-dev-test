import React from "react";
import styles from './index.module.scss';

// Rendering individual images
const Image = ({ image }) => {
  return (
    <div className={styles.file_item}>
      <img alt={`img - ${image.id}`} src={image.src} />
    </div>
  );
};

// ImageList Component
const ServiceImages = ({ images }) => {


  // render each image by calling Image component
  const renderImage = (image, index) => {
    return (
      <Image
        image={image}
        key={`${image.id}-image`}
      />
    );
  };


  // Return the list of files
  return <section className={styles.file_list}>{images.map(renderImage)}</section>;
};

export default ServiceImages;