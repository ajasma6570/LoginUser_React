import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../Redux/userSlice';
import { useNavigate } from 'react-router-dom';


export default function DashBoardAccountDetails() {

   
  const userData=useSelector((state)=>state.login)
 const dispatch=useDispatch()
 const navigate=useNavigate()

  const [values, Setvalues] = useState({
    name:  userData.name,
    email: userData.email,
    phone:userData.phone,
    image: userData.image,
    token:userData.token
  });

   useEffect(() => {
    Setvalues((prevValues) => ({
      ...prevValues,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      image: userData.image,
      token: userData.token,
    }));
  }, [userData]);


  const formdata= new FormData()
  formdata.append("name",values.name)
  formdata.append("email",values.email)
  formdata.append("phone",values.phone)
  formdata.append("image",values.image)
  formdata.append("token",userData.token)

  const handelSubmit=(event)=>{
    event.preventDefault();

    axios.post("/updateProfile",formdata).then((response)=>{
      dispatch(loginUser({
        name:response.data.name,
        email:response.data.email,
        phone:response.data.phone,
        token:response.data.token,
        login:true,
        image:response.data.image
      }))
      navigate("/userDashboard")
    }).catch((err) => console.log(err));
  }

  return (
    <div>
    
      <div className="row mb-4">
        <div className="col-lg-6">
        <form onSubmit={handelSubmit}>
          <div className="col-lg-4">
            <img src={`/assets/${values.image}`} className="rounded-circle" style={{ width: '150px' }} alt="Avatar" />
           
            <label htmlFor="inputGroupFile01" className="bi bi-upload">
        <h6 style={{cursor:"pointer"}}>Upload Image</h6>
        <input
          type="file"
          id="inputGroupFile01"
          name="image"
          className="visually-hidden"
          onChange={e => Setvalues({...values, image: e.target.files[0]})}
          accept=".jpg, .jpeg, .png, .webp"

        />
      </label>
          </div>
          
            <h2 className="checkout-title">User Details</h2>
            <label>Name *</label>
            <input type="text" className="form-control border-secondary text-dark" onChange={(e)=>Setvalues({...values,name:e.target.value})} value={values.name}  name="name"   />

            <label>Email *</label>
            <input type="email" className="form-control border-secondary text-dark"  onChange={(e)=>Setvalues({...values,email:e.target.value})} value={values.email} name="email"  />

            <label>Phone *</label>
            <input type="phone" className="form-control border-secondary text-dark"  onChange={(e)=>Setvalues({...values,phone:e.target.value})} value={values.phone} name="emaphoneil"  />

            <button type="submit" className="btn btn-primary mt-2">Update</button>
          </form>
        </div>
      
       
      </div>
      </div>
    
  );
}
