import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

  const { url, token } = useContext(StoreContext);

  const [data, setData] = useState([]);

  // POPUP STATE
  const [showPopup, setShowPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  // ==========================
  // FETCH USER ORDERS
  // ==========================
  const fetchOrders = async () => {

    try {

      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        setData(response.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // LOAD ORDERS
  // ==========================
  useEffect(() => {

    if (token) {
      fetchOrders();
    }

  }, [token]);

  return (

    <>

      <div className='my-orders'>

        <h2 className='my-orders-title'>
          My Orders
        </h2>

        {data.length === 0 ? (

          <p className='no-orders'>
            No orders found
          </p>

        ) : (

          <div className='my-orders-container'>

            {data.map((order, index) => (

              <div
                key={index}
                className='my-orders-card'
              >

                {/* ORDER ICON */}
                <img
                  src={assets.parcel_icon}
                  alt="parcel"
                  className='order-icon'
                />

                {/* ORDER DETAILS */}
                <div className='order-details'>

                  {/* ITEMS */}
                  <p className='order-items'>

                    {order?.items?.map((item, i) => (

                      <span key={i}>

                        {item.name} x {item.quantity}

                        {i !== order.items.length - 1 && ", "}

                      </span>
                    ))}

                  </p>

                  {/* AMOUNT */}
                  <p className='order-amount'>
                    ₹{order?.amount}
                  </p>

                  {/* ITEMS COUNT */}
                  <p className='order-count'>
                    Items: {order?.items?.length}
                  </p>

                  {/* PAYMENT METHOD */}
                  <p className='order-payment'>

                    {order?.paymentMethod === "cod" ||
                    order?.paymentMethod === "COD"

                      ? "Cash on Delivery"

                      : "Online Payment"}

                  </p>

                  {/* PAYMENT STATUS */}
                  <p
                    className={`payment-status ${
                      order?.paymentMethod === "cod" ||
                      order?.paymentMethod === "COD"
                        ? "cod"
                        : "paid"
                    }`}
                  >

                    {order?.paymentMethod === "cod" ||
                    order?.paymentMethod === "COD"
                      ? "COD"
                      : order?.payment
                        ? "Paid"
                        : "Pending"}

                  </p>

                  {/* ORDER STATUS */}
                  <p className='order-status'>
                    <span></span>
                    <b>{order?.status}</b>
                  </p>

                </div>

                {/* TRACK BUTTON */}
                <button
                  className='track-btn'
                  onClick={() => {

                    setSelectedStatus(order.status);

                    setShowPopup(true);

                  }}
                >
                  Track Order
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* ==========================
          POPUP
      ========================== */}

      {
        showPopup && (

          <div className="popup-overlay">

            <div className="popup-box">

              <h2>Order Tracking</h2>

              <p className='popup-status'>
                {selectedStatus}
              </p>

              {/* TRACK STEPS */}

              <div className='tracking-container'>

                <div className={`tracking-step ${
                  selectedStatus === "Food Processing" ||
                  selectedStatus === "Out for Delivery" ||
                  selectedStatus === "Delivered"
                    ? "active"
                    : ""
                }`}>
                  <div className='circle'></div>
                  <p>Food Processing</p>
                </div>

                <div className={`tracking-step ${
                  selectedStatus === "Out for Delivery" ||
                  selectedStatus === "Delivered"
                    ? "active"
                    : ""
                }`}>
                  <div className='circle'></div>
                  <p>Out for Delivery</p>
                </div>

                <div className={`tracking-step ${
                  selectedStatus === "Delivered"
                    ? "active"
                    : ""
                }`}>
                  <div className='circle'></div>
                  <p>Delivered</p>
                </div>

              </div>

              <button
                className='popup-btn'
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>

            </div>

          </div>
        )
      }

    </>
  )
}

export default MyOrders