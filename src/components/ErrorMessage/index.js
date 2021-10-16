import React from 'react'
import styles from './index.module.scss'

const ErrorMessage = ({message}) => {
    return (
        <div className={styles._}>
            <p>{message}</p>
        </div>
    )
}

export default ErrorMessage
