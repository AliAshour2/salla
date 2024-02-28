import React from 'react'
import styles from './NotFound.module.css'

import error from '../assets/images/error.png'
function NotFound() {
  return (
    <div className="container ms-auto my-5">
      <img className='w-100' src={error} alt="" />
    </div>
  )
}

export default NotFound