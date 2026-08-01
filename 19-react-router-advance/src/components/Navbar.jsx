import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex py-4 px-8 bg-cyan-700 font-semibold justify-between text-white'>
      <h2 className='text-xl font-bold'>Prayash</h2>
      <div className='flex gap-10'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/product">Product</NavLink>
      </div>
    </div>
  )
}

export default Navbar
