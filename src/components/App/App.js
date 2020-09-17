import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header'
import Plants from '../../containers/Plants/Plants'
import { fetchPlants } from '../../apiCalls'

import './App.scss';

const App = () => {

    return (
      <main className="App">
        <Header />
        <Plants />
      </main>
    )
   
}

export default App;
