import React, {useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { loaduser, toggleUserEdit, userEdit } from '../../../Redux/userSlice'
import { useNavigate } from 'react-router-dom'


export default function AdminUserList() {


    const dispatch=useDispatch()
    const navigate=useNavigate()

    const userDetails=useSelector((state)=>state.userList)
    const reversedUserDetails=[...userDetails].reverse()
    
    
  useEffect(()=>{
  
    const LoadUser = async () => {
      const loginData = JSON.parse(localStorage.getItem('login'));
      if (loginData.login) {
        try {
          const response = await axios.get('http://localhost:8000/admin/userList');
          dispatch(loaduser(response.data));
        } catch (error) {
          // Handle error here
          console.error('Error fetching user data:', error);
        }
      } else {
        navigate('/admin/login');
      }
    };
  
    LoadUser();
  },[dispatch,navigate])
  
  
  const handleDelete=async(id)=>{
    try{
    const response= await axios.post('http://localhost:8000/admin/userDelete',{id})
      dispatch(loaduser(response.data))
    }catch(error){
      console.log(error.message);
    }
  }

  const handleEdit = async (id) => {
    try {
      dispatch(toggleUserEdit())
      const response = await axios.post(`http://localhost:8000/admin/userEdit`,{id});
      dispatch(userEdit(response.data));
    } catch (error) {
        console.log("error");
      console.log(error.message);
    }
  }
  

  console.log("USER LIST RENDER");
  return (
    <>
    <table className="custom-table">
               <thead>
                 <tr>
                 <th style={{ padding: '0 50px 0 0' }}>Sl No</th>
                   <th style={{ padding: '0 50px 0 0' }}>Profile Image</th>
                   <th style={{ padding: '0 50px 0 0' }}>Name</th>
                   <th style={{ padding: '0 80px 0 0' }}>Email</th>
                   <th style={{ padding: '0px 50px 0 50px' }}>Phone</th>
                   <th style={{ padding: '0 50px 0 0' }}>Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {reversedUserDetails.map((user, index) => (
                   <tr key={index}>
                     <td>{index + 1}</td>
                     <td>
                       <div className="profile-image-container">
                         <img src={`/assets/${user.image}`} alt="Profile" className="profile-image" style={{width:"70px",height:"70px"}} />
                       </div>
                     </td>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td  style={{ padding: '0px 50px 0 50px' }}>{user.phone}</td>
                     <td>
                       <button key={`edit_${user._id}`} onClick={()=>handleEdit(user._id)} className="btn btn-sm btn-primary ">
                         Edit
                       </button>
                       

                       <button
                         key={`delete_${user._id}`}
                         onClick={()=>handleDelete(user._id)} 
                         className="btn btn-sm btn-danger ms-2"
                       >
                         Delete
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
             </>
  )
}
