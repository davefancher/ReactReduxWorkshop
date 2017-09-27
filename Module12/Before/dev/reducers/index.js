import { combineReducers } from "redux";
import app from "./app.js";
import characters from "./characters.js";

const rootReducer = combineReducers({
    app,
    characters
});

export default rootReducer;
