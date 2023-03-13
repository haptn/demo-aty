import React, { useState } from 'react'
import { Select, Spin } from 'antd'

import { BoxHeader } from '.'
import { useDashboard } from '..'
import { filterPeriodTypes } from '../../../../config/constants'
import { useListSchools } from '../../../../services/schoolServices'
// import SankeyChart from '../charts/SankeyChart'

function ReportCashFlowSankey() {
  const [filters, setFilters] = useState({
    period: filterPeriodTypes.THIS_YEAR,
    schools: undefined
  })
  const { data: schools = [] } = useListSchools(
    undefined, { customField: 'name' }
  )
  const { loadings, reload } = useDashboard()

  const handleFilter = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  return (
    <div>
      {/* Header */}
      <BoxHeader {...{
        title: 'Dòng tiền (option 2)',
        filterPeriod: filters.period,
        onFilter: value => handleFilter('period', value),
        onRefresh: () => reload('cashflow'),
        totalValues: [
          {
            label: 'tổng thu',
            value: 129
          },
          {
            label: 'tổng chi',
            value: -76
          },
          {
            label: 'tồn',
            value: 53
          },
        ],
        additionalFilters: {
          position: 'left',
          component: (
            <Select
              value={filters.schools}
              onChange={value => handleFilter('schools', value)}
              placeholder='Chọn Cơ sở'
              allowClear
              style={{ minWidth: 180 }}
              options={[
                // {
                //   value: 'tất cả cơ sở',
                //   label: 'Tất cả cơ sở',
                // },
                ...schools?.map(item => ({
                  value: item,
                  label: item,
                }))
              ]}
            />
          )
        }
      }} />

      {/* Main Chart */}
      <Spin spinning={loadings?.cashflow}>
        <div className='mt-2'>
          <img src='/charts/cashflow-sankey.jpg' width={'100%'} />
          {/* <SankeyChart/> */}
        </div>
      </Spin>
    </div>
  )
}

export default React.memo(ReportCashFlowSankey)