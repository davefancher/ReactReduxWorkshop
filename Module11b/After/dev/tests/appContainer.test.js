import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store';
import AppContainer from '../containers/appContainer';

test('appContainer.js renders correctly', () => {
    const component = shallow(
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
    expect(component).toMatchSnapshot();
})
