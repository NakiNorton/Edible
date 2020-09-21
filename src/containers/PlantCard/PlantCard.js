import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addPlant, removePlant } from '../../actions'
import './PlantCard.scss'

const PlantCard = ({ id, plantName, image, sciName, list, isSaved, addPlant, removePlant }) => {

  const handleClick = () =>  {
    !isSaved ? addPlant(id) : removePlant(id)
  }

  return (
    <section className='PlantCard'>
      <h2 className='common-name'>{plantName}</h2>
      <img className='plant-card-image' alt={plantName} src={image} />
      <article id={id} className='plant-details'>
        <p><span>Scientific name:</span> {sciName}</p> 
        <p><span>What's edible?</span> The {list}</p> 
        <button className='save-plant-btn' onClick={handleClick}>
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </article>
    </section>
  )
}

PlantCard.propTypes = {
  id: PropTypes.number,
  plantName: PropTypes.string,
  image: PropTypes.string,
  sciName: PropTypes.string,
  list: PropTypes.string,
  removePlant: PropTypes.func,
  addPlant: PropTypes.func,
  isSaved: PropTypes.bool
}

export const mapDispatchToProps = {
  addPlant,
  removePlant
}

export default connect(null, mapDispatchToProps)(PlantCard)