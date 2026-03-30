import React, { useState } from 'react'
import axios from 'axios'
import './Add.css'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Add = ({url}) => {

    const [image, setImage]= useState(false)
    const [data, setData]= useState({
        name: "",
        description: "",
        price: "",
        category: "Momos"
    })

    const onChangeHandler= (event)=>{
    const name= event.target.name;
    const value= event.target.value;
    setData(data=>({...data, [name]:value}))
    }

    const onSubmitHandler= async (event) => {
        try {
            event.preventDefault();
        const formData= new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response= await axios.post(`${url}/api/food/add`, formData)
        if(response.data.success){
            setData({
                 name: "",
        description: "",
        price: "",
        category: "Momos"
            })
            setImage(false)
            toast.success(response.data.message)
        }
        else{
toast.error(response.data.message)
        }
        } catch (error) {
            toast.error("something went wrong");
            console.log(error);
            
        }
    }
  return (
    <div className='add'>
        <form onSubmit={onSubmitHandler} className="flex-col">
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) :assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='write content here' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" >
                        <option value="Momos">Momos</option>
                        <option value="Desi Chinese">Desi Chinese</option>
                        <option value="Spring Roll">Spring Roll</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Fired Rice">Fired Rice</option>
                        <option value="Chicken Lolipop">Chicken Lolipop</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Strips">Strips</option>
                        <option value="Banta">Banta</option>
                        <option value="Drinks">Drinks</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20'/>
                </div>
            </div>
            <button  type='submit' className='add-btn'>ADD</button>
        </form>
    </div>
  )
}

export default Add