import React, { Component } from 'react';
import Calendar from 'react-calendar';
import './CalendarLayout.css';

class CalendarLayout extends Component {
  constructor(props) {
    super()
  }
  state = {
    date: new Date(),
  }

  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        <Calendar
          onChange={this.onChange}
          activeStartDate={new Date(this.props.date)}
          calendarType={this.props.calendarType}
          minDate={new Date(this.props.date)}
          maxDate={this.props.max}
          tileClassName={"calendarUI"}
        />
        <button className="btn btn-danger" onClick={this.props.goBack}> Go Back </button>
      </div>
    );
  }
}

export default CalendarLayout;
