import IceAndFireRepository from "../../IceAndFireRepository.js";
import {
  fetchCharactersRequest,
  fetchCharacters,
  fetchSingleCharacter,
  storeCharacter,
  removeCharacter,
  FETCH_SINGLE_CHARACTER,
  FETCH_CHARACTERS,
  STORE_CHARACTER,
  REMOVE_CHARACTER
} from '../../actions/characters';
import { createRequestTypes } from "../../actions/helper.js";
import CharacterHome from '../../containers/characters/characterHome';

test('action should match fetchCharactersRequest', () => {
  const action = fetchCharactersRequest();
  expect(action).toEqual({ type: FETCH_CHARACTERS.REQUEST });
});

test('request type is set correctly', () => {
  const dummyTypes = {
    REQUEST: 'FETCH_SINGLE_CHARACTER_REQUEST',
    SUCCESS: 'FETCH_SINGLE_CHARACTER_SUCCESS',
    FAILURE: 'FETCH_SINGLE_CHARACTER_FAILURE'
  };
  const newRequestType = createRequestTypes("FETCH_SINGLE_CHARACTER");
  expect(newRequestType).toEqual(dummyTypes);
});


