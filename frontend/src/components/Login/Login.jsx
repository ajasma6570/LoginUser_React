import React, {  useEffect, useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom';
import {MDBContainer, MDBInput}
from 'mdb-react-ui-kit';
import axios from 'axios'
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import {useDispatch, useSelector} from 'react-redux'
import  { loginUser } from '../../Redux/userSlice';

export default function Login() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

   const dispatch=useDispatch()
    const navigate=useNavigate()
     const isLogin = useSelector((state) => state.login);


    useEffect(() => {
      console.log(isLogin.login);
      if (isLogin.login) {
        navigate('/'); // Redirect if user is already logged in
      }
    }, [isLogin.login,navigate]);
    const handleSignIn = async () => {
      if (!email || !password) {
        Swal.fire('Error', 'Please fill in all fields.', 'error');
        return;
      }
  
      try {
        const response = await axios.post('/login', {
          email,
          password,
        });
  
        const userData = response.data;
        localStorage.setItem('login', JSON.stringify({
          login: true,
          token: userData.token,
        }));
  
        if (localStorage.getItem('login')) {
          const loginData = JSON.parse(localStorage.getItem('login'));
          if (loginData.login && loginData.token) {
            dispatch(loginUser({
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              login: true,
              token: userData.token,
              image: userData.image,
            }));
          }
        }
  
        navigate('/'); // Redirect the user to the homepage
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404 || error.response.status === 401) {
            Swal.fire({
              title: 'Warning',
              text: error.response.data.message,
              icon: 'warning',
              timer: 2000,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        } else {
          Swal.fire('Error', error.message, 'error');
        }
      }
    };
   

  



  return (
    <div style={{width:"100%",height:"500px"}}>
      <div style={{width:"700px",height:"300px",margin:"auto",position:"relative",top:"80px"}}>
     
          <MDBContainer className="p-3 my-5 d-flex flex-column w-50" style={{width:"100px",height:"380px",border: "2px solid #ccc"}}>
          <h2 className="text-center mb-4">Login</h2>

          <label>Email address :</label> 
          <MDBInput wrapperClass='mb-4' value={email} onChange={(e)=>setEmail(e.target.value)}  id='email' name="email" type='email' placeholder='Enter E-mail address'/>
        
          <label>Password :</label>
          <MDBInput wrapperClass='mb-4' value={password} onChange={(e)=>setPassword(e.target.value)} id='password' name='password' type='password' placeholder='Enter Password'/>
         
          <Button variant="primary" onClick={handleSignIn}>SIGN IN</Button>
          <div className="text-center mt-3">
            <p>Not a member? <Link to='/signup'>Register</Link></p>
           </div>
          </MDBContainer>
      </div>
    </div>
  )
}
