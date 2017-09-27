import { createRequestTypes } from "./helper.js";
import IceAndFireRepository from "../IceAndFireRepository.js";

// Action Type Constants
export const FETCH_SINGLE_CHARACTER = createRequestTypes("FETCH_SINGLE_CHARACTER");
export const FETCH_CHARACTERS = createRequestTypes("FETCH_CHARACTERS");
export const STORE_CHARACTER = createRequestTypes("STORE_CHARACTER");
export const REMOVE_CHARACTER = createRequestTypes("REMOVE_CHARACTER");

// Fetch Characters Actions
export const fetchCharactersRequest =
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
            dispatch(fetchSingleCharacterRequest());
            return (
                IceAndFireRepository
                    .characters
                    .get(pageInfo)
                    .then(response => dispatch(fetchCharactersSuccess(response)))
                    .catch(err => dispatch(fetchCharactersFailure(err)))
            );
        };

// Fetch Character Actions
const fetchSingleCharacterRequest =
    () => ({ type: FETCH_SINGLE_CHARACTER.REQUEST });

const fetchSingleCharacterSuccess =
    response => ({
        type: FETCH_SINGLE_CHARACTER.SUCCESS,
        character: response.character
    });

const fetchSingleCharacterFailure =
    error => ({
        type: FETCH_SINGLE_CHARACTER.FAILURE,
        error: error
    });

export const fetchSingleCharacter =
    id =>
        dispatch => {
            dispatch(fetchSingleCharacterRequest());
            return (
                IceAndFireRepository
                    .characters
                    .get(id)
                    .then(response => {
                        var data = { character: response[0] };
                        dispatch(fetchSingleCharacterSuccess(data));
                    })
                    .catch(err => dispatch(fetchSingleCharacterFailure(err)))
            );
        };

// Write character to the data store
const storeCharacterRequest =
    () => ({ type: STORE_CHARACTER.REQUEST });

const storeCharacterSuccess =
    response => ({
        type: STORE_CHARACTER.SUCCESS,
        character: response
    });

const storeCharacterFailure =
    error => ({
        type: STORE_CHARACTER.FAILURE,
        error: error
    });

export const storeCharacter =
    character =>
        dispatch => {
            dispatch(storeCharacterRequest());
            return (
                IceAndFireRepository
                    .characters
                    .store(character)
                    .then(response => dispatch(storeCharacterSuccess(response)))
                    .catch(error => dispatch(storeCharacterFailure(error)))
            );
        };

// Remove character from data store
const removeCharacterRequest =
    () => ({ type: REMOVE_CHARACTER.REQUEST });

const removeCharacterSuccess =
    response => ({
        type: REMOVE_CHARACTER.SUCCESS,
        success: response
    });

const removeCharacterFailure =
    error => ({
        type: REMOVE_CHARACTER.FAILURE,
        error: error
    });

export const removeCharacter =
    character =>
        dispatch => {
            dispatch(removeCharacterRequest());
            return (
                IceAndFireRepository
                    .characters
                    .remove(character)
                    .then(response => dispatch(removeCharacterSuccess(response)))
                    .catch(error => dispatch(removeCharacterFailure(error)))
            );
        };
