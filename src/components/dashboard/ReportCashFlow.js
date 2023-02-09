import React, { useState } from 'react'
import clsx from 'clsx'
import { filterPeriodTypes } from '../../config/constants'
import BoxHeader from './BoxHeader'
import BarChart from '../charts/BarChart'
import styles from '../../styles/pages/DashboardLayout.module.scss'

function ReportCashFlow() {
  const [filterPeriod, setFilterPeriod] = useState(filterPeriodTypes.THIS_YEAR)

  const handleFilter = value => {
    setFilterPeriod(value)
  }

  return (
    <div className={styles.chart}>
      {/* Header */}
      <BoxHeader {...{
        title: 'Dòng tiền',
        filterPeriod,
        onFilter: handleFilter,
        totalValues: [
          {
            label: 'tổng thu',
            value: 0
          },
          {
            label: 'tổng chi',
            value: 0
          },
          {
            label: 'tồn',
            value: 0
          },
        ]
      }} />

      {/* Main Chart */}
      <div className={clsx('mt-1', styles.chart__wrapper)}
      // style={{
      //   maxHeight: `calc(100% - ${document.getElementById('summary-header').clientHeight}px)`
      // }}   // 100% ở đây ko có nghĩa lý gì cả
      >
        <BarChart />
      </div>
    </div>
  )
}

export default ReportCashFlow