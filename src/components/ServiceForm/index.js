import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import logo from '../../assets/images/tecme_logo_white.png';
import Button, { PrimaryButton } from '../../elements/CustomButton';
import { FormInput, FormSelectInput, FormTextArea, Picker } from '../../elements/FormInput';
import { location, usageTypes } from '../../utils/select-options';
import styles from './index.module.scss';
import {HiOutlineMinus, HiOutlinePlus } from 'react-icons/hi';
import { FaPlus, FaMinus } from 'react-icons/fa';
import {BiDollar} from 'react-icons/bi'
import DropzoneInput from '../../elements/DropzoneInput';
import ServiceImages from '../ServiceImages';
import { useDispatch } from 'react-redux';
import { addService } from '../../redux/actions/serviceActions';
import ErrorMessage from '../ErrorMessage';



const ServiceForm = () =>{

    const {isLoading} = useSelector(state => state.service)
    const dispatch = useDispatch()


    // Initializing service form input
    const [service, setService] = useState({ title: "", description: "", location: "", credibility: "", estimation_duration:"0", usageType: "", price: "", deliverables: ""})

    // multiplying price input by 100
    const price = service.price * 100;

    // Array of uploaded image initialization
    const [images, setImages] = useState([]);

    // image files to be submmitted to API
    const [imageFiles, setImageFiles] = useState()

    // deliverable input value array
    const [deliverables, setDeliverables]=useState([])

    // add deliverable input
    const [addDeliverableInput, setAddDeliverableInput] = useState("")
    console.log(addDeliverableInput)


    // Upload Images and showcase
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


    const handleRemoveImage = (id) => {
    let newImages = images.filter((image) => image.id !== id)
    setImages(newImages)
        
    }

   
    // Function to handle input change
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setService({
            ...service,
            [name]:value
        })
    }

    // Function to handle usage type picker input
    function handleUsageTypeChange(type) {
        setService((oldType) => ({ ...oldType, ...type }));
    }

    // Function to handle deliverables input
    const handleChangeInput = (val, index) => {
        console.log(val.target.value)
        const newDeliverables = deliverables.reduce((arr, elem, i) => {
            if(i === index){
                arr.push({ value: val });
                return arr
            }
            arr.push(elem);
            return arr;
        }, [])

        console.log(newDeliverables)

        const newDeliverableValArr = newDeliverables.map((newDeliverableVal) => {
            return newDeliverableVal?.value?.target?.value
        })

        setDeliverables(newDeliverableValArr)
    }

    console.log(deliverables)

    // Get input value and put it in an array
    // const deliverableValArray = deliverables.map((deliverableVal) => {
    //     return deliverableVal?.value?.target?.value
    // })

    // console.log(deliverableValArray)

    // Function to get concatenated deliverable input values
    const getDeliverableString = () => {
        let deliverable = ""
        for(let i = 0; i < deliverables.length; i++){
            deliverable += deliverables[i] + "\\n"
        }
        console.log(deliverable.slice(0, -2))
        return deliverable.slice(0, -2)
    }
    
    getDeliverableString()


    //Function to remove deliverables
    const handleRemoveDeliverable = (index) => {
        const newDeliverables = deliverables.filter((_, i) => i !== index)
        setDeliverables(newDeliverables)
        
    }

    // Function to add deliverables
    const handleAddDeliverable = (e) => {
        e.preventDefault()
        console.log(addDeliverableInput)
        setDeliverables([...deliverables, addDeliverableInput])  
        setAddDeliverableInput("")   
    }

    console.log(deliverables)

    const handleChangeAddDeliverable = () => {
        
    }

    // Function to clear deliverable input
    const handleClearDeliverableInput = (e) => {
        e.preventDefault()
        setAddDeliverableInput("")
    }

 

    // Function to submit all form enteries
    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', service.title)
        formData.append('description', service.description)
        formData.append('location', service.location)
        formData.append('credibility', service.credibility)
        formData.append('estimated_duration', service.estimation_duration)
        formData.append('price', price)
        formData.append('usageType', service.usageType)
        formData.append('deliverables', getDeliverableString())
        formData.append('file', imageFiles)
        console.log(formData)
        dispatch(addService(formData))
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
                                        (service?.price && service?.price < 10) && <ErrorMessage message="Price must be greater than $10" />
                                    }
                                </div>

                            </div>
                            <div className={styles.deliverables}>
                                <p>Deliverables</p>
                                <div className={styles.deliverable_list_container}>
                                    <div className={styles.deliverable_list}>
                                        {
                                            deliverables?.length !== 0 && deliverables.map((elem, i) => (
                                                <DeliverablesComponent
                                                    key={i}
                                                    elem={elem}
                                                    index={i}
                                                    handleChangeInput = {handleChangeInput}
                                                    handleRemoveDeliverable = {handleRemoveDeliverable}
                                                />
                                            ))
                                        }
                                        
                                    </div>
                                    <div className={styles.add_clear_deliverable}>
                                        <div className={styles.add_clear_form_input}>
                                            <p>{deliverables?.length + 1}.</p>
                                            <FormInput 
                                                 type="text" 
                                                 value={addDeliverableInput}
                                                 handleChange={(e) => setAddDeliverableInput(e.target.value)}
                                                 placeholder="e.g Check for windows update" 
                                                 className={styles.add_clear_input}
                                                 compulsory
                                            />
                                        </div>
                                        <div className={styles.add_clear_btn}>
                                            <Button
                                                className={styles.sub_btn}
                                                handleClick={handleClearDeliverableInput}
                                            ><FaMinus className={styles.sub_icon} /></Button>
                                            <Button
                                                className={styles.add_btn}
                                                handleClick={handleAddDeliverable}
                                                ><FaPlus className={styles.add_icon}/>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.images_upload}>
                                <p>Images</p>
                                <DropzoneInput  
                                    onDrop={onDrop} 
                                    accept={"image/*"}
                                />
                                <ServiceImages images={images} handleRemoveImage={handleRemoveImage}/>
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

const DeliverablesComponent = ({elem, index, handleChangeInput, handleRemoveDeliverable}) => {
    console.log(elem)
    return(
        <div className={styles.deliverable_item}>
            <div style={{display:"flex"}}>
            <p>{index + 1}.</p>
            <FormInput 
                type="text" 
                name="deliverables"
                value={elem}
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
                        handleRemoveDeliverable(index)
                    }}
                ><FaMinus className={styles.sub_icon} /></Button>
            </div>
        </div>
    )
}

export default ServiceForm
