import toast from "react-hot-toast";
import { 
    ALERT_SUCCESS,
    ALERT_ERROR 
} from "./actionTypes";


// Display Success Alert;
export const returnSuccess = (message) => (dispatch) => {
    dispatch({
        type:ALERT_SUCCESS,
        payload:message
    })
    toast.success(message);
}

// Display Error Alert
export const returnError = (message) => (dispatch) => {
    dispatch({
        type:ALERT_ERROR,
        payload:message
    })
    toast.error(message);
}