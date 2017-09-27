import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import app from "./app.js";
import characters from "./characters.js";

const rootReducer = combineReducers({
    app,
    characters,
    form: formReducer
});

export default rootReducer;
