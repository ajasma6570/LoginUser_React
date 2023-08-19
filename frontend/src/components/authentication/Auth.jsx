import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Auth=()=> {
  const login = useSelector((state) => state.login);

  return login?.login ? <Outlet /> : <Navigate to="/login" />;
}

const AdminAuth=()=> {
    const login = useSelector((state) => state.login);
  
    return login?.login ? <Outlet /> : <Navigate to="/admin/login" />;
  }

  export {
    Auth,
    AdminAuth
  }