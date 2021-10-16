import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import logo from '../../assets/images/tecme_logo_white.png';
import Button, { PrimaryButton } from '../../elements/CustomButton';
import { FormInput, FormSelectInput, FormTextArea, Picker } from '../../elements/FormInput';
import { location, usageTypes } from '../../utils/select-options';
import styles from './index.module.scss';
import {HiOutlineMinus, HiOutlinePlus} from 'react-icons/hi';
import {BiDollar} from 'react-icons/bi'
import DropzoneInput from '../../elements/DropzoneInput';
import ServiceImages from '../ServiceImages';
import { useDispatch } from 'react-redux';
import { addService } from '../../redux/actions/serviceActions';
import ErrorMessage from '../ErrorMessage';



const ServiceForm = () =>{
    const [service, setService] = useState({ title: "", description: "", location: "", credibility: "", estimation_duration:"0", usageType: "", price: "", deliverables: ""})
    const price = service.price * 100;

    const [images, setImages] = useState([]);
    const [imageFiles, setImageFiles] = useState()

    const [deliverables, setDeliverables]=useState([{
        value: ""
    }])


    const {isLoading} = useSelector(state => state.service)
    const dispatch = useDispatch()


    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setImageFiles(acceptedFiles)
        // Loop through accepted files
        acceptedFiles.map(file => {
        // Initialize FileReader browser API
        const reader = new FileReader();
        // onload callback gets called after the reader reads the file data
        reader.onload = function(e) {
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

    function handleUsageTypeChange(data) {
        setService((oldData) => ({ ...oldData, ...data }));
    }

    console.log(service.usageType)

    const handleChangeInput = (val, index) => {
        const newDeliverables = deliverables.reduce((arr, elem, i) => {
            if(i === index){
                arr.push({ value: val });
                return arr
            }
            arr.push(elem);
            return arr;
        }, [])

        setDeliverables(newDeliverables)
    }

    console.log(deliverables)

    const handleChangeDeliverable = (index) => {
        const newDeliverables = deliverables.filter((_, i) => i !== index)
        setDeliverables(newDeliverables)
    }

    const handleAddDeliverable = () => {
        
    }

 

    const handleSubmit = (e) => {
        console.log(service.location)
        e.preventDefault()
        const formData = new FormData()

        formData.append('title', service.title)
        formData.append('description', service.description)
        formData.append('location', service.location)
        formData.append('credibility', service.credibility)
        formData.append('estimated_duration', service.estimation_duration)
        formData.append('price', price)
        formData.append('usageType', service.usageType)
        formData.append('deliverables', service.deliverables)
        formData.append('file', imageFiles)
        console.log(formData)
        dispatch(addService(formData))
        // if(service.title && service.description && service.location && service.credibility && service.usageType && service.price && service.deliverables && imageFiles !== 0 ){
           
        // }else{
        //     console.log("Fill all required input")
        // }
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

                                />
                            </div>
                            <div className={styles.description_input}>
                                <FormTextArea 
                                    label="Description"
                                    name="description"
                                    value={service.description}
                                    compulsory
                                    className={styles.desc_textarea}
                                    rows="6" 
                                    placeholder="e.g I will optimize your computer for speed and longetivity"
                                    handleChange={handleChange}

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

                                />
                                <div>
                                    <FormInput 
                                        type="text" 
                                        label="Device Types" 
                                        name="credibility"
                                        className={styles.device_input}
                                        value={service.credibility}
                                        handleChange={handleChange}
                                        placeholder="e.g iPhone" 
                                        compulsory
                                    />
                                    
                                </div>
                            </div>
                            <div className={styles.device_price}>
                                <Picker 
                                    options={usageTypes}
                                    onSelectOption={(val) => handleUsageTypeChange({ usageType: val })}
                                    selected={service.usageType}
                                    className={styles.usage_type}
                                    name="usageType"
                                    label="Type of price"
                                    compulsory
                                />
                                <div>
                                    <div className={styles.price_input_container}>
                                        <FormInput 
                                            type="number" 
                                            label="Price" 
                                            name="price"
                                            className={styles.price_input}
                                            value={service.price}
                                            handleChange={handleChange}
                                            placeholder="0" 
                                            min="0"
                                            compulsory
                                        />
                                        <BiDollar className={styles.currency_icon} />
                                    </div>
                                   
                                    {
                                        (service.price && service.price < 10) && <ErrorMessage message="Price must be greater than $10" />
                                    }
                                </div>

                            </div>
                            <div className={styles.deliverables}>
                                <p>Deliverables</p>
                                <div className={styles.deliverable_list}>
                                    {
                                        deliverables.length !== 0 && deliverables.map((elem, i) => (
                                            <DeliverablesComponent
                                                key={i}
                                                elem={elem}
                                                index={i}
                                                handleChangeInput = {handleChangeInput}
                                                handleChangeDeliverable = {handleChangeDeliverable}
                                            />
                                        ))
                                    }
                                    <Button
                                        className={styles.add_btn}
                                    ><HiOutlinePlus className={styles.add_icon}/></Button>
                                </div>
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
                                <PrimaryButton
                                    isLoading={isLoading}
                                    handleClick={handleSubmit}
                                    className={styles.submit}>
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

const DeliverablesComponent = ({elem, index, handleChangeInput, handleChangeDeliverable}) => {

    return(

        <div className={styles.deliverable_item}>
            <div style={{display:"flex"}}>
            <p>{index + 1}.</p>
            <FormInput 
                type="text" 
                name="deliverables"
                value={elem.value}
                handleChange={val => handleChangeInput(val, index)}
                placeholder="e.g Check for windows update" 
                className={styles.deliverables_input}
                compulsory

            />
            </div>
            <div className={styles.input_btn}>
                <Button
                    className={styles.sub_btn}
                    handleClick={(e) =>{
                        e.preventDefault() 
                        handleChangeDeliverable(index)
                    }}
                ><HiOutlineMinus className={styles.sub_icon} /></Button>
            </div>
        </div>
    )
}

export default ServiceForm
