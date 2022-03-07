import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//1. setup redux - DONE
//2. install tailwind - TODO
//3. create auth and dashboard ui using tailwind(basic) - TODO
//4. complete redux functions
//5. make zoom functionality and convert it to npm library
//6. move towards gpu inference
//7. integrate
//8. fix issues
//9. Improve UI to professional one
//10. Create Microservice for auth
//11. Create Microservice for inference
//12. Use Jest Testing for inference

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
