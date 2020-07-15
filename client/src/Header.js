import React from 'react'

const Header = () => {
  const link = 'https://turianytsia.com'

  return (
    <div className="header">
      <h1
        className="header__title">
        What <a className="header__link" href={link}>Ivan</a> eats?
      </h1>
    </div>
  )
}

export default Header
