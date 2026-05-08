import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItem,
    setCartItem,
    url
  } = useContext(StoreContext);

  const navigate = useNavigate();

  // ==========================
  // STATES
  // ==========================
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [loading, setLoading] = useState(false);

  // ✅ POPUP STATE
  const [showPopup, setShowPopup] = useState(false);

  const [popupMessage, setPopupMessage] = useState("");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });

  // ==========================
  // INPUT HANDLER
  // ==========================
  const onChangeHandler = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ==========================
  // TOTAL CALCULATION
  // ==========================
  const deliveryCharge =
    getTotalCartAmount() === 0 ? 0 : 50;

  const totalAmount =
    getTotalCartAmount() + deliveryCharge;

  // ==========================
  // PLACE ORDER
  // ==========================
  const handlePlaceOrder = async (event) => {

    event.preventDefault();

    // ✅ STOP DOUBLE CLICK
    if (loading) return;

    setLoading(true);

    let orderItems = [];

    food_list.forEach((item) => {

      if (cartItem[item._id] > 0) {

        let itemInfo = { ...item };

        itemInfo.quantity = cartItem[item._id];

        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount,
      paymentMethod: paymentMethod.toLowerCase(),
    };

    try {

      // ==========================
      // COD FLOW
      // ==========================
      if (paymentMethod === "cod") {

        const response = await axios.post(
          url + "/api/order/placecod",
          orderData,
          {
            headers: { token }
          }
        );

        if (response.data.success) {

          // ✅ CLEAR CART
          setCartItem({});

          // ✅ POPUP
          setPopupMessage("Order Placed Successfully (COD)");
          setShowPopup(true);

          setTimeout(() => {
            navigate("/myorders");
          }, 2000);

        } else {

          setPopupMessage(response.data.message);
          setShowPopup(true);
        }
      }

      // ==========================
      // ONLINE PAYMENT FLOW
      // ==========================
      else {

        const response = await axios.post(
          url + "/api/order/place",
          orderData,
          {
            headers: { token }
          }
        );

        if (response.data.success) {

          // ✅ CLEAR CART
          setCartItem({});

          const { session_url } = response.data;

          window.location.replace(session_url);

        } else {

          setPopupMessage("Error placing order");
          setShowPopup(true);
        }
      }

    } catch (error) {

      console.log(error);

      setPopupMessage("Server error while placing order");
      setShowPopup(true);

    } finally {

      // ✅ ENABLE BUTTON AGAIN
      setLoading(false);
    }
  };

  // ==========================
  // REDIRECT CHECK
  // ==========================
  useEffect(() => {

    if (!token) {

      navigate("/cart");

    } else if (getTotalCartAmount() === 0) {

      navigate("/cart");
    }

  }, [token, getTotalCartAmount, navigate]);

  return (

    <>

      <form
        onSubmit={handlePlaceOrder}
        className="place-order"
      >

        {/* ==========================
            LEFT SIDE
        ========================== */}
        <div className="place-order-left">

          <p className="title">
            Delivery Information
          </p>

          <div className="multi-fields">

            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
            />

            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
            />

          </div>

          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email Address"
          />

          <input
            required
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />

          <div className="multi-fields">

            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />

            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
            />

          </div>

          <div className="multi-fields">

            <input
              required
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              type="text"
              placeholder="Zip Code"
            />

          </div>

          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="number"
            placeholder="Phone Number"
          />

        </div>

        {/* ==========================
            RIGHT SIDE
        ========================== */}
        <div className="place-order-right">

          <div className="summary-order-payment">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>

            <div className="summary-row">
              <p>Delivery</p>
              <p>₹{deliveryCharge}</p>
            </div>

            <hr />

            <div className="summary-row total">
              <b>Total</b>
              <p>₹{totalAmount}</p>
            </div>

            {/* PAYMENT METHOD */}
            <div className="payment-method">

              <h3>Select Payment Method</h3>

              <div className="payment-options">

                {/* COD */}
                <label
                  className={`payment-option ${paymentMethod === "cod" ? "active" : ""
                    }`}
                >

                  <input
                    type="radio"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    disabled={totalAmount > 1000}
                  />

                  Cash on Delivery

                </label>

                {/* ONLINE */}
                <label
                  className={`payment-option ${paymentMethod === "online" ? "active" : ""
                    }`}
                >

                  <input
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  Online Payment

                </label>

              </div>

              {totalAmount > 1200 && (
                <p className="cod-warning">
                  COD not available above ₹1200
                </p>
              )}

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Placing Order..."
                : paymentMethod === "cod"
                  ? "Place Order"
                  : "Proceed To Payment"}

            </button>

          </div>

        </div>

      </form>

      {/* ==========================
          POPUP
      ========================== */}

      {
        showPopup && (

          <div className="popup-overlay">

            <div className="popup-box">

              <h2>Message</h2>

              <p>{popupMessage}</p>

              <button
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>

            </div>

          </div>
        )
      }

    </>
  );
};

export default PlaceOrder;