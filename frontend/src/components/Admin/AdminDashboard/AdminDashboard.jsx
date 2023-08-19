import React from 'react'
import { Container, Row, Col, Nav } from 'react-bootstrap';
import CreateUser from './CreateUser';
import { useDispatch, useSelector } from 'react-redux'
import AdminUserList from './AdminUserList';
import { toggleAdminUserList, toggleCreateUser } from '../../../Redux/userSlice';
import AdminUserEdit from './AdminUserEdit';



export default function AdminDashboard() {

    const dispatch=useDispatch()
    const handleUser=()=>{
      dispatch(toggleAdminUserList())
    }

    const handleCreateUser=()=>{
      dispatch(toggleCreateUser())
    }

const dashboardActive=useSelector((state)=>state.userDashboard)
console.log(dashboardActive.showCreateUser);

console.log("dashboard renderd");
  return (
    <div style={{ width: "100%", height: "600px" }}>
    <main className="main">
      <div className="page-header text-center" style={{backgroundColor:"lightgrey"}}>
        <Container>
          <h1 className="page-title">Admin Account</h1>
        </Container>
      </div>

      <div className="page-content" style={{ width: "100%" }}>
        <Container>
          <Row>
            <Col md={4} lg={3} style={{ position: "relative", right: "110px",bottom:"7px", height: "90vh",backgroundColor:"lightgrey" }}>
              <Nav className="nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                <h3>Admin Dashboard</h3>
                <Nav.Item >
                  <Nav.Link style={{fontSize:"20px"}} onClick={handleUser} active>Users</Nav.Link>
                </Nav.Item>
                <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ccc' }} />
                <Nav.Item>
                  <Nav.Link style={{fontSize:"20px"}}  onClick={handleCreateUser} >Create new user</Nav.Link>
                </Nav.Item>
                <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ccc' }} />
              </Nav>
            </Col>

            <Col md={8} lg={9}>

            {dashboardActive.showAdminUserList && <AdminUserList/>    }  

            {dashboardActive.showCreateUser &&  <CreateUser/> }
                    
             {dashboardActive.showUserEdit && <AdminUserEdit/>}

              
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  </div>
  )
}


