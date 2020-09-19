import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { fetchEdiblePlants } from '../../apiCalls'
import { setEdiblePlants } from '../../actions';
import Header from '../Header/Header'
import Plants from '../../containers/Plants/Plants'
import SavedPlants from '../../containers/SavedPlants/SavedPlants'
import './App.scss';
import { connect } from 'react-redux';

class App extends Component {

  async componentDidMount() {
    const { setEdiblePlants } = this.props;
    try {
      // how to refactor? Loads really slow
      const leavesData = await fetchEdiblePlants('leaves')
      const rootsData = await fetchEdiblePlants('roots')
      const flowersData = await fetchEdiblePlants('flowers')
      const fruitsData = await fetchEdiblePlants('fruits')
      const seedsData = await fetchEdiblePlants('seeds')
      const newDataSet = leavesData.concat(
        rootsData,
        flowersData,
        fruitsData,
        seedsData
      )
      setEdiblePlants(newDataSet)
    }
    catch (error) {
      console.warn(error)
    }
  }


  render() {
    return (
      <main className="App">
        <Header />
        <Switch>
        <Route exact path='/' render={() =>  
          <Plants />
        } />
        <Route exact path='/saved-plants' render={() =>
          <SavedPlants />
        } />
        </Switch>
      </main>
    )
  }
}

export const mapStateToProps = ({ plants }) => ({
  plants
})

export const mapDispatchToProps = {
  setEdiblePlants
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
