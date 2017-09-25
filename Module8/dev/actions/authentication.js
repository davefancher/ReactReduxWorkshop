export const AUTH = {
    "LOG_IN_SUCCESS": "AUTH.LOG_IN_SUCCESS",
    "LOG_IN_FAILURE": "AUTH.LOG_IN_FAILURE",
    "LOG_OUT": "AUTH.LOG_OUT"
};

export const loginSuccess =
    username => ({
        type: AUTH.LOG_IN_SUCCESS,
        username: username
    });

export const loginFailure =
    validationError => ({
        type: AUTH.LOG_IN_FAILURE,
        validationError: validationError
    });

export const logOut =
    () => ({
        type: AUTH.LOG_OUT
    });
