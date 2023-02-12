import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks'
import { LoginLayout } from '../../containers'

function Login() {
  const { isAuthen } = useAuth()

  return !isAuthen ? <LoginLayout /> : <Navigate to={'/'} replace />
}

export default Login