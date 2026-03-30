import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Cart from './Pages/Cart/Cart'
import Home from './Pages/Home/Home'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './Pages/verify/Verify'

const App = () => {

const [showLogin, setShowLogin]= useState(false)
const [searchText, setSearchText] = useState("")

  return (
    <>
    {showLogin? <LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>

      <Navbar setShowLogin={setShowLogin} setSearchText={setSearchText}/>
      
      <Routes>
        < Route path='/' element={<Home searchText={searchText}/>}/>
        < Route path='/cart' element={<Cart/>}/>
        < Route path='/order' element={<PlaceOrder/>}/>
        <Route path='/verify' element={<Verify/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App