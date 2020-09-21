import React from 'react'
import './Header.scss'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className='Header'>
      <ul>
        <li><h1 className='app-header'>Edible.</h1></li>
        <li><NavLink to='/' className='nav-link home'>HOME</NavLink></li>
        <li><NavLink to='/saved-plants' className='nav-link saved'>SAVED PLANTS</NavLink></li>
      </ul>
    </header>
  )
}

export default Header