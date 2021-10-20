import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import logo from '../../assets/images/tecme_logo.png';
import { PrimaryButton } from '../../elements/CustomButton';
import { FormInput } from '../../elements/FormInput';
import { login } from '../../redux/actions/authActions';
import ErrorMessage from '../ErrorMessage';
import styles from './index.module.scss'

const LoginForm = () => {

    const [user, setUser] = useState({email: "", password: ""})

    const dispatch = useDispatch()
    const {isLoading, isAuthenticated } = useSelector(state => state.auth)

    const emailValidation = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(user.email && regex.test(user.email) === false){
            return <ErrorMessage message="Please enter a valid email" />
        }
    }
    

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = (e) => {
        console.log(user.password)
        e.preventDefault()
        if(user.email && user.password ){
            dispatch(login(user.email, user.password))
        }else{
           toast.error("Input both your email and password")
        }
    }
    
    if(isAuthenticated){
        return(
            <Redirect to="/add-service" />
        )
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
                                    name="email"
                                    value={user.email}
                                    handleChange={handleChange}
                                    placeholder="Enter email" 
                                    required
                                />
                                {
                                    emailValidation()
                                }
                            </div>
                            <div className={styles.form_input}>
                                <FormInput 
                                    type="password" 
                                    name="password"
                                    value={user.password} 
                                    handleChange={handleChange} 
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <p className={styles.forget_pwd}><a href="/">Forgot Password?</a></p>
                            <div className={styles.button}>
                                <PrimaryButton
                                    handleClick={handleSubmit}
                                    isLoading={isLoading}
                                >Login</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
