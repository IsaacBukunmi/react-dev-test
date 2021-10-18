import React from "react";
import styles from './index.module.scss';


const ServiceImages = ({ images, handleRemoveImage }) => {

 return(
    <section className={styles.file_list}>
        {images.map((image) => 
            <div key={image.id} className={styles.file_item}>
                <img alt={`img - ${image.id}`} src={image.src} />
                <p onClick={() => handleRemoveImage(image.id)}>Remove</p>
            </div>
        )}
    </section>
 )
    
};

export default ServiceImages;