import {
    FETCH_CHARACTERS,
    FETCH_SINGLE_CHARACTER,
    STORE_CHARACTER,
    REMOVE_CHARACTER
} from "../actions/characters.js";

export const INITIAL_STATE = {
    loading: true,
    characters: [],
    character: {
        name: "",
        aliases: []
    },
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
                },
                character: {
                    name: "",
                    aliases: []
                }
             };

        case FETCH_CHARACTERS.FAILURE:
            return {
                ...state,
                loading: false,
                characters: [],
                errorMessage: action.error.message
            };

        case FETCH_SINGLE_CHARACTER.REQUEST:
            return {
                ...state,
                loading: true,
                errorMessage: "",
                characters: [],
                character: {
                    name: "",
                    aliases: []
                }
            };

        case FETCH_SINGLE_CHARACTER.SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: "",
                characters: [],
                character: action.character
            };

        case FETCH_SINGLE_CHARACTER.FAILURE:
            return {
                ...state,
                loading: false,
                character: {},
                errorMessage: action.error.message
            };

        case STORE_CHARACTER.REQUEST:
            return {
                ...state,
                loading: true
            };

        case STORE_CHARACTER.SUCCESS:
            return {
                ...state,
                loading: false
            };

        case STORE_CHARACTER.FAILURE:
            return {
                ...state,
                loading: false,
                character: action.character,
                errorMessage: action.error.message
            }

        case REMOVE_CHARACTER.REQUEST:
            return {
                ...state,
                loading: true
            };

        case REMOVE_CHARACTER.SUCCESS:
            return {
                ...state,
                loading: false
            };

        case REMOVE_CHARACTER.FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.error.message
            }
    }

    return state;
}
