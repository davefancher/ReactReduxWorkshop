import React from 'react';
import { shallow } from 'enzyme';
import { CharacterDetails } from '../../components/characters/detail/characterDetails';

test('characterDetails.js renders correctly', () => {
    const component = shallow(
        <CharacterDetails />
    );
    expect(component).toMatchSnapshot();
})
