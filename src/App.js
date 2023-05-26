import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
// import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WarningAlert } from './Alert';

class App extends Component {

  state ={
    events: [],
    locations: [],
    selectedLocation: 'all',
    numberOfEvents: 32,
    warningText: ''
  }

  async componentDidMount() {
    this.mounted = true;
    
    if (window.location.href.startsWith("http://localhost")) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events)});
        }
      });
    }

  getEvents().then((events) => {
    if (this.mounted) {
      this.setState({ events, locations: extractLocations(events) });
    }
  });
}

  componentWillUnmount(){
    this.mounted = false;
  }

  prompOfflineWarning = () => {
    if (!navigator.onLine) {
      this.setState({ 
        warningText: 'You are offline. Events may not be uptodate.'
      })
    }
  }

  // data from API recharts
  
  // getData = () => {
  //   const {locations, events} = this.state;
  //   const data = locations.map((location)=>{
  //     const number = events.filter((event) => event.location === location).length
  //     const city = location.split(', ').shift()
  //     return {city, number};
  //   })
  //   return data;
  // };

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

  render() {
    const { locations, numberOfEvents } = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
          <WarningAlert text={this.state.warningText} />
        <h4>Choose your nearest city</h4>
        <CitySearch updateEvents={this.updateEvents} locations={locations} />
        <NumberOfEvents updateEvents={this.updateEvents} numberOfEvents={numberOfEvents} />       
        <h4>Events in each city</h4>

        {/* <ResponsiveContainer height={400}>
          <ScatterChart
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="City" />
            <YAxis type="number" dataKey="number" name="Number of Events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer> */}

        <EventList events={this.state.events} />
      </div>
    );
  }
}  

export default App;
