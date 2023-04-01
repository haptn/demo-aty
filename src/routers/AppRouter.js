import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import {
  Login, NotFound, Dashboard, Profile,
  Budget, CashBook, Salaries, Students,
  Programs, Boarding, Assets, Taxes,
  BuyRent, Sale, LoanDebt, Invoices,
  Settings, StSchools, StClasses, StCourses, StAccounts,
  StTaxTypes, StTuitorFees, StSalary, StServices,
  StBoarding, StUniform, StFoodMenu,
  StIncomeCategories, StCostsCategories, StATYInfo, StRoles,
} from '../pages'
import { DashboardProvider } from '../pages/protected/Dashboard'
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
        <Route path="budget" element={<Budget />}>
          <Route path="*" element={<Budget />} />
        </Route>

        <Route path="cash-books" element={<CashBook />}>
          <Route path="*" element={<CashBook />} />
        </Route>

        <Route path="invoices" element={<Invoices />}>
          <Route path="*" element={<Invoices />} />
        </Route>

        <Route path="salaries" element={<Salaries />}>
          <Route path="*" element={<Salaries />} />
        </Route>

        <Route path="taxes" element={<Taxes />}>
          <Route path="*" element={<Taxes />} />
        </Route>

        {/* ----------------------------------- */}

        <Route path="students" element={<Students />}>
          <Route path="*" element={<Students />} />
        </Route>

        <Route path="programs" element={<Programs />}>
          <Route path='*' element={<Programs />} />
        </Route>

        <Route path="boarding" element={<Boarding />}>
          <Route path='*' element={<Boarding />} />
        </Route>

        {/* ----------------------------------- */}

        <Route path="assets" element={<Assets />}>
          <Route path='*' element={<Assets />} />
        </Route>

        <Route path="buy-rent" element={<BuyRent />}>
          <Route path="*" element={<BuyRent />} />
        </Route>

        <Route path="sale" element={<Sale />}>
          <Route path="*" element={<Sale />} />
        </Route>

        <Route path="loan-debt" element={<LoanDebt />}>
          <Route path="*" element={<LoanDebt />} />
        </Route>

        {/* ----------------------------------- */}

        <Route path="settings" element={<Outlet />}>
          <Route index element={<Settings />} />

          <Route path="schools" element={<StSchools />} />
          <Route path="classes" element={<StClasses />} />
          <Route path="courses" element={<StCourses />} />
          <Route path="tuition-fees" element={<StTuitorFees />} />
          <Route path="salary" element={<StSalary />} />
          <Route path="school-services" element={<StServices />} />
          <Route path="boarding-price" element={<StBoarding />} />
          <Route path="uniforms-price" element={<StUniform />} />
          <Route path="menu-price" element={<StFoodMenu />} />

          <Route path="partner-types" element={<StAccounts />} />
          <Route path="partners" element={<StAccounts />} />

          <Route path="income" element={<StIncomeCategories />} />
          <Route path="costs" element={<StCostsCategories />} />
          <Route path="payment-methods" element={<StAccounts />} />
          <Route path="currencies" element={<StAccounts />} />
          <Route path="documents" element={<StAccounts />} />
          <Route path="renew-cycle" element={<StAccounts />} />

          <Route path="taxes" element={<StTaxTypes />} />
          <Route path="tariffs" element={<StAccounts />} />
          <Route path="fees" element={<StAccounts />} />
          <Route path="insurances" element={<StAccounts />} />

          <Route path="banks" element={<StAccounts />} />
          <Route path="bank-accounts" element={<StAccounts />} />

          <Route path="fixed-assets" element={<StAccounts />} />
          <Route path="equipments" element={<StAccounts />} />
          <Route path="units" element={<StAccounts />} />

          <Route path="aty-info" element={<StATYInfo />} />
          <Route path="accounts" element={<StAccounts />} />
          <Route path="roles-privileges" element={<StRoles />} />

          <Route path="sidebar-menu" element={<StAccounts />} />
          <Route path="quick-add" element={<StAccounts />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRouter