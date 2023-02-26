import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Spin } from 'antd'

import { BoxHeader } from '.'
import { useDashboard } from '..'
import { filterPeriodTypes } from '../../../../config/constants'
import { useListSchools } from '../../../../services/schoolServices'
import { DropdownCheckbox, PieChart } from '../../../../components'

function ReportExpenseCategory() {
  const [filters, setFilters] = useState({
    period: filterPeriodTypes.THIS_YEAR,
    schools: {}
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

  const handleFilterPeriod = value => {
    setFilters({ ...filters, period: value })
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
        title: 'Khoản chi',
        filterPeriod: filters.period,
        onFilter: handleFilterPeriod,
        onRefresh: () => reload('expenseCate'),
        additionalFilters: {
          position: 'below-title',
          component: (
            <DropdownCheckbox {...{
              btnLabel: checkedSchoolsLabel,
              items: schools,
              onCheck: handleFilterSchools,
              checkedItems: filters.schools,
            }} />
          )
        }
      }} />

      {/* Main Chart */}
      <Spin spinning={loadings?.expenseCate}>
        <div className='mt-2'>
          <PieChart {...{
            title: 'Chi phí phân theo khoản chi',
            values: [234, 123, 20, 50, 10, 35, 5],
            labels: [
              'Lương & Thưởng',
              'Thuế & Bảo hiểm',
              'CSVC',
              'Hoạt động của trường',
              'Tổ chức chương trình',
              'Công tác xã hội',
              'Khác'
            ],
          }} />
        </div>
      </Spin>
    </div>
  )
}

export default React.memo(ReportExpenseCategory)