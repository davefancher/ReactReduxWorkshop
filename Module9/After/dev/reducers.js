import { combineReducers } from "redux";
import app from "./reducers/app.js";
import auth from "./reducers/authentication.js";
import characters from "./reducers/characters.js";

const rootReducer =
    combineReducers({
        app,
        auth,
        characters
    });

export default rootReducer;
