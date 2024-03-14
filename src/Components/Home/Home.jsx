import React, { useContext } from 'react'
import styles from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import BrandsMarquee from '../BrandsMarquee/BrandsMarquee';

function Home() {
  
  return (
    <>
    <div className="container">
    <MainSlider/>
    <CategoriesSlider/>
    <BrandsMarquee/>
    </div>
    
   
    </>
  )
}

export default Home