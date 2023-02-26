import React, { createContext, useContext, useEffect, useState } from 'react'

const DashboardContext = createContext()

export const useDashboard = () => useContext(DashboardContext)

const DashboardProvider = ({ children }) => {
  const [loadings, setLoadings] = useState({
    summary: false,
    revenue: false,
    revenueStream: false,
    expense: false,
    expenseCate: false,
    cashflow: false,
    bizPerform: false,
    coursesRanking: false
  })

  const setLoading = (type, value) => {
    setLoadings({ ...loadings, [type]: value })
  }

  const reload = type => {
    setLoading(type, true)

    setTimeout(() => {
      setLoading(type, false)
    }, 750)
  }

  useEffect(() => {
    setLoadings({
      summary: true,
      revenue: true,
      revenueStream: true,
      expense: true,
      expenseCate: true,
      cashflow: true,
      bizPerform: true,
      coursesRanking: true
    })

    setTimeout(() => {
      setLoadings({
        summary: false,
        revenue: false,
        revenueStream: false,
        expense: false,
        expenseCate: false,
        cashflow: false,
        bizPerform: false,
        coursesRanking: false
      })
    }, 1000)
  }, [])

  const values = {
    loadings, setLoading, reload
  }

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardProvider