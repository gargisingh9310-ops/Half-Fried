import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({ setShowLogin, setSearchText }) => {

  const [menu, setMenu] = useState("home")
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState("")

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate= useNavigate();

  const logout= ()=>{
localStorage.removeItem("token");
setToken("");
navigate("/");

  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    if (setSearchText) {
      setSearchText(e.target.value)
    }
  }

  return (
    <div className='navbar'>

      {/* Logo */}
      <Link to='/'>
        <img src={assets.logo} alt="logo" className='logo' />
      </Link>

      {/* Menu */}
      <ul className={`navbar-menu ${showMenu ? "show" : ""}`}>
        <Link 
          to='/' 
          onClick={() => { setMenu("home"); setShowMenu(false) }} 
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>

        <a 
          href='#explore-menu' 
          onClick={() => { setMenu("menu"); setShowMenu(false) }} 
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>

        <a 
          href='#app-download' 
          onClick={() => { setMenu("mobile-app"); setShowMenu(false) }} 
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>

        <a 
          href='#footer' 
          onClick={() => { setMenu("contact-us"); setShowMenu(false) }} 
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      
      <div className="navbar-right">

        
        <img 
          src={assets.search_icon} 
          alt="search" 
          style={{ cursor: "pointer" }}
          onClick={() => setShowSearch(!showSearch)}
        />

        
        {showSearch && (
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        )}

        
        <div className="navbar-search-icon">
          <Link to='/cart'>
            <img src={assets.basket_icon} alt="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? ( 
          <button onClick={() => setShowLogin(true)}>
          Sign In
        </button>
        ):( <div className='Navbar-profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <li><img src={assets.bag_icon} alt="" /><p><b>Orders</b></p></li>
            <hr />
            <li onClick={logout}> <img src={assets.logout_icon} alt="" /><p><b>Logout</b></p></li>
          </ul>
          </div>
          )}

      
        <div 
          className="hamburger" 
          onClick={() => setShowMenu(!showMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

    </div>
  )
}

export default Navbar;
