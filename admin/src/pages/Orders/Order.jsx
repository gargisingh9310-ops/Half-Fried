import React, { useState, useEffect } from 'react'
import './Order.css'
import { toast } from "react-toastify"
import axios from "axios"
import { assets } from '../../assets/assets'

const Order = ({ url }) => {

  const [orders, setOrders] = useState([]);

  // ==========================
  // FETCH ALL ORDERS
  // ==========================
  const fetchAllOrders = async () => {

    try {

      const response = await axios.get(
        url + "/api/order/list"
      );

      if (response.data.success) {

        setOrders(response.data.data);

      } else {

        toast.error("Failed to fetch orders");
      }

    } catch (error) {

      toast.error("Server error");

      console.log(error);
    }
  };

  // ==========================
  // STATUS UPDATE
  // ==========================
  const statusHandler = async (event, orderId) => {

    try {

      const response = await axios.post(
        url + "/api/order/status",
        {
          orderId,
          status: event.target.value
        }
      );

      if (response.data.success) {

        toast.success("Order Status Updated");

        await fetchAllOrders();
      }

    } catch (error) {

      console.log(error);

      toast.error("Error updating status");
    }
  };

  // ==========================
  // LOAD ORDERS
  // ==========================
  useEffect(() => {

    fetchAllOrders();

  }, []);

  return (
    <div className='order'>

      <h3>Orders</h3>

      <div className="order-list">

        {orders.map((order, index) => (

          <div
            key={index}
            className='order-item'
          >

            {/* ICON */}
            <img
              src={assets.parcel_icon}
              alt="parcel"
            />

            {/* ==========================
                ORDER DETAILS
            ========================== */}
            <div className="order-details">

              {/* ITEMS */}
              <p className='order-item-food'>

                {order?.items?.map((item, i) => (

                  <span key={i}>

                    {item.name} x {item.quantity}

                    {i !== order.items.length - 1 && ", "}

                  </span>
                ))}

              </p>

              {/* USER NAME */}
              <p className='order-item-name'>

                {order?.address?.firstName}{" "}
                {order?.address?.lastName}

              </p>

              {/* ADDRESS */}
              <div className="order-item-address">

                <p>
                  {order?.address?.street}
                </p>

                <p>

                  {order?.address?.city},
                  {" "}
                  {order?.address?.state},
                  {" "}
                  {order?.address?.country}
                  {" - "}
                  {order?.address?.zipcode}

                </p>

              </div>

              {/* PHONE */}
              <p className='order-item-phone'>

                {order?.address?.phone}

              </p>

            </div>

            {/* ==========================
                RIGHT SIDE
            ========================== */}
            <div className="order-right">

              {/* ITEMS COUNT */}
              <p className='order-items-count'>

                Items: {order?.items?.length}

              </p>

              {/* AMOUNT */}
              <p className='order-amount'>

                ₹{order?.amount}

              </p>

              {/* STATUS DROPDOWN */}
              <select
                onChange={(event) =>
                  statusHandler(event, order._id)
                }

                value={order.status}

                // ✅ LOCK AFTER DELIVERED
                disabled={order.status === "Delivered"}
              >

                <option value="Food Processing">
                  Food Processing
                </option>

                <option value="Out for Delivery">
                  Out for Delivery
                </option>

                <option value="Delivered">
                  Delivered
                </option>

              </select>

              {/* OPTIONAL TEXT */}
              {order.status === "Delivered" && (
                <p className='delivered-text'>
                  Order Completed
                </p>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Order