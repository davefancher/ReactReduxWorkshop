import { AUTH } from "../actions/authentication.js";

const INITIAL_STATE = {
    validationError: null,
    username: localStorage.getItem("username")
};

export default function AuthReducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case AUTH.LOG_IN_SUCCESS:
            return {
                ...state,
                username: action.username,
                validationError: null
            };

        case AUTH.LOG_IN_FAILURE:
            return {
                ...state,
                username: null,
                validationError: action.validationError
            };
        
        case AUTH.LOG_OUT:
            return {
                ...state,
                username: null,
                validationError: null
            };
    }

    return state;
}
