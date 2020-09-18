import React from 'react';
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
import './PlantCard.scss';

const PlantCard = ({ id, plantName, image, sciName, list }) => {
  return (
    <section className='PlantCard'>
        <img className='Book-card-image' alt={plantName} src={image} />
        <article id={id} className='plant-details'>
          <p>Common name: {plantName}</p>
          <p>Scientific name: {sciName}</p> 
          <p>What's edible? The {list}</p> 
          <button className='save-plant'>Save</button>
        </article>
    </section>
  )
}

export default PlantCard