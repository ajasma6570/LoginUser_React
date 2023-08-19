import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { logoutUser } from '../../../Redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function AdminNavBar() {


  const login = useSelector((state) => state.login); // Get login state from Redux


const dispatch = useDispatch()
const navigate= useNavigate()
const logout=()=>{
  dispatch(logoutUser())
  navigate('/admin/login')
}

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{backgroundColor:"darkcyan"}}>
        <Navbar.Brand href="#home" className="text-white" style={{position:"relative",left:"40px"}} as={Link} to='/admin'>LoGo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link className="text-white" style={{ marginLeft: "50px" }} as={Link} to='/admin'> Home</Nav.Link>
          </Nav>
          {!login.login && <Nav style={{position:"relative",right:"60px"}}>
            <Nav.Link   className="text-white" as={Link} to='/admin/login'>Login</Nav.Link>
          </Nav>}
          
          {login.login && <Nav style={{position:"relative",right:"60px"}}>
            <Nav.Link   className="text-white" as={Link} to='/admin/dashboard'>Welcome {login.name}</Nav.Link>
            <Nav.Link   className="text-white" onClick={logout}>logout</Nav.Link>
          </Nav>}

          {/* {login.login && <Dropdown style={{position:"relative",right:"50px"}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic" >
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item href="#/action-1">Welcome : {login.name}</Dropdown.Item>
        <Nav.Link href="#deets" className="text-white" onClick={logout}>logout</Nav.Link>
      </Dropdown.Menu>
    </Dropdown>}
           */}
        </Navbar.Collapse>
    </Navbar>
  )
}
