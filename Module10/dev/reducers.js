import { combineReducers } from "redux";
import app from "./reducers/app.js";
import characters from "./reducers/characters.js";

const rootReducer = combineReducers({
    app,
    characters
});

export default rootReducer;
