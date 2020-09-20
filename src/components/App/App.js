import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchEdiblePlants } from '../../helpers/apiCalls'
import { setEdiblePlants } from '../../actions';
import Header from '../Header/Header'
import Plants from '../../containers/Plants/Plants'
import SavedPlants from '../../containers/SavedPlants/SavedPlants'
import plantImg from './sprout.png'
import './App.scss';
import { connect } from 'react-redux';

class App extends Component {
  state = { isLoading: true }

  async componentDidMount() {
    const { setEdiblePlants } = this.props;
    try {
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
      this.setState({ isLoading: false })
    }
    catch(error) {
      console.warn(error)
    }
  }


  render() {
    return (
      <main className='App'>
        <Header />
        {this.state.isLoading &&
          <>
          <h1 className='page-loading'>Page loading...</h1>
          <img className='plant-img' alt='plant' src={plantImg} />
          </>
        }
        {!this.state.isLoading &&
          <>
          <Route exact path='/' render={() =>  
            <Plants />
          } />
          <Route exact path='/saved-plants' render={() =>
            <SavedPlants />
          } />
          </>
        }
      </main>
    )
  }
}

App.propTypes = {
  plants: PropTypes.array
}

export const mapStateToProps = ({ plants }) => ({
  plants
})

export const mapDispatchToProps = {
  setEdiblePlants
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
