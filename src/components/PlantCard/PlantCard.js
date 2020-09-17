import React from 'react';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
import './PlantCard.scss';

const PlantCard = ({ id, plantName, image, sciName }) => {
  return (
    <section className='PlantCard'>
        <img className='Book-card-image' alt={plantName} src={image} />
        <article id={id} className='plant-details'>
          <p>Common name: {plantName}</p>
          <p>Scientific name: {sciName}</p> 
        </article>
    </section>
  )
}

export default PlantCard