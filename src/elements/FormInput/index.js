import React, { useState } from 'react';
import styles from './index.module.scss';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'


export const FormInput = ({ handleChange, label, className, compulsory, type, ...otherProps}) => {
    const [revealPassword, setRevealPassword] = useState(false);
    return(
        <div className={styles.form_group}>
                {
                    label && <label> { compulsory && <span>*</span>} {label}</label>
                }
            <div className={styles.input_label}>
                <input 
                    className={`${styles.input} ${className}`} 
                    onChange={handleChange} 
                    type={revealPassword ? 'text' : type} 
                    {...otherProps} />
                     
                    {
                        type === 'password' && 
                        <div className={styles.password_eye_icon} onClick={() => setRevealPassword(!revealPassword)}>
                            {
                                revealPassword ? <AiOutlineEyeInvisible className={styles.eye_icon}/> :
                                <AiOutlineEye className={styles.eye_icon}/>
                            }
                        </div>
                    }
            </div>
        </div>
    )
}

export const FormSelectInput = ({className, label, value, name, handleChange, options, compulsory, ...otherProps}) => {
    return(
        <div className={styles.form_select_input}>
             <div className={`${styles.input_label} ${className}`}>
                {
                    label && <label> { compulsory && <span>*</span>} {label}</label>
                }
                <select name={name} value={value} onChange={handleChange}>
                    {/* <option value="">--Select Category--</option> */}
                    {
                        options.map((option) => (
                            <option key={option.id} value={option.value}>{option.name}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
}

export const FormTextArea = ({className, label, rows, compulsory, handleChange, ...otherProps}) => {
    return(
        <div className={styles._}>
                {
                    label && <label> { compulsory && <span>*</span>} {label}</label>
                }
            <textarea 
                className={`${styles.textarea} ${className}`} 
                rows={rows}
                onChange={handleChange}
                {...otherProps}
            >
            </textarea>
        </div>
    )
}

// export const FileInput = ({accept, id, className, handleChange, ...otherProps}) => {
//     return(
//         <div className={`${styles.file_input_container} ${className}`}>
//             <input
//                 id={id} 
//                 className={styles.input_file} 
//                 type="file" 
//                 accept={accept}
//                 onChange={handleChange}
//                 {...otherProps}
//             />
//             <label className={styles.upload_label} htmlFor={id}><img src={upload_icon} alt="upload icon"/>Upload</label>
//         </div>
//     )
// }