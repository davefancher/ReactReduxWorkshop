import IceAndFireRepository from "../iceAndFireRepository.js";

const createRequestTypes = prefix =>
    ["REQUEST", "SUCCESS", "FAILURE"]
        .reduce(
            (obj, type) => { obj[type] = `${prefix}_${type}`; return obj; },
            {});

export const FETCH_CHARACTERS = createRequestTypes("FETCH_CHARACTERS");

const fetchCharactersRequest =
    () => ({ type: FETCH_CHARACTERS.REQUEST });

const fetchCharactersSuccess =
    response => ({
        type: FETCH_CHARACTERS.SUCCESS,
        characters: response.characters,
        pagination: response.pagination
    });

const fetchCharactersFailure =
    error => ({
        type: FETCH_CHARACTERS.FAILURE,
        error: error
    });

export const fetchCharacters =
    pageInfo =>
        dispatch => {
            dispatch(fetchCharactersRequest());
            return (
                IceAndFireRepository
                    .characters
                    .get(pageInfo)
                    .then(response => dispatch(fetchCharactersSuccess(response)))
                    .catch(err => dispatch(fetchCharactersFailure(err)))
            );
        };