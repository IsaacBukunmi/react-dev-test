import { 
    LOADING_USER_LOGIN,  
    LOADING_USER_START,  
    LOGOUT_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGIN_SUCCESS, 
} from "../actions/actionTypes";


const initialState = {
    token:localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token')&&true,
    isLoading:false,
    user_id:localStorage.getItem('user_id'),
    user:null,
}



export default function(state=initialState, action){
    switch(action.type){
        case LOADING_USER_START:
        case LOADING_USER_LOGIN:
            return{
                ...state,
                isLoading:true
            }
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user_id', action.payload.userId)
            return{
                ...state,
                isLoading:false,
                isAuthenticated:true,
                user:action.payload,
            }
        case USER_LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            return{
                ...state,
                isLoading:false,
                isAuthenticated:false
            }
        default:
            return state;
    }

}

