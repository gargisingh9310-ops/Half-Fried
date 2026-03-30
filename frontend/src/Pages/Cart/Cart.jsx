import React, { useContext, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const { cartItem, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const [showPopup, setShowPopup] = useState(false)

  const handleCheckout = () => {
    if (getTotalCartAmount() === 0) {
      setShowPopup(true)
      return
    }
    navigate('/order')
  }

  return (
    <div className="cart">

      <div className="cart-left">
        <h2>Your Cart</h2>

        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <div className="cart-card" key={item._id}>

                <img src={url + "/images/" + item.image} alt={item.name} />

                <div className="cart-card-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price} × {cartItem[item._id]}</p>
                </div>

                <div className="cart-card-right">
                  <p className="cart-total">
                    ₹{item.price * cartItem[item._id]}
                  </p>

                  <span onClick={() => removeFromCart(item._id)}>×</span>
                </div>

              </div>
            )
          }
          return null
        })}
      </div>

      <div className="summary-order">

        <h3>Order Summary</h3>

        <div className="summary-row">
          <p>Subtotal</p>
          <p>₹{getTotalCartAmount()}</p>
        </div>

        <div className="summary-row">
          <p>Delivery</p>
          <p>₹{getTotalCartAmount() === 0 ? 0 : 50}</p>
        </div>

        <hr />

        <div className="summary-row total">
          <b>Total</b>
          <p>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</p>
        </div>

        <button onClick={handleCheckout}>
          Proceed To Checkout
        </button>

      </div>

      {showPopup && (
        <div className="cart-popup">
          <div className="popup-box">
            <h3>No Food Added</h3>
            <p>Please add food items to your cart before checkout.</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Cart