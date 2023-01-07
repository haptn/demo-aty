import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute(props) {
  const { 
    isAllowed,
    redirectPath = '/login',
    children
  } = props

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />
}

export default ProtectedRoute
