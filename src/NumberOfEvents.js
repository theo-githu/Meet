
import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        number: 32,
    }

    handleNumberChange = (event) => {
        const value = event.target.value;
        this.props.updateEvents(null, value);
        this.setState({ number: value });

        if (value < 1) {
            this.setState({
                errorText: 'Select number from 1 to 32',
            });
        } else {
            this.setState({
                errorText: '',
            });
        }
    };

    render () {
        return (
            <div className='numberOfEvents'>
                <h4>Number of Events:</h4>
                <input 
                    id='number-of-events'
                    type='number'
                    className='number'
                    value={this.state.number}
                    onChange={this.handleNumberChange}
                />

                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}

export default NumberOfEvents;