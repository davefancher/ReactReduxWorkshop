import {
    FETCH_CHARACTERS,
} from "../actions/characters.js";

const INITIAL_STATE = {
    loading: true,
    characters: [],
    pagination: {
        page: 1,
        pageSize: 25,
        first: {},
        next: {},
        prev: {},
        last: {}
    },
    errorMessage: ""
}

export default function (state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_CHARACTERS.REQUEST:
            return {
                ...state,
                loading: true,
                errorMessage: ""
            };

        case FETCH_CHARACTERS.SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                characters: action.characters,
                pagination: {
                    first: action.pagination.first,
                    prev: action.pagination.prev,
                    next: action.pagination.next,
                    last: action.pagination.last,
                    page: action.pagination.page,
                    pageSize: action.pagination.pageSize
                }
             };

        case FETCH_CHARACTERS.FAILURE:
            return {
                ...state,
                loading: false,
                characters: [],
                errorMessage: action.error.message
            };
    }

    return state;
}
