import React, { useContext } from 'react'
import styles from './Home.module.css'
import Cart from '../Cart/Cart'
import { CounterContext } from '../../Context/Counter'

function Home() {
  let {counter, increase} = useContext(CounterContext);
  console.log(counter);
  return (
    <>
      <Cart userName = "ali" />
      <h2 className='p-5 bg-danger text-white'>{counter}</h2>
      <h2 className='p-5 bg-danger text-white'>{counter}</h2>
      <button onClick={increase} className='bg-bg-danger'>+1</button>
    </>
  )
}

export default Home