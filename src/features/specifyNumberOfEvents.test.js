import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('When user hasn’t specified a number, 32 is the default number', ({ given, when, then }) => {
        given('the app has loaded', () => {
            AppWrapper = mount(<App />);

        });

        when('the user has not yet selected a number of events', () => {
            AppWrapper = mount(<App />);

        });

        then('the user sees 32 events by default', () => {
            AppWrapper.update();
            expect(AppWrapper.state('numberOfEvents')).toEqual(32);
            

        });
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        given('the app has loaded', () => {
            AppWrapper = mount(<App />);

        });

        when('the user has selected a number of events', () => {
            AppWrapper.update();
            let NumberOfEventsWrapper = AppWrapper.find('NumberOfEvents');
            const eventNumber = { target: { value: 22 } };
            NumberOfEventsWrapper.find('.number').simulate('change', eventNumber);
            expect(NumberOfEventsWrapper.state('number')).toBe(22);

        });

        then('the event list elements shows the number of events set by the user', () => {
            expect(AppWrapper.find('.EventList')).toHaveLength(1);

        });
    });

});
