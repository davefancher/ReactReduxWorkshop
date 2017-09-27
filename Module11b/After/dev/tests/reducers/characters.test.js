import characterReducer, { INITIAL_STATE } from '../../reducers/characters';

test('initial state should set correctly', () => {
  const state = characterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(INITIAL_STATE);
});


