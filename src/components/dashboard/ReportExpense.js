import React, { useEffect, useState } from 'react'
import { Segmented, Space } from 'antd'
import clsx from 'clsx'
import _ from 'lodash'

import { filterReportPeriods } from '../../config/constants'
import { useListSchools } from '../../services/schoolServices'
import { BoxHeader, DropdownCheckbox, BarChart } from '..'
import styles from '../../styles/pages/DashboardLayout.module.scss'

function ReportExpense() {
  const [filters, setFilters] = useState({
    period: filterReportPeriods.YEAR,
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
    <div className={styles.chart}>
      {/* Header */}
      <BoxHeader {...{
        title: 'Chi phí',
        // filterPeriod: filters.period,
        // onFilter: handleFilterPeriod,
        totalValues: [
          {
            label: 'tổng chi',
            value: 0
          },
        ],
        // Ở đây đang định thêm 1 cái filter chọn số trường, auto là tick hết listSchools, có checkbox để tùy chỉnh show/hide trường
        additionalFilters: {
          position: 'left',
          component: (
            <Space size='small'>
              <DropdownCheckbox {...{
                btnLabel: 'Chọn cơ sở',
                items: listSchoolNames,
                onCheck: handleFilterSchools,
                checkedItems: filters.schools,
              }} />
              <Segmented {...{
                options: ['Tháng', 'Quý', 'Năm'],
                value: filters.period,
                onChange: handleFilterPeriod
              }} />
            </Space>
          )
        }
      }} />

      {/* Main Chart */}
      <div className={clsx('mt-1', styles.chart__wrapper)}>
        <BarChart {...{
          title: 'Biểu đồ chi phí của các cơ sở trong 4 năm gần nhất',
          series: [   // mock tạm, sau này sẽ trả về từ API
            {
              name: listSchoolNames[0],
              data: [44, 55, 57, 76]
            },
            {
              name: listSchoolNames[1],
              data: [76, 85, 101, 129]
            },
            {
              name: listSchoolNames[3],
              data: [76, 85, 101, 117]
            },
            {
              name: listSchoolNames[2],
              data: [30, 49, 62, 55]
            },
            {
              name: listSchoolNames[4],
              data: [38, 41, 36, 90]
            }
          ],
          xAxis: ['2020', '2021', '2022', '2023'],
          yAxis: {
            min: 0,
            max: 150,
            tickAmount: 5,
          },
        }} />
      </div>
    </div>
  )
}

export default ReportExpense