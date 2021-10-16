import axios from "axios";
import { BASE_URL, LOGIN } from "../../utils/endpoints";
import { 
    LOADING_USER_LOGIN, 
    LOGOUT_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_SUCCESS,
} from "./actionTypes"
import { returnError, returnSuccess } from "./alertActions";


export const login = (email, password) => (dispatch) => {
    dispatch({
        type:LOADING_USER_LOGIN
    })

    //Header Configuration
    const config = {
        header:{
            "Content-Type":"application/json"
        },
    }

    const body = ({email, password})
 
    axios
        .post(`${BASE_URL}${LOGIN}`, body, config)
        .then((res) => {
            console.log(res.data)
            dispatch({
                type:USER_LOGIN_SUCCESS,
                payload:res.data.data
            })
            dispatch(returnSuccess(res.data.message))
            // dispatch(loadUser())
        })
        .catch((err) => {
            console.log(err.response)
            dispatch({
                type:USER_LOGIN_FAIL
            })
            dispatch(returnError(err.response.data.message))
            
        })
}


export const logout = () => (dispatch) => {
    dispatch({
      type:LOGOUT_SUCCESS
    });
    dispatch(returnSuccess("Logged Out Successfully"));
  };