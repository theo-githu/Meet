
import React, { Component } from 'react';

class Event extends Component {
  state = { collapsed: true };
    toggleDetails = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed,
        }));
    };

  render() {
    const { event } = this.props;
    const { collapsed } = this.state;
    return (
    <div className="event">
    <h2 className="summary">{event.summary}</h2>
    <p className="event-start">
        {new Date(event.start.dateTime).toString()}
    </p>
    <p className="event-location">
        {`@${event.summary} | ${event.location}`}
    </p>
    {!collapsed && (
        <>
            <div className="details">
            <h3 className="about">About event:</h3>
            <a className="link" href={event.htmlLink}>
                See details on Google Calendar
            </a>
            <p className="description">{event.description}</p>
            </div>
        </>
    )}

    <button className="details-btn" onClick={() => this.toggleDetails()}>
        {collapsed ? "show" : "hide"} details
    </button>
    
  </div>
  )}
};

export default Event;



// import React, { Component } from 'react';

// class Event extends Component {

//   state = {
//     hide: true,
//   };

//   handleItemClicked = () => {
//     this.setState((previousState) => ({
//       hide: !previousState.hide,
//     }));
//     console.log(this.state.hide);
//   };

//   render() {
//     const { event } = this.props;

//     return (
//       <div className='event'>
//         <b className='title'>Summary: {event.summary}</b>
//         {this.state.hide === false && (
//           <ul className='details'>
//             <li>Description: {event.description}</li>
//             <li>Location: {event.location}</li>
//             <li>Start: {new Date(event.start.dateTime).toISOString()}</li>
//             <li>End: {new Date(event.end.dateTime).toISOString()}</li>
//           </ul>
//         )}

//         <br />

//         <button
//           className='detailsButton'
//           onClick={() => this.handleItemClicked()}>
//           Details
//         </button>
//       </div>
//     );
//   }
// }
// export default Event;