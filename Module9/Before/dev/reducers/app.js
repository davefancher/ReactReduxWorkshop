import { APP } from "../actions/app.js";

const INITIAL_STATE = {
    isInitialized: false
};

export default function AppReducer (state = INITIAL_STATE, action) {
    switch (action.type) {
        case APP.INITIALIZING:
            return {
                ...state,
                isInitialized: false
            };

        case APP.INITIALIZED:
            return {
                ...state,
                isInitialized: true
            }
    }

    return state;
}
