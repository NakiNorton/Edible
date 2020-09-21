import React from 'react'
import './Facts.scss'
import plantImage from '../../assets/sprout.png'

const Facts  = () => {
  return (
    <div className='Facts'>
      <img className='plant-icon' src={plantImage} alt='plant icon' />
      <p>'Even in the modern world, it’s possible to find and pick wild plants that are not just edible, but highly nutritious.'</p>
      <p>'Edible plants found in the wild are often more nutritious than the kinds you can buy at the store.'</p>
      <p>'The carbon footprint of wild greens virtually nil.'</p>
    </div>
  )
}

export default Facts