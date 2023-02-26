import React, { useState } from 'react'
import { Select, Spin } from 'antd'

import { BoxHeader } from '.'
import { useDashboard } from '..'
import { filterPeriodTypes } from '../../../../config/constants'
import { useListSchools } from '../../../../services/schoolServices'
import { MixedStackChart } from '../../../../components'

function ReportCashFlowMixed() {
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
        title: 'Dòng tiền (option 1)',
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
          <MixedStackChart {...{
            isStack: true,
            title: `Dòng tiền của ${filters.schools ?? 'tất cả cơ sở'} trong 4 năm gần nhất`,
            series: [
              {
                name: 'Tổng thu',
                type: 'column',
                data: [76, 85, 101, 129]
              },
              {
                name: 'Tổng chi',
                type: 'column',
                data: [-44, -55, -57, -76]
              },
              {
                name: 'Tồn',
                type: 'line',
                data: [76 - 44, 85 - 55, 101 - 57, 129 - 76]
              }
            ],
            yaxis: {
              titles: ['Thu & Chi', '', 'Tồn'],
              seriesNames: ['Tổng thu', 'Tổng chi', 'Tồn'],
            }
          }}
          />
        </div>
      </Spin>
    </div>
  )
}

export default React.memo(ReportCashFlowMixed)