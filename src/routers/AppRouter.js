import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Accounts, Dashboard, Login, NotFound, Profile, Schools, Taxes, Settings, Classes, Courses, TuitorFees, Salary, Services, Boarding, Uniform, FoodMenu, IncomeCategories, CostsCategories } from '../pages'
import { DashboardProvider } from '../contexts'
import { useAuth } from '../hooks'
import ProtectedRoute from './ProtectedRoute'

function AppRouter() {
  const { isAuthen, isAdmin } = useAuth()

  return (
    <Routes>
      {/* <Route index element={<ProtectedRoute isAllowed={isAuthen} />} /> */}
      <Route path='login' element={<Login />} />

      {/* Authenticated users */}
      <Route element={<ProtectedRoute isAllowed={isAuthen} />}>
        <Route path="/" element={
          <DashboardProvider>
            <Dashboard />
          </DashboardProvider>
        } />
        <Route path="profile" element={<Profile />} />
        <Route path="taxes" element={<Taxes />} />
        {/* ... */}
      </Route>

      {/* Super Admin */}
      <Route element={
        <ProtectedRoute redirectPath='/' isAllowed={isAdmin} />
      }>
        <Route path="settings" element={<Outlet />}>
          <Route index element={<Settings />} />

          <Route path="schools" element={<Schools />} />
          <Route path="classes" element={<Classes />} />
          <Route path="courses" element={<Courses />} />
          <Route path="tuition-fees" element={<TuitorFees />} />
          <Route path="salary" element={<Salary />} />
          <Route path="school-services" element={<Services />} />
          <Route path="boarding-price" element={<Boarding />} />
          <Route path="uniforms-price" element={<Uniform />} />
          <Route path="menu-price" element={<FoodMenu />} />

          <Route path="partner-types" element={<Accounts />} />
          <Route path="partners" element={<Accounts />} />

          <Route path="income" element={<IncomeCategories />} />
          <Route path="costs" element={<CostsCategories />} />
          <Route path="payment-methods" element={<Accounts />} />
          <Route path="currencies" element={<Accounts />} />
          <Route path="documents" element={<Accounts />} />
          <Route path="renew-cycle" element={<Accounts />} />

          <Route path="taxes" element={<Accounts />} />
          <Route path="tariffs" element={<Accounts />} />
          <Route path="fees" element={<Accounts />} />
          <Route path="insurances" element={<Accounts />} />

          <Route path="banks" element={<Accounts />} />
          <Route path="bank-accounts" element={<Accounts />} />

          <Route path="fixed-assets" element={<Accounts />} />
          <Route path="equipments" element={<Accounts />} />
          <Route path="units" element={<Accounts />} />

          <Route path="aty-info" element={<Accounts />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="roles" element={<Accounts />} />

          <Route path="sidebar-menu" element={<Accounts />} />
          <Route path="quick-add" element={<Accounts />} />
        </Route>
        {/* <Route path="settings" element={<Setting/>} /> */}
        {/* <Route path="accounts" element={<Accounts/>} />
          <Route path="schools" element={<Schools/>} /> */}
        {/* ... */}
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter