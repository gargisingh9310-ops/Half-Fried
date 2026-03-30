import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className='footer' id='footer'>

      <div className="footer-content">

        {/* LEFT SECTION */}
        <div className="footer-content-left">
          <img src={assets.logo} alt="Half Fried Logo" />
          <p>
            At Half Fried, we serve bold flavors and freshly prepared dishes 
            for both dine-in and delivery. From spicy street-style favorites 
            to comforting full meals, great taste is always waiting for you.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        {/* COMPANY SECTION */}
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Dining & Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* CONTACT SECTION */}
        <div className="footer-content-right">
          <h2>Contact Us</h2>
          <ul>
            <li>+91 9213 4080 00</li>
            <li>halffried.in@gmail.com</li>
          </ul>
        </div>

        {/* BRANCHES SECTION */}
        <div className="footer-content-branches">
          <h2>Our Branches</h2>
          <ul>
            <li><b>Half Fried(main) – </b><span className='address'> F-328, Ground Floor, Mehrauli Badarpur road, Chatri Wala Kuan, Lado Sarai, South Delhi - 110030</span></li>
            <li><b>Half Fried –</b><span className='address'> DDA Shop 32, Shashi Garden, Mayur Vihar Phase 1, New Delhi.</span></li>
          </ul>
        </div>

      </div>

      <hr />

      {/* BACK TO TOP BUTTON */}
      <button className="back-to-top" onClick={scrollToTop}>
        ↑ Back to Top
      </button>

      <p className='footer-copyright'>
        © 2026 Half Fried. Serving Freshness & Flavor Every Day.
      </p>

    </div>
  )
}

export default Footer