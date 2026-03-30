import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'

const PlaceOrder = () => {

  const{getTotalCartAmount, token, food_list, cartItems,url}= useContext(StoreContext)

  const[data,setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    phone:""
  })

  const onChangeHandler= async (event) => {
    const name= event.target.name;
    const value= event.target.value;
    setData(data=>({...data,[name]:value}))
  }

const PlaceOrder= async (event) => {
event.preventDefault();
let orderItems= [];
food_list.map((item)=>{
  if (cartItems[item._id]>0) {
    itemInfo= item;
    itemInfo["quantity"]= cartItems[item._id];
    orderItems.push(itemInfo)
  }
})
let orderData= {
  address:data,
  items:orderItems,
  amount:getTotalCartAmount()+50,

}
let response= await axios.post(url+"/api/order/place", orderData,{headers:{token}})
if (response.data.success) {
  const {session_url}= response.data;
  window.location.replace(session_url);
}
else{
  alert("Error");
}
}

  return (
    <form onSubmit={PlaceOrder} className='place-order'>

<div className="place-order-left">
  <p className="title">Delivery Information</p>
  <div className="multi-fields">
    <input required name="firstName" onChange={onChangeHandler} value={data.firstName}  type="text" placeholder='First Name'/>
    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
  </div>
  <input required name='email' onChange={onChangeHandler} value={data.email} type="Email" placeholder='Email Address'/>
  <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
  <div className="multi-fields">
    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
  </div>
  <div className="multi-fields">
     <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code'/>
  </div>
  <input required name='phone' onChange={onChangeHandler} value={data.phone} type="number" placeholder='Phone Number'/>

<div className="place-order-right">
<div className="summary-order-payment">
    <h3>Order Summary</h3>
    <div className="summary-row">
      <p>Subtotal</p>
      <p>₹{getTotalCartAmount()}</p>
    </div>
    <div className="summary-row">
      <p>Delivery</p>
      <p>₹{getTotalCartAmount()===0?0:50}</p>
    </div>
    <hr />
    <div className="summary-row total">
      <b>Total</b>
      <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+50}</p>
    </div>

    <button type='submit'>Proceed To Payment</button>
  </div>
</div>
</div>
    </form>
  )
}

export default PlaceOrder