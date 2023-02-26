import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Segmented, Space, Spin } from 'antd'

import { useDashboard } from '..'
import { BoxHeader, CoursesTable } from '.'
import { filterPeriodTypes } from '../../../../config/constants'
import { useListSchools } from '../../../../services/schoolServices'
import { DropdownCheckbox } from '../../../../components'

function ReportBestSellingCourses() {
  const [filters, setFilters] = useState({
    period: filterPeriodTypes.THIS_YEAR,
    schools: {},
    type: 'Học viên'
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
        key: 'courses-ranking',
        title: 'Khóa học bán chạy',
        filterPeriod: filters.period,
        onFilter: value => handleFilter('period', value),
        onRefresh: () => reload('coursesRanking'),
        totalValues: [
          {
            label: 'khóa học',
            value: 31,
            unit: ''
          },
          {
            label: 'học viên',
            value: 1789,
            unit: ''
          },
          {
            label: 'học phí',
            value: '11,75',
            unit: 'Tỷ đồng'
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
                options: ['Học viên', 'Học phí'],
                value: filters.type,
                onChange: value => handleFilter('type', value)
              }} />
            </Space>
          )
        },
        isShowUnit: false
      }} />

      {/* Main List */}
      <Spin spinning={loadings?.coursesRanking}>
        <div className='mt-2'>
          <CoursesTable filterType={filters?.type} />
        </div>
      </Spin>
    </div>
  )
}

export default React.memo(ReportBestSellingCourses)