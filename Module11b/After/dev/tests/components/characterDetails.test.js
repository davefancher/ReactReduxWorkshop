import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { CharacterDetails, PropertyGroup } from '../../components/characters/detail/characterDetails';
import LifeEventField from "../../components/characters/lifeEventField";

const character = {
    name: "Gwen"
};

test('characterDetails.js renders correctly', () => {
    const component = shallow(
        <CharacterDetails character={character} />
    );
    expect(component).toMatchSnapshot();
})

test('should render seven <PropertyGroup /> components', () => {
    const component = shallow(<CharacterDetails character={character} />);
    expect(component.find(PropertyGroup)).toHaveLength(7);
});

test('should render seven <LifeEventField /> components', () => {
    const component = shallow(<CharacterDetails character={character} />);
    expect(component.find(LifeEventField)).toHaveLength(2);
});

test('should render .dl-horizontal class', () => {
    const component = shallow(<CharacterDetails character={character} />);
    expect(component.find('.dl-horizontal')).toHaveLength(1);
});


