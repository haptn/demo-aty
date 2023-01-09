import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoginLayout } from '../../containers'

function Login({ user }) {
  return !user ? <LoginLayout/> : <Navigate to={'/'} replace />
}

export default Login