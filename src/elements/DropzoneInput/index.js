import React from 'react'
import { useDropzone } from "react-dropzone";
import uploadIcon from '../../assets/images/upload_icon.PNG';
import './index.scss'

const getClassName = (className, isActive) => {
    if (!isActive) return className;
    return `${className} ${className}-active`;
  };
  

const DropzoneInput = ({onDrop, accept}) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept
      });
    
    return (
        <div className={getClassName("dropzone", isDragActive)} {...getRootProps()}>
            <input className="dropzone-input" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                <p className="dropzone-content">Release to drop the files here</p>
                ) : (
                <div className="dropzone-content">
                    <img src={uploadIcon} alt="upload icon" />
                    <h3>Click or drag file to this area to upload</h3>
                    <p>Only image files allowed</p>
                </div>
            )}
          </div>
        </div>
    );
}

export default DropzoneInput
