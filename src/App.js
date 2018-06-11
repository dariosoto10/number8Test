import React, { Component } from 'react';
import './App.css';
import CalendarUI from './CalendarUI.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Number 8 TEST</h2>
        </div>
        <CalendarUI />
      </div>
    );
  }
}

export default App;
