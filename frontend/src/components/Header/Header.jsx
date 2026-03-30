import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Half Fried – Full Taste, Full Satisfaction</h2>
            <p>Enjoy delicious, freshly prepared meals your way. Whether you prefer a comfortable dine-in experience or quick and reliable home delivery, we serve flavorful dishes made with quality ingredients. From snacks to full meals, great taste is always ready for you.</p>
            <button onClick={()=>{
              document.getElementById("explore-menu").scrollIntoView({bahavior: "smooth"})
            }}>View Menu</button>
        </div>
    </div>
  )
}

export default Header