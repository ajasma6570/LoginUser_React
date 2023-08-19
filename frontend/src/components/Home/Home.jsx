import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {

const userData=useSelector((state)=>state.login)

  return (
    <div style={{width:"100%",height:"100vh",backgroundColor:"lightgrey"}}>

      {userData.login && <h1 style={{textAlign:"center",position:"relative",top:"150px"}}>Welcome, {userData.name}... </h1>}
      {!userData.login && <h1 style={{textAlign:"center",position:"relative",top:"150px"}}>Welcome to Homepage</h1>}
    </div>
  )
}
