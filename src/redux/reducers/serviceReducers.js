import { 
    ADDING_SERVICE_START,
    ADD_SERVICE_FAIL,
    ADD_SERVICE_SUCCESS 
} from "../actions/actionTypes";


const initial_state = {
    added_service:{},
    isLoading:false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initial_state, action){
    switch (action.type) {
        case ADDING_SERVICE_START:
            return{
                ...state,
                isLoading:true,
            }
        case ADD_SERVICE_SUCCESS:
            return{
                ...state,
                isLoading:false,
                added_service:action.payload.data
            }
        case ADD_SERVICE_FAIL:
            return{
                ...state,
                isLoading:false,
            }
        default:
           return state;
    }
}