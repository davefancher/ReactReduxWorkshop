# Section 9 - Intro to Testing in React

## Jest and Tooling Overview

##Jest setup

## Writing a basic test... does component exist
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { shallow, render } from 'enzyme';
import App from './App';
import store from '../store';

test('Search renders correctly', () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});

__write 4 or 5 more tests__

## Useful FeaturesFeatures
- code coverage... --coverage

## TDD Demo
