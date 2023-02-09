import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { filterPeriodTypes } from '../../config/constants'
import { useListSchools } from '../../services/schoolServices'
import { BoxHeader, DropdownCheckbox, PieChart } from '..'
import styles from '../../styles/pages/DashboardLayout.module.scss'

function ReportRevenueStream() {
  const [filters, setFilters] = useState({
    period: filterPeriodTypes.THIS_YEAR,
    schools: {}
  })

  const { data: listSchoolNames = [] } = useListSchools(
    undefined, { isCustom: true, customField: 'name' }
  )

  const changeFilterAllSchools = (isCheckAll = false) => {
    setFilters(prev => {
      let clone = { ...prev }
      // clone.schools = { 'Tất cả': isCheckAll }

      listSchoolNames.forEach(school => {
        clone.schools = {
          ...clone.schools,
          [school]: isCheckAll
        }
      })

      return clone
    })
  }

  useEffect(() => {
    if (listSchoolNames && listSchoolNames?.length > 0)
      changeFilterAllSchools(true)
  }, [listSchoolNames])

  const handleFilterPeriod = value => {
    setFilters({ ...filters, period: value })
  }

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

  return (
    <div>
      {/* Header */}
      <BoxHeader {...{
        title: 'Nguồn thu',
        filterPeriod: filters.period,
        onFilter: handleFilterPeriod,
        additionalFilters: {
          position: 'below-title',
          component: (
            <DropdownCheckbox {...{
              btnLabel: 'Chọn cơ sở',
              items: listSchoolNames,
              onCheck: handleFilterSchools,
              checkedItems: filters.schools,
            }} />
          )
        }
      }} />

      {/* Main Chart */}
      <div className={clsx('mt-2', styles.chart__wrapper)}>
        <PieChart {...{
          title: 'Doanh thu phân theo nguồn thu',
          values: [234, 123, 35, 35, 20, 15, 15],
          labels: [
            'Học phí chương trình',
            'Học phí phổ thông',
            'Mạnh thường quân',
            'Diễn thuyết',
            'Bán sách',
            'Quỹ nội bộ',
            'Khác'
          ]
        }} />
      </div>
    </div>
  )
}

export default ReportRevenueStream