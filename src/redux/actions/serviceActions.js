import axios from "axios"
import { BASE_URL, SERVICES } from "../../utils/endpoints";
import { 
    ADDING_SERVICE_START,
    ADD_SERVICE_FAIL,
    ADD_SERVICE_SUCCESS,
} from "./actionTypes";
import { returnError } from "./alertActions";
import Swal from 'sweetalert2'

export const addService = (formData) => (dispatch, getState) => {
    dispatch({
        type:ADDING_SERVICE_START
    })

    // Get token from auth state
    const token = getState().auth.token;

    console.log(token)

    // config
    const config = {
        headers:{
            "Content-Type":"application/json"
        }
    }

    if(token){
        config.headers["Authorization"] = `Bearer ${token}`
    }

    const body =(formData)

    console.log(body)

    axios.post(`${BASE_URL}${SERVICES}`, body, config)
        .then((res) => {
            dispatch({
                type:ADD_SERVICE_SUCCESS,
                payload:res.data,
            });
            Swal.fire({
                title: 'Success',
                text: `${res.data.message}`,
                icon: 'success',
                confirmButtonText: 'Continue'
              })
            console.log(res.data)
        })
        .catch((err) => {
            dispatch({
                type:ADD_SERVICE_FAIL
            });
            dispatch(returnError(err.response.data.message))
            console.log(err.response);
        })
}

