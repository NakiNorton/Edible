import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
import { setEdiblePlants } from '../../actions';
import PlantCard from '../PlantCard/PlantCard'
import './SavedPlants.scss';

const SavedPlants = ({ plants }) => {
    const savedPlants = plants.map((plant, i) => {
    return <PlantCard
      key={i}
      id={plant.id}
      plantName={plant.common_name}
      image={plant.image_url}
      sciName={plant.scientific_name}
      list={plant.list}
    />
  })
  
  return (
    <section className='SavedPlants'>
      <h1 className='page-heading'>Your Saved Plants</h1>
      <section>
        {savedPlants.length === 0 &&
          <h3 className='no-plants-msg'>You haven't saved any plants yet. </h3>
        }
      </section>
      <section className='plant-container'>
        {savedPlants}
      </section>
    </section>
  )
}

export const mapStateToProps = ({ plants }) => ({
  plants
})


export const mapDispatchToProps = {
  setEdiblePlants
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedPlants)