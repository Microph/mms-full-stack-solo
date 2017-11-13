import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'

import ClientPage from './components/clientpage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ClientPage />
      </BrowserRouter>
    );
  }
}

export default App;
