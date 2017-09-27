import IceAndFireRepository from "../IceAndFireRepository.js";

export const APP = {
    "INITIALIZING": "APP.INITIALIZING",
    "INITIALIZED": "APP.INITIALIZED"
};

const appInitializing =
    () => ({ type: APP.INITIALIZING });

const appInitialized =
    () => ({ type: APP.INITIALIZED });

export const initializeApp =
    () =>
        dispatch => {
            dispatch(appInitializing());
            return (
                IceAndFireRepository
                    .init()
                    .then(response => dispatch(appInitialized()))
            );
        };
