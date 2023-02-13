import React from 'react'
import { NavLink } from 'react-router-dom'

const Error = () => {
  return (
    <div className="alert alert-danger w-50 center mt-4" role="alert">
      <h4 className="alert-heading">Error 404!</h4>
      <p>The Page you are looking for is not available or has been moved.</p>
      <hr />
      <NavLink to="/" className="links">Go to Home Page &rarr;</NavLink>

    </div>
  )
}

export default Error
