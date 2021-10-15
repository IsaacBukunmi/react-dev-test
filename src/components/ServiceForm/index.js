import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import logo from '../../assets/images/tecme_logo_white.png';
import { FormInput, FormSelectInput, FormTextArea } from '../../elements/FormInput';
import { location } from '../../utils/select-options';
import styles from './index.module.scss';

const ServiceForm = () =>{
    const [service, setService] = useState({ title: "", description: "", location: "", credibility: ""})
    
    const {isLoading, isAuthenticated, token } = useSelector(state => state.auth)


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setService({
            ...service,
            [name]:value
        })
    }

    console.log(location)

    return (
        <div className={styles._}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <div className={styles.logo}>
                            <img src={logo} alt="tecme logo" />
                        </div>
                        <h2>Create Service</h2>
                    </div>
                    <div className={styles.form_container}>
                        <form action="">
                            <div className={styles.title_input}>
                                <FormInput 
                                    type="text" 
                                    label="Title" 
                                    name="title"
                                    value={service.title}
                                    handleChange={handleChange}
                                    placeholder="e.g Computer Maintenance or Virus Remover" 
                                    compulsory
                                    required
                                />
                            </div>
                            <div className={styles.description_input}>
                                <FormTextArea 
                                    label="Description"
                                    name="description"
                                    value={service.description}
                                    compulsory
                                    className={styles.desc_textarea}
                                    rows="5" 
                                    placeholder="e.g I will optimize your computer for speed and longetivity"
                                    handleChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.location_device_input}>
                                <FormSelectInput 
                                    label="Location"
                                    name="location"
                                    value={service.location}
                                    handleChange={handleChange}
                                    className={styles.location_input}
                                    compulsory
                                    options={location}
                                    required
                                />
                                 <FormInput 
                                    type="text" 
                                    label="Device Types" 
                                    name="credibility"
                                    className={styles.device_input}
                                    value={service.credibility}
                                    handleChange={handleChange}
                                    placeholder="e.g iPhone" 
                                    compulsory
                                    required
                                />
                            </div>
                            <div className={styles.price_input}>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceForm
