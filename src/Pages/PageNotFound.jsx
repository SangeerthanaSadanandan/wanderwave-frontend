import React from 'react'
import './Styles/PageNotFound.css'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='not-found-container'>
      <div className="not-found-content">
        <h1>Oops! Page Not Found</h1>
        <p>
          It seems like you took a wrong turn on your journey.
          Let's get you back on track !
        </p>
        <img
          src="https://cdn3d.iconscout.com/3d/premium/thumb/man-confused-while-finding-travel-location-8787621-7269635.png"
          alt="Lost traveler"
          className="not-found-image"
        />
        <div className="not-found-button">
          <Link to="/" className="back-to-home-link">
            <button className="back-to-home-btn">Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound