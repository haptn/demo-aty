import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Accounts, Categories, Dashboard, Login, NotFound, Profile, Setting, Schools, Taxes } from '../pages';
import { keys, userRole } from '../config/constants';
import { getLocal } from '../utils/storage';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  const user = getLocal(keys.USER)

  return (
    <BrowserRouter>
        <Routes>
          {/* <Route index element={<ProtectedRoute isAllowed={!!user} />} /> */}
          <Route path='login' element={<Login {...{ user }} />} />

          {/* Authenticated users */}
          <Route element={<ProtectedRoute isAllowed={!!user} />}>
            <Route path="/" element={<Dashboard/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="categories" element={<Categories/>} />
            <Route path="taxes" element={<Taxes/>} />
            {/* ... */}
          </Route>

          {/* Super Admin */}
          <Route element={
            <ProtectedRoute 
              redirectPath='/'
              isAllowed={!!user && user?.role === userRole.ADMIN.value}
            />
          }>
            <Route path="setting" element={<Setting/>} />
            <Route path="accounts" element={<Accounts/>} />
            <Route path="schools" element={<Schools/>} />
            {/* ... */}
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default AppRouter