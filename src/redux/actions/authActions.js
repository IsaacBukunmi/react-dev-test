import axios from "axios";
import { BASE_URL, LOGIN } from "../../utils/endpoints";
import { 
    LOADING_USER_LOGIN, 
    LOADING_USER_START, 
    LOAD_USER_FAIL, 
    LOAD_USER_SUCCESS, 
    LOGOUT_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_SUCCESS,
} from "./actionTypes"
import { returnError, returnSuccess } from "./alertActions";



// export const loadUser = () => (dispatch, getState) => {
//     dispatch({
//         type:LOADING_USER_START
//     })

//     // Get token from auth state
//     const token = getState().auth.token;
//     const user_id = getState().auth.user_id;

//     console.log(token, user_id)
    
//     // Header configuration
//     const config = {
//         headers:{
//             "Content-Type": "application/json"
//         },
//     };

//     if(token){
//         config.headers["Authorization"] = `Bearer ${token}`
//     }

//     axios
//         .get(`${BASE_URL}/users/${user_id}`, config)
//         .then((res) => {
//             dispatch({
//                 type:LOAD_USER_SUCCESS,
//                 payload:res.data
//             })
//             // console.log(res.data)
//         })
//         .catch((err) => {
//             dispatch({
//                 type:LOAD_USER_FAIL
//             })
//             console.log(err.response.data)
//         })

// }

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