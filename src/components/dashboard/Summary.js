import React, { useState } from 'react'
import clsx from 'clsx'
import { Spin } from 'antd'

import { useDashboard } from '../../contexts'
import { filterPeriodTypes } from '../../config/constants'
import { BoxHeader, SummaryTable } from '../'
import styles from '../../styles/pages/Dashboard.module.scss'

function Summary() {
  const [filterPeriod, setFilterPeriod] = useState(filterPeriodTypes.THIS_MONTH)
  const { loadings, reload } = useDashboard()

  const handleFilter = value => {
    setFilterPeriod(value)
  }

  return (
    <div className={styles.summary}>
      {/* Header */}
      <BoxHeader {...{
        title: 'Tình hình tài chính',
        filterPeriod,
        onFilter: handleFilter,
        onRefresh: () => reload('summary'),
      }} />

      {/* Main Table */}
      <Spin spinning={loadings?.summary}>
        <div className={clsx('mt-1', styles.summary__list)}>
          <SummaryTable />
        </div>
      </Spin>
    </div>
  )
}

export default React.memo(Summary)