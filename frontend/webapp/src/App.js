import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//1. setup redux
//2. install tailwind
//3. create auth and dashboard ui (basic)
//4. complete redux functions
//5. built ui using tailwind
//6. make zoom functionality and convert it to npm library
//7. move towards gpu inference
//8. integrate
//9. fix issues

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
