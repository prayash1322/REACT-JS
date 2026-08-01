import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Product = () => {
  return (
    <div>
        <div className='flex justify-center gap-10 py4'>
            <Link className='text-xl font-semibold text-white' to='/product/men'>Men</Link>
            <Link className='text-xl font-semibold text-white' to='/product/women'>Women</Link>
        </div>
      {/* <h1>Product Page</h1> */}
      <Outlet />
    </div>
  )
}

export default Product
