import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PlantCard from '../../components/PlantCard/PlantCard'
import { fetchEdibleRoots, fetchEdibleFlowers } from '../../apiCalls'
import { connect } from 'react-redux'
import { setEdibleFlowers, setEdibleRoots } from '../../actions';
import './Plants.scss';


class Plants extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
      allPlants: []
    } 
  }

  async componentDidMount() {
    const { setEdibleRoots, setEdibleFlowers } = this.props;
    let rootsData = await fetchEdibleRoots()
    let flowersData = await fetchEdibleFlowers()
    setEdibleFlowers(flowersData)
    setEdibleRoots(rootsData) 
  }

// filterPlants (input)
// if input matches listName(s) return listname 
// allplants
// roots
// flowers


  render() {
    const { roots, flowers } = this.props;
    const plants = roots.concat(flowers)
    
    const plantInfo = plants.map(plant => {
     return <PlantCard 
        key={plant.id}
        id={plant.id}
        plantName={plant.common_name}
        image={plant.image_url}
        sciName={plant.scientific_name}
      />
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

export const mapStateToProps = ({ roots, flowers }) => ({
  roots,
  flowers
})

export const mapDispatchToProps = {
    setEdibleRoots,
    setEdibleFlowers
  }

export default connect(mapStateToProps, mapDispatchToProps) (Plants)