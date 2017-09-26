import { combineReducers } from "redux";
import app from "./reducers/app.js";
import auth from "./reducers/authentication.js";

const rootReducer =
    combineReducers({
        app,
        auth
    });

export default rootReducer;
