import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';

class App extends Component {

  state ={
    events: [],
    locations: [],
    numberOfEvents: 32
  }


  componentDidMount() {
    getEvents().then((events) => {
      this.setState({ events, locations: extractLocations(events) });
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
    this.updateEvents(this.state.selectedLocation);
  }

  updateEvents = (location, inputNumber) => {
    const { eventCount, selectedLocation } = this.state; 
    if (location) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events :
          events.filter((event) => event.location === location);
        const eventsToShow = locationEvents.slice(0, eventCount); 
        this.setState({
          events: eventsToShow,
          selectedLocation: location,
          
        });
      });
    } else {
      getEvents().then((events) => {
        const locationEvents = (selectedLocation === 'all') ?
          events :
          events.filter((event) => event.location === selectedLocation);
        const eventsToShow = locationEvents.slice(0, inputNumber);
        this.setState({
          events: eventsToShow,
          eventCount: inputNumber 
        });
      })
    }
  }
  
  // updateEvents = (location, inputNumber) => {
  //   getEvents().then((events) => {
  //     const locationEvents = (location === 'all') ?
  //       events: 
  //       events.filter((event) => event.location === location);
  //       this.setState({
  //         events: locationEvents
  //       });
  //   });
  // }

  render() {
    return (
      <div className="App">
        <h3>Meet Up</h3>
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        <EventList events={this.state.events}/>

      </div>
    );
  }
}  

export default App;
