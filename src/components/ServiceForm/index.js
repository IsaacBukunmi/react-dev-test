import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import logo from '../../assets/images/tecme_logo_white.png';
import Button, { PrimaryButton } from '../../elements/CustomButton';
import { FormInput, FormSelectInput, FormTextArea } from '../../elements/FormInput';
import { location } from '../../utils/select-options';
import styles from './index.module.scss';
import {HiOutlineMinus, HiOutlinePlus} from 'react-icons/hi';
import DropzoneInput from '../../elements/DropzoneInput';
import ServiceImages from '../ServiceImages';



const ServiceForm = () =>{
    const [service, setService] = useState({ title: "", description: "", location: "", credibility: "", price: "", deliverables: ""})

    const [images, setImages] = useState([]);
    
    const {isLoading, isAuthenticated, token } = useSelector(state => state.auth)

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        // Loop through accepted files
        acceptedFiles.map(file => {
        // Initialize FileReader browser API
        const reader = new FileReader();
        // onload callback gets called after the reader reads the file data
        reader.onload = function(e) {
          // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
          setImages(prevState => [
            ...prevState,
            { id: Date.now(), src: e.target.result }
          ]);
        };
        // Read the file as Data URL (since we accept only images)
        reader.readAsDataURL(file);
        return file;
      });
      }, []);

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setService({
            ...service,
            [name]:value
        })
    }

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
                                 <FormInput 
                                    type="number" 
                                    label="Price" 
                                    name="price"
                                    className={styles.price_input}
                                    value={service.price}
                                    handleChange={handleChange}
                                    placeholder="$10" 
                                    compulsory
                                    required
                                />
                            </div>
                            <div className={styles.deliverables}>
                                <p>Deliverables</p>
                                <ol>
                                    <li>
                                        <FormInput 
                                            type="text" 
                                            name="deliverables"
                                            value={service.deliverables}
                                            handleChange={handleChange}
                                            placeholder="e.g Check for windows update" 
                                            className={styles.deliverables_input}
                                            compulsory
                                            required
                                        />
                                        <div className={styles.input_btn}>
                                            <Button
                                                className={styles.sub_btn}
                                            ><HiOutlineMinus className={styles.sub_icon} /></Button>
                                            <Button
                                                className={styles.add_btn}
                                            ><HiOutlinePlus className={styles.add_icon}/></Button>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                            <div className={styles.images_upload}>
                                <p>Images</p>
                                <DropzoneInput  
                                    onDrop={onDrop} 
                                    accept={"image/*"}
                                />
                                <ServiceImages images={images}/>
                            </div>
                            <div className={styles.submit_btn}>
                                <PrimaryButton>
                                    Submit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServiceForm
