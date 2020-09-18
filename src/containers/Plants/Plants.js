import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PlantCard from '../../components/PlantCard/PlantCard'
import { fetchEdiblePlants } from '../../apiCalls'
import { connect } from 'react-redux'
import { setEdiblePlants } from '../../actions';
import './Plants.scss';


class Plants extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
    } 
  }

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
    }
    catch(error) {
      console.warn(error)
    }
  }

  render() {
    const { plants } = this.props;
    let plantInfo = Object.keys(plants).map((key, i) => {
      console.log(plants[key].common_name)
      return <PlantCard
        key={i}
        id={plants[key].id}
        plantName={plants[key].common_name}
        image={plants[key].image_url}
        sciName={plants[key].scientific_name}
        />
    })

    return (
      <section className='Plants'>
        <h1 className='page-heading'>Browse Plants</h1>
        <>
        <div className='search-container'>
          <div className='search'>
            <input type='text' className='searchInput' placeholder='What are you looking for?' />
              <button type='submit' className='searchButton'>
              <i className='search-icon'></i>
              </button>
           </div>
        </div>
        </>
        <section className='plant-container'>
          {plantInfo}
        </section>
      </section>
    )
  }
}

export const mapStateToProps = ({ plants }) => ({
 plants
})

export const mapDispatchToProps = {
    setEdiblePlants
  }

export default connect(mapStateToProps, mapDispatchToProps) (Plants)