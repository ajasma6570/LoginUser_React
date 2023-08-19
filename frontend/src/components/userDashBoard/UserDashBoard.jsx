import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../userDashBoard/UserDashBoard.css'
import { useState } from 'react';
import DashBoardAccountDetails from './dashBoardAccountDetails';
import { useSelector } from 'react-redux';



export default function UserDashBoard() {
  const [dashboard,setDashboard]= useState(true)
  const [account,setAccount] = useState(false)

  const userData=useSelector((state)=>state.login)

  const dashboardHandle=()=>{
    setDashboard(true)
    setAccount(false)
  }

  const accountHandle=()=>{
    setDashboard(false)
    setAccount(true)
  }
  return (
    <div style={{ width: "100%", height: "600px" }}>
    <main className="main">
      <div className="page-header text-center" style={{backgroundColor:"grey"}}>
        <Container>
          <h1 className="page-title">User Account</h1>
        </Container>
      </div>

      <div className="page-content" style={{ width: "100%" }}>
        <Container>
          <Row>
            <Col md={4} lg={3} style={{ position: "relative", right: "110px",bottom:"7px", height: "90vh",backgroundColor:"lightgrey" }}>
              <Nav className="nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
                <h2>User Dashboard</h2>
                <Nav.Item >
                  <Nav.Link style={{fontSize:"20px"}} onClick={dashboardHandle} active>Dashboard</Nav.Link>
                </Nav.Item>
                <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ccc' }} />
                <Nav.Item>
                  <Nav.Link style={{fontSize:"20px"}}  onClick={accountHandle} >Account Details</Nav.Link>
                </Nav.Item>
                <hr style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#ccc' }} />
              </Nav>
            </Col>

            <Col md={8} lg={9}>
           {dashboard &&  <div className="tab-content">
                <div className="tab-pane fade show active" id="tab-dashboard" role="tabpanel" aria-labelledby="tab-dashboard-link">
                  <p>
                   
                  </p>
                  <br />
                  <h1>Welcome {userData.name}</h1>
                </div>
              </div>
              }  

              {account &&  <DashBoardAccountDetails/>
                    }  

              
            </Col>
          </Row>
        </Container>
      </div>
    </main>
  </div>
  )
}
