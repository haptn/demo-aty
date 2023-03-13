import React, { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { Button, DatePicker, Popconfirm, Segmented, Select, Space, Spin, Table, theme, Typography } from 'antd'
import { FileExcelOutlined, SaveOutlined, StarFilled } from '@ant-design/icons'

import { PageHeader } from '../../../components'
import { getLocal, setLocal } from '../../../utils/storage'
import { formatMoney } from '../../../utils/format'
import { listSavedReports } from '../../../mock/data'
import { budgetType } from '../../../config/constants'
import { useListSchools } from '../../../services/schoolServices'
import { useListPracticalBudget, useListPracticalCost, useListPracticalRevenue } from '../../../services/budgetServices'

function PracticalTab() {
  const { token } = theme.useToken()
  const [queryParams] = useSearchParams()

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    schools: [],
    year: dayjs().format('YYYY'),
    viewBy: queryParams?.get('type') || budgetType.BUDGET
  })
  const [page, setPage] = useState(1)

  const [savedReports, setSavedReports] = useState(
    getLocal('save_reports')?.map(({ name }) => name)
  )

  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })
  const { data: practicalBudget = [], isLoading: isLoadingBudget } = useListPracticalBudget(params)
  const {
    data: practicalCost = [],
    isLoading: isLoadingCost
  } = useListPracticalCost(params, { enabled: filters.viewBy === budgetType.COST })
  const {
    data: practicalRevenue = [],
    isLoading: isLoadingRevenue
  } = useListPracticalRevenue(params, { enabled: filters.viewBy === budgetType.REVENUE })

  const isLoading = useMemo(() => {
    switch (filters.viewBy) {
      case budgetType.REVENUE:
        return isLoadingRevenue

      case budgetType.COST:
        return isLoadingCost

      default:
        return isLoadingBudget
    }
  }, [filters.viewBy, isLoadingBudget, isLoadingRevenue, isLoadingCost])

  const dataSource = useMemo(() => {
    switch (filters.viewBy) {
      case budgetType.REVENUE:
        return [...practicalRevenue]

      case budgetType.COST:
        return [...practicalCost]

      default:
        return [...practicalBudget]
    }
  }, [filters.viewBy, practicalBudget, practicalRevenue, practicalCost])

  useEffect(() => {
    // Update params
    let params = {}

    if (searchKeyword)
      params.criteria_like = searchKeyword

    setParams(params)
  }, [searchKeyword, filters])

  const handleFilter = (type = '', value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  useEffect(() => {
    if (!getLocal('save_reports'))
      setLocal('save_reports', listSavedReports)
  }, [])

  useEffect(() => {
    if (queryParams?.get('type'))
      handleFilter('viewBy', queryParams?.get('type'))
  }, [queryParams?.get('type')])

  useEffect(() => {
    if (queryParams?.get('year'))
      handleFilter('year', dayjs(queryParams?.get('year'), 'YYYY').format('YYYY'))
  }, [queryParams?.get('year')])

  const colCriteriaTitle = useMemo(() => {
    switch (filters.viewBy) {
      case budgetType.REVENUE:
        return 'Chỉ tiêu doanh thu'

      case budgetType.COST:
        return 'Chỉ tiêu chi phí'

      default:
        return 'Chỉ tiêu'
    }
  }, [filters.viewBy])

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>{colCriteriaTitle}</div>,
      dataIndex: 'criteria',
      key: 'criteria',
      width: 340,
      fixed: 'left',
      render: (criteria, { id, level }) => (
        <p style={{
          fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
          marginLeft: level === 4 ? '2.4rem' : level === 3 ? '1.2rem' : 0
        }}>
          {criteria}
        </p>
      ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tổng cộng</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'total.plan',
          key: 'total.plan',
          width: 130,
          align: 'right',
          render: (_, { id, total, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: total.plan < 0 ? token.colorError : 'inherit'
            }}>
              {total.plan ? formatMoney(total.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'total.practical',
          key: 'total.practical',
          width: 130,
          align: 'right',
          render: (_, { id, total, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: total.practical < 0 ? token.colorError : 'inherit'
            }}>
              {total.practical ? formatMoney(total.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'total.difference',
          key: 'total.difference',
          width: 130,
          align: 'right',
          render: (_, { id, total, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: total.difference < 0 ? token.colorError : 'inherit'
            }}>
              {total.difference ? formatMoney(total.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'total.differenceRatio',
          key: 'total.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, total, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: total.differenceRatio < 0 ? token.colorError
                : total.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : total.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {total.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 1</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'jan.plan',
          key: 'jan.plan',
          width: 130,
          align: 'right',
          render: (_, { id, jan, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jan.plan < 0 ? token.colorError : 'inherit'
            }}>
              {jan.plan ? formatMoney(jan.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'jan.practical',
          key: 'jan.practical',
          width: 130,
          align: 'right',
          render: (_, { id, jan, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jan.practical < 0 ? token.colorError : 'inherit'
            }}>
              {jan.practical ? formatMoney(jan.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'jan.difference',
          key: 'jan.difference',
          width: 130,
          align: 'right',
          render: (_, { id, jan, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jan.difference < 0 ? token.colorError : 'inherit'
            }}>
              {jan.difference ? formatMoney(jan.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'jan.differenceRatio',
          key: 'jan.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, jan, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jan.differenceRatio < 0 ? token.colorError
                : jan.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : jan.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {jan.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 2</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'feb.plan',
          key: 'feb.plan',
          width: 130,
          align: 'right',
          render: (_, { id, feb, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: feb.plan < 0 ? token.colorError : 'inherit'
            }}>
              {feb.plan ? formatMoney(feb.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'feb.practical',
          key: 'feb.practical',
          width: 130,
          align: 'right',
          render: (_, { id, feb, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: feb.practical < 0 ? token.colorError : 'inherit'
            }}>
              {feb.practical ? formatMoney(feb.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'feb.difference',
          key: 'feb.difference',
          width: 130,
          align: 'right',
          render: (_, { id, feb, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: feb.difference < 0 ? token.colorError : 'inherit'
            }}>
              {feb.difference ? formatMoney(feb.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'feb.differenceRatio',
          key: 'feb.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, feb, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: feb.differenceRatio < 0 ? token.colorError
                : feb.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : feb.differenceRatio > 100 ? token.colorSuccessActive : 'inherit'
            }}>
              {feb.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 3</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'mar.plan',
          key: 'mar.plan',
          width: 130,
          align: 'right',
          render: (_, { id, mar, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: mar.plan < 0 ? token.colorError : 'inherit'
            }}>
              {mar.plan ? formatMoney(mar.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'mar.practical',
          key: 'mar.practical',
          width: 130,
          align: 'right',
          render: (_, { id, mar, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: mar.practical < 0 ? token.colorError : 'inherit'
            }}>
              {mar.practical ? formatMoney(mar.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'mar.difference',
          key: 'mar.difference',
          width: 130,
          align: 'right',
          render: (_, { id, mar, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: mar.difference < 0 ? token.colorError : 'inherit'
            }}>
              {mar.difference ? formatMoney(mar.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'mar.differenceRatio',
          key: 'mar.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, mar, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: mar.differenceRatio < 0 ? token.colorError
                : mar.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : mar.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {mar.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 4</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'apr.plan',
          key: 'apr.plan',
          width: 130,
          align: 'right',
          render: (_, { id, apr, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: apr.plan < 0 ? token.colorError : 'inherit'
            }}>
              {apr.plan ? formatMoney(apr.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'apr.practical',
          key: 'apr.practical',
          width: 130,
          align: 'right',
          render: (_, { id, apr, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: apr.practical < 0 ? token.colorError : 'inherit'
            }}>
              {apr.practical ? formatMoney(apr.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'apr.difference',
          key: 'apr.difference',
          width: 130,
          align: 'right',
          render: (_, { id, apr, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: apr.difference < 0 ? token.colorError : 'inherit'
            }}>
              {apr.difference ? formatMoney(apr.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'apr.differenceRatio',
          key: 'apr.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, apr, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: apr.differenceRatio < 0 ? token.colorError
                : apr.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : apr.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {apr.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 5</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'may.plan',
          key: 'may.plan',
          width: 130,
          align: 'right',
          render: (_, { id, may, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: may.plan < 0 ? token.colorError : 'inherit'
            }}>
              {may.plan ? formatMoney(may.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'may.practical',
          key: 'may.practical',
          width: 130,
          align: 'right',
          render: (_, { id, may, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: may.practical < 0 ? token.colorError : 'inherit'
            }}>
              {may.practical ? formatMoney(may.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'may.difference',
          key: 'may.difference',
          width: 130,
          align: 'right',
          render: (_, { id, may, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: may.difference < 0 ? token.colorError : 'inherit'
            }}>
              {may.difference ? formatMoney(may.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'may.differenceRatio',
          key: 'may.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, may, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: may.differenceRatio < 0 ? token.colorError
                : may.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : may.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {may.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 6</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'jun.plan',
          key: 'jun.plan',
          width: 130,
          align: 'right',
          render: (_, { id, jun, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jun.plan < 0 ? token.colorError : 'inherit'
            }}>
              {jun.plan ? formatMoney(jun.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'jun.practical',
          key: 'jun.practical',
          width: 130,
          align: 'right',
          render: (_, { id, jun, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jun.practical < 0 ? token.colorError : 'inherit'
            }}>
              {jun.practical ? formatMoney(jun.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'jun.difference',
          key: 'jun.difference',
          width: 130,
          align: 'right',
          render: (_, { id, jun, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jun.difference < 0 ? token.colorError : 'inherit'
            }}>
              {jun.difference ? formatMoney(jun.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'jun.differenceRatio',
          key: 'jun.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, jun, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jun.differenceRatio < 0 ? token.colorError
                : jun.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : jun.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {jun.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 7</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'jul.plan',
          key: 'jul.plan',
          width: 130,
          align: 'right',
          render: (_, { id, jul, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jul.plan < 0 ? token.colorError : 'inherit'
            }}>
              {jul.plan ? formatMoney(jul.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'jul.practical',
          key: 'jul.practical',
          width: 130,
          align: 'right',
          render: (_, { id, jul, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jul.practical < 0 ? token.colorError : 'inherit'
            }}>
              {jul.practical ? formatMoney(jul.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'jul.difference',
          key: 'jul.difference',
          width: 130,
          align: 'right',
          render: (_, { id, jul, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jul.difference < 0 ? token.colorError : 'inherit'
            }}>
              {jul.difference ? formatMoney(jul.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'jul.differenceRatio',
          key: 'jul.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, jul, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: jul.differenceRatio < 0 ? token.colorError
                : jul.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : jul.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {jul.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 8</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'aug.plan',
          key: 'aug.plan',
          width: 130,
          align: 'right',
          render: (_, { id, aug, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: aug.plan < 0 ? token.colorError : 'inherit'
            }}>
              {aug.plan ? formatMoney(aug.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'aug.practical',
          key: 'aug.practical',
          width: 130,
          align: 'right',
          render: (_, { id, aug, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: aug.practical < 0 ? token.colorError : 'inherit'
            }}>
              {aug.practical ? formatMoney(aug.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'aug.difference',
          key: 'aug.difference',
          width: 130,
          align: 'right',
          render: (_, { id, aug, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: aug.difference < 0 ? token.colorError : 'inherit'
            }}>
              {aug.difference ? formatMoney(aug.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'aug.differenceRatio',
          key: 'aug.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, aug, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: aug.differenceRatio < 0 ? token.colorError
                : aug.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : aug.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {aug.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 9</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'sep.plan',
          key: 'sep.plan',
          width: 130,
          align: 'right',
          render: (_, { id, sep, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: sep.plan < 0 ? token.colorError : 'inherit'
            }}>
              {sep.plan ? formatMoney(sep.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'sep.practical',
          key: 'sep.practical',
          width: 130,
          align: 'right',
          render: (_, { id, sep, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: sep.practical < 0 ? token.colorError : 'inherit'
            }}>
              {sep.practical ? formatMoney(sep.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'sep.difference',
          key: 'sep.difference',
          width: 130,
          align: 'right',
          render: (_, { id, sep, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: sep.difference < 0 ? token.colorError : 'inherit'
            }}>
              {sep.difference ? formatMoney(sep.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'sep.differenceRatio',
          key: 'sep.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, sep, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: sep.differenceRatio < 0 ? token.colorError
                : sep.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : sep.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {sep.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 10</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'oct.plan',
          key: 'oct.plan',
          width: 130,
          align: 'right',
          render: (_, { id, oct, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: oct.plan < 0 ? token.colorError : 'inherit'
            }}>
              {oct.plan ? formatMoney(oct.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'oct.practical',
          key: 'oct.practical',
          width: 130,
          align: 'right',
          render: (_, { id, oct, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: oct.practical < 0 ? token.colorError : 'inherit'
            }}>
              {oct.practical ? formatMoney(oct.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'oct.difference',
          key: 'oct.difference',
          width: 130,
          align: 'right',
          render: (_, { id, oct, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: oct.difference < 0 ? token.colorError : 'inherit'
            }}>
              {oct.difference ? formatMoney(oct.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'oct.differenceRatio',
          key: 'oct.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, oct, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: oct.differenceRatio < 0 ? token.colorError
                : oct.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : oct.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {oct.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 11</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'nov.plan',
          key: 'nov.plan',
          width: 130,
          align: 'right',
          render: (_, { id, nov, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: nov.plan < 0 ? token.colorError : 'inherit'
            }}>
              {nov.plan ? formatMoney(nov.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'nov.practical',
          key: 'nov.practical',
          width: 130,
          align: 'right',
          render: (_, { id, nov, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: nov.practical < 0 ? token.colorError : 'inherit'
            }}>
              {nov.practical ? formatMoney(nov.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'nov.difference',
          key: 'nov.difference',
          width: 130,
          align: 'right',
          render: (_, { id, nov, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: nov.difference < 0 ? token.colorError : 'inherit'
            }}>
              {nov.difference ? formatMoney(nov.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'nov.differenceRatio',
          key: 'nov.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, nov, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: nov.differenceRatio < 0 ? token.colorError
                : nov.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : nov.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {nov.differenceRatio}%
            </span>
          )
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 12</div>,
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Kế hoạch</div>,
          dataIndex: 'dec.plan',
          key: 'dec.plan',
          width: 130,
          align: 'right',
          render: (_, { id, dec, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: dec.plan < 0 ? token.colorError : 'inherit'
            }}>
              {dec.plan ? formatMoney(dec.plan) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực hiện</div>,
          dataIndex: 'dec.practical',
          key: 'dec.practical',
          width: 130,
          align: 'right',
          render: (_, { id, dec, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: dec.practical < 0 ? token.colorError : 'inherit'
            }}>
              {dec.practical ? formatMoney(dec.practical) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chênh lệch</div>,
          dataIndex: 'dec.difference',
          key: 'dec.difference',
          width: 130,
          align: 'right',
          render: (_, { id, dec, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: dec.difference < 0 ? token.colorError : 'inherit'
            }}>
              {dec.difference ? formatMoney(dec.difference) : ''}
            </span>
          )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tỷ lệ TH/KH (%)</div>,
          dataIndex: 'dec.differenceRatio',
          key: 'dec.differenceRatio',
          width: 100,
          align: 'right',
          render: (_, { id, dec, level }) => (
            <span style={{
              fontWeight: filters.viewBy === budgetType.COST || level === 4 || (level === 3 && !id?.startsWith('1.1.')) ? 400 : 500,
              color: dec.differenceRatio < 0 ? token.colorError
                : dec.differenceRatio <= 15 ? token.colorWarning    // ví dụ thế
                  : dec.differenceRatio > 100 ? token.colorSuccessActive
                    : 'inherit'
            }}>
              {dec.differenceRatio}%
            </span>
          )
        },
      ]
    },
  ]

  const pageTitle = useMemo(() => {
    let title = ''
    switch (filters.viewBy) {
      case budgetType.COST:
      case budgetType.REVENUE:
        title = `Tình hình thực hiện ${filters.viewBy} so với kế hoạch (năm ${filters.year})`
        return {
          text: title,
          render: (
            <>
              Tình hình thực hiện {filters.viewBy} so với kế hoạch {' '}
              <i style={{ fontSize: '1.6rem' }}>(năm {filters.year})</i>
              {savedReports?.findIndex(item => item === title) > -1 && (
                <StarFilled className='ml-1'
                  style={{ color: token.colorWarning, fontSize: '2rem' }} />
              )}
            </>
          )
        }

      default:
        title = `Tình hình thực hiện ${filters.viewBy} (năm ${filters.year})`
        return {
          text: title,
          render: (
            <>
              Tình hình thực hiện {filters.viewBy} {' '}
              <i style={{ fontSize: '1.6rem' }}>(năm {filters.year})</i>
              {savedReports?.findIndex(item => item === title) > -1 && (
                <StarFilled className='ml-1'
                  style={{ color: token.colorWarning, fontSize: '2rem' }} />
              )}
            </>
          )
        }
      // return `Tình hình thực hiện ${filters.viewBy} (năm ${filters.year})`
    }
  }, [filters.viewBy, filters.year, savedReports])

  const handleSaveReport = (type = 'save') => {
    const clone = [...getLocal('save_reports')]
    let msg = ''

    if (type === 'save') {
      clone.push({
        id: clone?.length + 1,
        type: filters.viewBy,
        year: filters.year,
        name: pageTitle.text
      })
      msg = 'Lưu báo cáo thành công'
    }
    else {  // type === 'unsave'
      _.remove(clone, ({ name }) => name === pageTitle.text)
      msg = 'Bỏ lưu báo cáo thành công'
    }

    setSavedReports(clone?.map(({ name }) => name))
    setLocal('save_reports', clone)
    toast.success(msg, { autoClose: 1000 })
  }


  return (
    <>
      <PageHeader
        title={pageTitle.render}
        pageActions={
          <Space size='small'>
            <Button type="link" size='middle' className='p-btn'>
              <Link to='/budget/reports'>Danh sách báo cáo đã lưu</Link>
            </Button>
            {savedReports?.findIndex(item => item === pageTitle.text) === -1 ? (
              <Button type="default" icon={<SaveOutlined />}
                size='middle' className='p-btn'
                onClick={() => handleSaveReport('save')}
              >
                Lưu báo cáo
              </Button>
            ) : (
              <Popconfirm
                placement="bottom"
                title='Bạn có chắc muốn bỏ lưu báo cáo này?'
                onConfirm={() => handleSaveReport('unsave')}
                okText="Có"
                cancelText="Không"
              >
                <Button type="dashed" icon={<SaveOutlined />}
                  size='middle' className='p-btn'
                >
                  Bỏ lưu báo cáo
                </Button>
              </Popconfirm>
            )}

            <Button type="primary" icon={<FileExcelOutlined />}
              size='middle' className='p-btn'
            >
              Xuất Excel
            </Button>
          </Space>
        }
        pageFilters={
          <>
            <Segmented
              options={Object.values(budgetType)}
              value={filters.viewBy}
              onChange={value => handleFilter('viewBy', value)}
            />
            <DatePicker picker="year"
              format='YYYY'
              value={dayjs(filters.year, 'YYYY')}   // uncontrolled component
              onChange={value => handleFilter('year', value.format('YYYY'))}
              // onChange={(_, newValue) => console.log({ newValue, filters: filters.year })}
              allowClear={false}
              disabledDate={current => current && current > dayjs().endOf('day')}
              style={{ width: 80 }}
              popupClassName='my-datepicker'
            />

            <Select
              mode='multiple'
              value={filters.schools}
              onChange={value => handleFilter('schools', value)}
              placeholder='Cơ sở'
              allowClear
              style={{ minWidth: 180 }}
              options={schools}
            />
          </>
        }
        hasPageSearch
        pageSearchProps={{
          value: searchKeyword,
          placeholder: 'Tìm theo tên chỉ tiêu',
          onChange: e => setSearchKeyword(e?.target?.value),
        }}
      />

      <div className='w-100 pt-2'>
        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={dataSource}
            bordered size='small'
            scroll={{ x: 'calc(100rem + 50%)' }}
            className={'w-100 my-table'}
            pagination={{
              size: 'default',
              defaultPageSize: 20,
              showTotal: total => `Tổng cộng ${total} dòng`,
              onChange: _page => setPage(_page)
            }}
            summary={pageData => {
              let totalPlan = 0
              let totalPractical = 0
              let totalDifference = 0
              let totalDifferenceRatio = 0

              let janPlan = 0
              let janPractical = 0
              let janDifference = 0
              let janDifferenceRatio = 0

              let febPlan = 0
              let febPractical = 0
              let febDifference = 0
              let febDifferenceRatio = 0

              let marPlan = 0
              let marPractical = 0
              let marDifference = 0
              let marDifferenceRatio = 0

              let aprPlan = 0
              let aprPractical = 0
              let aprDifference = 0
              let aprDifferenceRatio = 0

              let mayPlan = 0
              let mayPractical = 0
              let mayDifference = 0
              let mayDifferenceRatio = 0

              let junPlan = 0
              let junPractical = 0
              let junDifference = 0
              let junDifferenceRatio = 0

              let julPlan = 0
              let julPractical = 0
              let julDifference = 0
              let julDifferenceRatio = 0

              let augPlan = 0
              let augPractical = 0
              let augDifference = 0
              let augDifferenceRatio = 0

              let sepPlan = 0
              let sepPractical = 0
              let sepDifference = 0
              let sepDifferenceRatio = 0

              let octPlan = 0
              let octPractical = 0
              let octDifference = 0
              let octDifferenceRatio = 0

              let novPlan = 0
              let novPractical = 0
              let novDifference = 0
              let novDifferenceRatio = 0

              let decPlan = 0
              let decPractical = 0
              let decDifference = 0
              let decDifferenceRatio = 0

              pageData.forEach(rowData => {
                totalPlan += rowData?.total?.plan
                totalPractical += rowData?.total?.practical
                totalDifference += rowData?.total?.difference
                totalDifferenceRatio += +rowData?.total?.differenceRatio

                janPlan += rowData?.jan?.plan
                janPractical += rowData?.jan?.practical
                janDifference += rowData?.jan?.difference
                janDifferenceRatio += +rowData?.jan?.differenceRatio

                febPlan += rowData?.feb?.plan
                febPractical += rowData?.feb?.practical
                febDifference += rowData?.feb?.difference
                febDifferenceRatio += +rowData?.feb?.differenceRatio

                marPlan += rowData?.mar?.plan
                marPractical += rowData?.mar?.practical
                marDifference += rowData?.mar?.difference
                marDifferenceRatio += +rowData?.mar?.differenceRatio

                aprPlan += rowData?.apr?.plan
                aprPractical += rowData?.apr?.practical
                aprDifference += rowData?.apr?.difference
                aprDifferenceRatio += +rowData?.apr?.differenceRatio

                mayPlan += rowData?.may?.plan
                mayPractical += rowData?.may?.practical
                mayDifference += rowData?.may?.difference
                mayDifferenceRatio += +rowData?.may?.differenceRatio

                junPlan += rowData?.jun?.plan
                junPractical += rowData?.jun?.practical
                junDifference += rowData?.jun?.difference
                junDifferenceRatio += +rowData?.jun?.differenceRatio

                julPlan += rowData?.jul?.plan
                julPractical += rowData?.jul?.practical
                julDifference += rowData?.jul?.difference
                julDifferenceRatio += +rowData?.jul?.differenceRatio

                augPlan += rowData?.aug?.plan
                augPractical += rowData?.aug?.practical
                augDifference += rowData?.aug?.difference
                augDifferenceRatio += +rowData?.aug?.differenceRatio

                sepPlan += rowData?.sep?.plan
                sepPractical += rowData?.sep?.practical
                sepDifference += rowData?.sep?.difference
                sepDifferenceRatio += +rowData?.sep?.differenceRatio

                octPlan += rowData?.oct?.plan
                octPractical += rowData?.oct?.practical
                octDifference += rowData?.oct?.difference
                octDifferenceRatio += +rowData?.oct?.differenceRatio

                novPlan += rowData?.nov?.plan
                novPractical += rowData?.nov?.practical
                novDifference += rowData?.nov?.difference
                novDifferenceRatio += +rowData?.nov?.differenceRatio

                decPlan += rowData?.dec?.plan
                decPractical += rowData?.dec?.practical
                decDifference += rowData?.dec?.difference
                decDifferenceRatio += +rowData?.dec?.differenceRatio
              });

              return filters.viewBy !== budgetType.BUDGET && (
                <Table.Summary fixed>
                  <Table.Summary.Row
                    style={{
                      textAlign: 'right',
                      fontWeight: 700,
                      background: token.colorBgTextHover
                    }}
                  >
                    <Table.Summary.Cell index={0}>Cộng</Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(totalPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(totalPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={totalDifference < 0 ? 'danger' : ''}>
                        {formatMoney(totalDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {totalDifferenceRatio ? Number(totalDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(janPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(janPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={janDifference ? 'danger' : ''}>
                        {formatMoney(janDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {janDifferenceRatio ? Number(janDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(febPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(febPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={febDifference ? 'danger' : ''}>
                        {formatMoney(febDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {febDifferenceRatio ? Number(febDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(marPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(marPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={marDifference ? 'danger' : ''}>
                        {formatMoney(marDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {marDifferenceRatio ? Number(marDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(aprPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(aprPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={aprDifference ? 'danger' : ''}>
                        {formatMoney(aprDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {aprDifferenceRatio ? Number(aprDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(mayPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(mayPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={mayDifference ? 'danger' : ''}>
                        {formatMoney(mayDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {mayDifferenceRatio ? Number(mayDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(junPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(junPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={junDifference ? 'danger' : ''}>
                        {formatMoney(junDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {junDifferenceRatio ? Number(junDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(julPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(julPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={julDifference ? 'danger' : ''}>
                        {formatMoney(julDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {julDifferenceRatio ? Number(julDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(augPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(augPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={augDifference ? 'danger' : ''}>
                        {formatMoney(augDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {augDifferenceRatio ? Number(augDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(sepPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(sepPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={sepDifference ? 'danger' : ''}>
                        {formatMoney(sepDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {sepDifferenceRatio ? Number(sepDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(octPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(octPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={octDifference ? 'danger' : ''}>
                        {formatMoney(octDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {octDifferenceRatio ? Number(octDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(novPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(novPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={novDifference ? 'danger' : ''}>
                        {formatMoney(novDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {novDifferenceRatio ? Number(novDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>

                    <Table.Summary.Cell>{formatMoney(decPlan)}</Table.Summary.Cell>
                    <Table.Summary.Cell>{formatMoney(decPractical)}</Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Typography.Text type={decDifference ? 'danger' : ''}>
                        {formatMoney(decDifference)}
                      </Typography.Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      {decDifferenceRatio ? Number(decDifferenceRatio).toFixed(2) : 0}%
                    </Table.Summary.Cell>
                    <Table.Summary.Cell />
                  </Table.Summary.Row>
                </Table.Summary>
              )
            }}
          />
        </Spin>
      </div>
    </>
  )
}

export default PracticalTab