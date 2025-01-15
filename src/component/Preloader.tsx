import React from 'react'
import imgLoading from '../assets/images/loadinggray.gif'

function Preloader() {
  return (
    <div className='loadingImgFlex'>
      <div className="loadingImg">
        <img src={imgLoading} alt="" />
      </div>
     </div>
  )
}

export default Preloader