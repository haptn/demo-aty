import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Button, Space, Spin, Table, Tooltip } from 'antd'
import {
  FileExcelOutlined, PlusOutlined, EditOutlined,
} from '@ant-design/icons'

import { useListSchools } from '../../../../services/schoolServices'
import { useListClasses } from '../../../../services/classServices'
import { AccountDetailDrawer, MainLayout } from '../../..'
import { DropdownCheckbox } from '../../../../components'

function ClassesLayout() {
  const [detailData, setDetailData] = useState(null)

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    // [filterAccounts.STATUS]: null,
    schools: [],
    schoolNames: []
  })
  const [page, setPage] = useState(1)

  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)

  const { data: classes = [], isLoading } = useListClasses(params)
  const { data: schools = [] } = useListSchools(undefined,
    { isCustom: true, isAllSchools: true }
  )

  useEffect(() => {
    // Update params
    let params = {}

    if (searchKeyword) {
      if (searchKeyword.startsWith('0'))
        params.phone_like = searchKeyword
      else
        params.name_like = searchKeyword
    }

    // if (filters[filterAccounts.STATUS])
    //   params.status = filters[filterAccounts.STATUS]

    if (filters.schools?.length > 0) {
      // if (!filters.schools?.includes('all'))
      params.schoolId = filters.schools
      // else
      // params.schoolId = [...schools]?.map(({ value }) => value)
    }

    setParams(params)
  }, [searchKeyword, filters])

  // Currently, I can only search by name or phone. Maybe in the future, I will enhance to be able to search by email 
  const handleFilter = (type = '', { value, checked }) => {
    if (type === 'schools') {
      const schoolId = value?.split('-')?.[0]

      setFilters(prev => {
        let clone = { ...prev }

        if (checked && !clone?.schools?.includes(schoolId)) {
          clone.schools = [...clone.schools, schoolId]
          clone.schoolNames = [...clone.schoolNames, value]
        }

        if (!checked && clone?.schools?.includes(schoolId)) {
          _.remove(clone.schools, item => item === schoolId)
          _.remove(clone.schoolNames, item => item === value)
        }

        return clone
      })
      return
    }

    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleViewDetail = record => {
    setDetailData(record)
    setOpenDetailDrawer(true)
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>
    },
    {
      title: 'Lớp',
      dataIndex: 'name',
      key: 'name',
      // width: '20rem',
      render: (_, record) => (
        <a onClick={() => handleViewDetail(record)}>
          <b>{record?.name}</b>
        </a>
      ),
    },
    {
      title: 'Cơ sở',
      dataIndex: 'school',
      key: 'school',
      // width: '12rem',
      render: (_, { schoolId }) => (
        <span style={{ fontWeight: 500, color: '#444' }}>
          {schools?.find(({ value }) => value === schoolId)?.label ?? '-'}
        </span>
      )
    },
    {
      title: 'Sĩ số',
      dataIndex: 'classSize',
      key: 'classSize',
      align: 'center'
    },
    // {
    //   title: 'Trạng thái',
    //   key: 'status',
    //   dataIndex: 'status',
    //   align: 'center',
    //   // width: '12rem',
    //   render: (_, { id, status }) => (
    //     <Switch
    //       // checked={workingStatuses[id] === staffStatus.WORKING}
    //       checked={status === staffStatus.WORKING}
    //       onChange={newStatus => handleChangeWorkingStatuses(id, newStatus)}
    //       checkedChildren={staffStatus.WORKING}
    //       unCheckedChildren={staffStatus.QUITTED}
    //     />
    //   )
    // },
    {
      title: '',
      key: 'action',
      align: 'center',
      // width: '12rem',
      render: (_, record) => (
        <Tooltip title="Chi tiết">
          <Button type="text"
            shape='circle'
            icon={<EditOutlined style={{ color: '#1677ff' }} />}
            onClick={() => handleViewDetail(record)}
          />
        </Tooltip>
      ),
    },
  ]

  const checkedSchoolsLabel = useMemo(() => {
    if (!schools)
      return 'Chọn cơ sở'

    const checkedSchools = _.values(filters.schools)?.filter(item => !!item)

    return checkedSchools?.length === 0
      ? 'Chọn cơ sở'
      : checkedSchools?.length === schools?.length
        ? 'Tất cả cơ sở'
        : `${checkedSchools?.length} cơ sở`
  }, [schools, JSON.stringify(filters.schools)])

  return (
    <MainLayout
      title="Lớp"
      breadcrumbs={[
        { path: '/settings', name: 'Thiết lập chung' },
        // { path: '/settings', name: 'Nội bộ ATY' },
      ]}
      pageActions={
        <Space size='small'>
          <Button type="primary" icon={<PlusOutlined />}
            size='middle' className='p-btn'
          >
            Thêm
          </Button>
          <Button type="default" icon={<FileExcelOutlined />}
            size='middle' className='p-btn'
          >
            Xuất Excel
          </Button>
        </Space>
      }
      pageFilters={
        <>
          {/* <Select
            value={filters.status}
            onChange={value => handleFilter(filterAccounts.STATUS, value)}
            placeholder='Trạng thái'
            allowClear
            style={{ width: 150 }}
            options={[
              ...Object.values(staffStatus)?.map(item => ({
                value: item,
                label: item,
              }))
            ]}
          /> */}
          <DropdownCheckbox {...{
            btnLabel: checkedSchoolsLabel,
            items: schools?.map(({ label, value }) => `${value}-${label}`),
            checkedItems: filters?.schoolNames,
            onCheck: value => handleFilter('schools', value),
          }} />
          {/* <Select
            mode='multiple'
            value={filters.schools}
            onChange={value => handleFilter(filterAccounts.SCHOOL, value)}
            placeholder='Cơ sở'
            allowClear
            style={{ minWidth: 180 }}
            options={[
              {
                value: 'all',
                label: 'Tất cả cơ sở',
              },
              ...schools?.map(item => ({
                ...item,
                disabled: filters.schools?.includes('all')
              }))
            ]}
          /> */}
        </>
      }
      hasPageSearch
      pageSearchProps={{
        value: searchKeyword,
        placeholder: 'Tìm theo tên, SĐT, địa chỉ',
        onChange: e => setSearchKeyword(e?.target?.value),
      }}
    // tabs={[
    //   { key: '1', label: '' }
    // ]}  // Làm sao đó để lấy đc data của những phần thiết lập cùng loại (lớp, học phí, lương,...)
    >
      <div className='w-100 pt-2'>
        <Spin spinning={isLoading}>
          <Table
            columns={columns} dataSource={classes}
            size='middle'
            className={'w-100 my-table'}
            pagination={{
              size: 'default',
              showTotal: total => `Tổng cộng ${total} dòng`,
              onChange: _page => setPage(_page)
            }}
          />
        </Spin>
      </div>

      {openDetailDrawer && (
        <AccountDetailDrawer {...{
          data: detailData,
          open: openDetailDrawer,
          setOpen: setOpenDetailDrawer
        }} />
      )}
    </MainLayout>
  )
}

export default ClassesLayout