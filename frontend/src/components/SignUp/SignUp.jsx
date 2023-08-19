import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {MDBContainer, MDBInput}
from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { validateEmail,validatePasswordLength, validatePhone } from '../../utils/validationUtils';
import Swal from 'sweetalert2';

export default function SignUp() {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] =useState('')
  const [password,setPassword] = useState('')
  const [cpassword,setCpassword] =useState('')


  const navigate=useNavigate();

  const signUpSubmit = async () => {
    if (!name || !email || !password || !cpassword) {
      Swal.fire('Error', 'Please fill in all fields.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire('Error', 'Please enter a valid email address.', 'error');
      return;
    }

    if (!validatePasswordLength(password)) {
      Swal.fire('Error', 'Password must be at least 6 characters.', 'error');
      return;
    }

    if(!validatePhone(phone)){
      Swal.fire('Error', 'Phone number must be 10 digits.', 'error');
      return;
    }

    if (password !== cpassword) {
      Swal.fire('Error', 'Passwords do not match.', 'error');
      return;
    }

    try {
      const response = await axios.post('/signup', {
        name,
        email,
        phone,
        password,
        cpassword
      })
      
      if (response.data.message === 'User registered successfully') {
        Swal.fire({
          title: 'Success',
          text: 'User registered successfully.',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then(() =>
          navigate('/login')
        );
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 500) {
          Swal.fire('Error', error.response.data.message, 'error');
        }
      } else {
        Swal.fire('Error', error.message, 'error');
      }
    }
  };

  return (
    <div style={{width:"100%",height:"500px"}}>
    <div style={{width:"700px",height:"300px",margin:"auto"}}>
   
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50" style={{width:"100px",height:"500px",border: "2px solid #ccc"}}>
        <h4 className="text-center mb-4">SIGN UP</h4> 
        
        <label>Name :</label>
        <MDBInput wrapperClass='mb-1'  id='name' name="name" value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='Enter your name'/>
       
        <label>E-mail :</label>
        <MDBInput wrapperClass='mb-1' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} id='email' type='email' placeholder='Enter E-mail address' />
        
        <label>Phone :</label>
        <MDBInput wrapperClass='mb-1'  name="password" value={phone} onChange={(e)=>setPhone(e.target.value)} id='phone' type='phone' placeholder='Enter Password'/>
       
        <label>Password :</label>
        <MDBInput wrapperClass='mb-1'  name="password" value={password} onChange={(e)=>setPassword(e.target.value)} id='password' type='password' placeholder='Enter Password'/>

        <label>Confirm Password :</label>
        <MDBInput wrapperClass='mb-1'  name="cpassword" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} id='Cpassword' type='password' placeholder='Confirm Password'/>
        
        <Button onClick={signUpSubmit}  variant="primary" >SIGN UP</Button>
        
        <div className="text-center mt-3">
          <p>Already have an Account? <Link to='/login'>Login</Link></p>
         </div>
        </MDBContainer>
    </div>
  </div>
  )
}
