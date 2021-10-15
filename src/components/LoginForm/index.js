import React, { useState } from 'react'
import logo from '../../assets/images/tecme_logo.png';
import { PrimaryButton } from '../../elements/CustomButton';
import { FormInput } from '../../elements/FormInput';
import styles from './index.module.scss'

const LoginForm = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(email && password ){
            // props.login(email, password)
            // console.log(email, password)
        }else{
            console.log("Form is empty")
        }
    }


    return (
        <div className={styles._}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <img src={logo} alt="tecme logo" />
                    </div>
                    <h3>Login to continue</h3>
                    <div className={styles.form_container}>
                        <form action="">
                            <div className={styles.form_input}>
                                <FormInput 
                                    type="email" 
                                    value={email}
                                    handleChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter email" 
                                    required
                                />
                            </div>
                            <div className={styles.form_input}>
                                <FormInput 
                                    type="password" 
                                    value={password} 
                                    handleChange={(e) => setPassword(e.target.value)} 
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <p><a href="/">Forgot Password?</a></p>
                            <div className={styles.button}>
                                <PrimaryButton>Login</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
