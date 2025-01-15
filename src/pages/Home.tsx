// import React from 'react'
import AboutUs from "../component/AboutUs"
import Blog from "../component/Blog"
// import Carousel from "../component/Carousel"
import ProductCards from "../component/ProductCards"
import SuperMat from "../component/SuperMat"
import Supply from "../component/Supply"

function Home() {
  return (
    <div className="overWrapPage">
      <AboutUs />
      <ProductCards />
      <Supply />
      <SuperMat />
      <Blog />
    </div>
  )
}

export default Home
