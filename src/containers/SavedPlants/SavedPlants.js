import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux'
// import { setEdiblePlants } from '../../actions';
import './SavedPlants.scss';

const SavedPlants = () => {

  return (
    <h2>Hello</h2>
  )
}



export const mapStateToProps = ({ plants }) => ({
  plants
})

export const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedPlants)