
import React from 'react';
import { shallow } from 'enzyme';

// import App from '../App';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateNumberOfEvents={() => {}} updateEvents={() => {}}/>);
    });

    test('renders the component', () => {
        expect(NumberOfEventsWrapper).toBeDefined();
    });

    test('user gets 32 events by default', () => {
        expect(NumberOfEventsWrapper.find('input.number').prop('type')).toBe('number');
        expect(NumberOfEventsWrapper.state('number')).toBe(32);
    });

    test('renders input correctly', () => {
        const number = NumberOfEventsWrapper.state('number');
        expect(NumberOfEventsWrapper.find('.number').prop('value')).toBe(number);
    });

    test('change state when user input changes', () => {
        expect(NumberOfEventsWrapper.state('number')).toBe(32);
        NumberOfEventsWrapper.find('input.number').simulate('change', {
            target: { value: 32},
        });
        expect(NumberOfEventsWrapper.state('number')).toBe(32);
    });


});


