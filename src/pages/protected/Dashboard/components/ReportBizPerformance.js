import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Segmented, Space, Spin } from 'antd'

import { BoxHeader } from '.'
import { useDashboard } from '..'
import { filterReportPeriods } from '../../../../config/constants'
import { useListSchools } from '../../../../services/schoolServices'
import { DropdownCheckbox, MixedStackChart } from '../../../../components'

function ReportBizPerformance() {
  const [filters, setFilters] = useState({
    period: filterReportPeriods.YEAR,
    schools: undefined
  })
  const { loadings, reload } = useDashboard()

  const { data: schools = [] } = useListSchools(
    undefined, { customField: 'name' }
  )

  const changeFilterAllSchools = (isCheckAll = false) => {
    setFilters(prev => {
      let clone = { ...prev }

      schools.forEach(school => {
        clone.schools = {
          ...clone.schools,
          [school]: isCheckAll
        }
      })
      return clone
    })
  }

  useEffect(() => {
    if (schools && schools?.length > 0)
      changeFilterAllSchools(true)
  }, [schools])

  const handleFilterSchools = ({ value, checked }) => {
    if (value === 'Tất cả') {
      changeFilterAllSchools(checked)
      return
    }

    setFilters(prev => {
      let clone = { ...prev }
      clone.schools[value] = checked
      return clone
    })
  }

  const handleFilter = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const checkedSchoolsLabel = useMemo(() => {
    if (!schools)
      return 'Chọn cơ sở'

    const checkedSchools = _.values(filters.schools).filter(item => !!item)

    return checkedSchools?.length === schools?.length
      ? 'Tất cả cơ sở'
      : `${checkedSchools?.length} cơ sở`
  }, [schools, JSON.stringify(filters.schools)])

  return (
    <div>
      {/* Header */}
      <BoxHeader {...{
        title: 'Kết quả kinh doanh',
        onRefresh: () => reload('bizPerform'),
        totalValues: [
          {
            label: 'doanh thu thuần',
            value: 129
          },
          {
            label: 'lợi nhuận sau thuế',
            value: 47
          },
          {
            label: 'tăng trưởng doanh thu',
            value: 15,
            unit: '%'
          },
        ],
        additionalFilters: {
          position: 'left',
          component: (
            <Space size='small'>
              <DropdownCheckbox {...{
                btnLabel: checkedSchoolsLabel,
                items: schools,
                onCheck: handleFilterSchools,
                checkedItems: filters.schools,
              }} />
              <Segmented {...{
                options: ['Tháng', 'Quý', 'Năm'],
                value: filters.period,
                onChange: value => handleFilter('period', value)
              }} />
            </Space>
          )
        },
        isShowUnit: false
      }} />

      {/* Main Chart */}
      <Spin spinning={loadings?.bizPerform}>
        <div className='mt-2'>
          <MixedStackChart {...{
            isStack: false,
            title: `Kết quả kinh doanh của ${checkedSchoolsLabel} ATY`,
            // trong ... (tùy thuộc vào option 'Tháng/Quý/Năm' mà kq sẽ khác nhau)
            series: [
              {
                name: 'Doanh thu thuần',
                type: 'column',
                data: [76, 85, 101, 129]
              },
              {
                name: 'Lợi nhuận sau thuế',
                type: 'column',
                data: [12, 17, 23, 31]
              },
              {
                name: 'Tăng trưởng doanh thu',
                type: 'line',
                data: [76 - 44, 85 - 55, 101 - 57, 129 - 76]
              }
            ],
            yaxis: {
              titles: ['Doanh thu (triệu đồng)', 'Lợi nhuận (triệu đồng)', 'Tăng trưởng (%)'],
              seriesNames: ['Doanh thu thuần', 'Lợi nhuận sau thuế', 'Tăng trưởng doanh thu'],
            }
          }}
          />
        </div>
      </Spin>
    </div>
  )
}

export default ReportBizPerformance