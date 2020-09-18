import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/Header'
import Plants from '../../containers/Plants/Plants'
import SavedPlants from '../../containers/SavedPlants/SavedPlants'
import './App.scss';

const App = () => {
  return (
    <main className="App">
      <Header />
      <Route exact path='/' render={() =>  
        <Plants />
      } />
      <Route exact path='/saved-plants' render={() =>  
        <SavedPlants />
      } />

    </main>
  )
}

export default App;
