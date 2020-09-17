import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PlantCard from '../../components/PlantCard/PlantCard'
import { fetchEdiblePlants } from '../../apiCalls'
import { connect } from 'react-redux'
import { setEdibleFlowers, setEdibleRoots, setEdibleLeaves, setEdibleSeeds } from '../../actions';
import './Plants.scss';


class Plants extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
    } 
  }

  async componentDidMount() {
    const { setEdibleRoots, setEdibleFlowers, setEdibleLeaves, setEdibleSeeds } = this.props;
    try {
      let rootsData = await fetchEdiblePlants('roots')
      let flowersData = await fetchEdiblePlants('flowers')
      let leavesData = await fetchEdiblePlants('leaves')
      let seedsData = await fetchEdiblePlants('seeds')
      setEdibleRoots(rootsData) 
      setEdibleFlowers(flowersData)
      
      setEdibleSeeds(seedsData)
      setEdibleLeaves(leavesData)
     
    }
    catch(error) {
      console.warn(error)
    }
  }

  render() {
    const { plants } = this.props;
    const plantKeys = Object.keys(plants)
    let plantInfo;
    plantKeys.forEach(key => {
      return plantInfo = plants[key].map((plant, i) => {
      return <PlantCard 
        key={i}
        id={plant.id}
        plantName={plant.common_name}
        image={plant.image_url}
        sciName={plant.scientific_name}
        />
    })
  })

    return (
      <section className='Plants'>
        <h1 className='page-heading'>Browse Plants</h1>
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
    setEdibleRoots,
    setEdibleFlowers,
    setEdibleLeaves,
    setEdibleSeeds
  }

export default connect(mapStateToProps, mapDispatchToProps) (Plants)