import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import qs from 'qs'
import _ from 'lodash'
import { Button, Popconfirm, Select, Space, Spin, Switch, Table, Tag, Tooltip } from 'antd'
import {
  FileExcelOutlined, PlusOutlined,
  EditOutlined, LockOutlined, KeyOutlined
} from '@ant-design/icons'

import api from '../../../../config/api'
import { filterAccounts, staffStatus, userRole } from '../../../../config/constants'
import { URL_ACCOUNTS, URL_SCHOOLS } from '../../../../config/endpoints'
import { AccountDetailDrawer, MainLayout } from '../../..'

function FoodMenuLayout() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [detailData, setDetailData] = useState(null)

  const [listSchools, setListSchools] = useState([])

  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    [filterAccounts.STATUS]: null,
    [filterAccounts.ROLE]: [],
    [filterAccounts.SCHOOL]: [],
  })
  const [workingStatuses, setWorkingStatuses] = useState({})
  const [page, setPage] = useState(1)

  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)
  const [openPopConfirm, setOpenPopConfirm] = useState({
    lockAccount: null,
    resetPass: null
  })

  useEffect(() => {
    api.get(URL_SCHOOLS).then(res => {
      if (!res || res?.length <= 0) return

      const list = res?.map(({ id, name }) => ({
        value: id,
        label: name,
      }))
      setListSchools(list)
    })

    return () => {
      setListSchools([])
    }
  }, [])

  useEffect(() => {
    // Fetch data of accounts
    setLoading(true)

    let params = {}

    if (searchKeyword) {
      if (searchKeyword.startsWith('0'))
        params.phone_like = searchKeyword
      else
        params.name_like = searchKeyword
    }

    if (filters[filterAccounts.STATUS])
      params.status = filters[filterAccounts.STATUS]

    if (filters[filterAccounts.ROLE]?.length > 0) {
      if (!filters[filterAccounts.ROLE]?.includes('all'))
        params.role = filters[filterAccounts.ROLE]
      else
        params.role = [...Object.values(userRole)]
    }

    if (filters[filterAccounts.SCHOOL]?.length > 0) {
      if (!filters[filterAccounts.SCHOOL]?.includes('all'))
        params.schoolId = filters[filterAccounts.SCHOOL]
      else
        params.schoolId = [...listSchools]?.map(({ value }) => value)
    }

    params = qs.stringify(params, { indices: false })

    api.get(`${URL_ACCOUNTS}?${params}`)
      .then(res => {
        setData(res)
        setWorkingStatuses(() => {
          const obj = {}
          res.forEach(({ id, status }) => {
            obj[id] = status
          })
          return obj
        })
      })
      .finally(() => setLoading(false))

    return () => {
      setData([])
    }
  }, [searchKeyword, filters])

  // console.log('workingStatuses: ', workingStatuses)

  // Currently, I can only search by name or phone. Maybe in the future, I will enhance to be able to search by email 
  const handleFilter = (type = '', value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleViewDetail = record => {
    setDetailData(record)
    setOpenDetailDrawer(true)
  }

  const handleChangeWorkingStatuses = (id, newStatus) => {
    const toastId = toast.loading("Loading...")

    api.patch(
      `${URL_ACCOUNTS}/${id}`,
      { status: newStatus ? staffStatus.WORKING : staffStatus.QUITTED }
    ).then(res => {
      setWorkingStatuses(prevStatus => {
        const clone = { ...prevStatus }
        clone[id] = res?.status
        return clone
      })

      toast.update(toastId, {
        render: "C???p nh???t tr???ng th??i th??nh c??ng!",
        type: "success",
        isLoading: false,
        autoClose: 1500
      });
    })
  }

  // Ch??? confirm, ko bi???t c?? n??n d??ng ko
  const handleLockAccount = id => {
    // Call API to PATCH
    // setSchoolStatuses(prevStatus => {
    //   const clone = { ...prevStatus }
    //   clone[id] = schoolStatus.CLOSED
    //   return clone
    // })
    setOpenPopConfirm({
      lockAccount: null,
      resetPass: null
    })
  }

  // Default password = 123456
  const handleResetPass = id => {
    const toastId = toast.loading("Loading...")

    api.patch(
      `${URL_ACCOUNTS}/${id}`,
      { password: '123456' }
    ).then(res => {
      setOpenPopConfirm({
        lockAccount: null,
        resetPass: null
      })
      toast.update(toastId, {
        render: (
          <>
            <h4 style={{ marginBottom: '.35rem' }}>?????t l???i m???t kh???u th??nh c??ng!</h4>
            <p>M???t kh???u m???i: <b>{res?.password}</b></p>
          </>
        ),
        type: "success",
        isLoading: false,
        autoClose: 2500
      })
    })


    // setSchoolStatuses(prevStatus => {
    //   const clone = { ...prevStatus }
    //   clone[id] = schoolStatus.CLOSED
    //   return clone
    // })
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
      title: 'H??? v?? T??n',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        let color = record?.role === 'Admin tr?????ng'
          ? 'volcano' : record?.role === 'Admin ATY'
            ? 'magenta' : 'geekblue'
        return (
          <div>
            <a onClick={() => handleViewDetail(record)}>
              <b>{record?.name}</b>
            </a>
            <br />
            <Tag color={color} key={record?.role} className='mt-1'>
              <span style={{ fontWeight: 500 }}>{record?.role}</span>
            </Tag>
          </div>
        )
      },
      // width: '20rem'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      // width: '12rem'
    },
    {
      title: 'S??T',
      dataIndex: 'phone',
      key: 'phone',
      // width: '12rem'
    },
    {
      title: 'Tr???ng th??i',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      // width: '12rem',
      render: (_, { id }) => (
        <Switch
          checked={workingStatuses[id] === staffStatus.WORKING}
          onChange={newStatus => handleChangeWorkingStatuses(id, newStatus)}
          checkedChildren={staffStatus.WORKING}
          unCheckedChildren={staffStatus.QUITTED}
        />
      )
    },
    {
      title: '',
      key: 'action',
      align: 'center',
      // width: '12rem',
      render: (_, record) => (
        <Space size="small" align='end'>
          <Tooltip title="Chi ti???t">
            <Button type="text"
              shape='circle'
              icon={<EditOutlined style={{ color: '#1677ff' }} />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>

          <Popconfirm
            title="B???n c?? ch???c mu???n kh??a t??i kho???n n??y?"
            onConfirm={() => handleLockAccount(record?.id)}
            onCancel={() => setOpenPopConfirm({ lockAccount: null, resetPass: null })}
            okText="Ch???c ch???n"
            cancelText="Kh??ng"
            open={openPopConfirm.lockAccount === record?.id}
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Kh??a t??i kho???n">
              <Button type="text" danger
                shape='circle'
                icon={<LockOutlined />}
                onClick={() => setOpenPopConfirm({ lockAccount: record?.id, resetPass: null })}
                disabled={workingStatuses[record?.id] === staffStatus.QUITTED}
              />
            </Tooltip>
          </Popconfirm>

          {/* ?????i pass */}
          <Popconfirm
            title={(<span>B???n c?? ch???c mu???n ?????t l???i m???t kh???u cho <b>{record?.name}</b>?</span>)}
            onConfirm={() => handleResetPass(record?.id)}
            onCancel={() => setOpenPopConfirm({ lockAccount: null, resetPass: null })}
            okText="Ch???c ch???n"
            cancelText="Kh??ng"
            open={openPopConfirm.resetPass === record?.id}
            // okButtonProps={{ danger: true }}
            placement='topRight'
          >
            <Tooltip title="?????t l???i pass">
              <Button type="text"
                shape='circle'
                icon={<KeyOutlined style={{ color: '#1677ff' }} />}
                onClick={() => setOpenPopConfirm({ lockAccount: null, resetPass: record?.id })}
                disabled={workingStatuses[record?.id] === staffStatus.QUITTED}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <MainLayout
      title="B???ng gi?? th???c ????n"
      breadcrumbs={[
        { path: '/settings', name: 'Thi???t l???p chung' },
        // { path: '/settings', name: 'N???i b??? ATY' },
      ]}
      pageActions={
        <Space size='small'>
          <Button type="primary" icon={<PlusOutlined />}
            size='middle' className='p-btn'
          >
            Th??m T??i kho???n
          </Button>
          <Button type="default" icon={<FileExcelOutlined />}
            size='middle' className='p-btn'
          >
            Xu???t Excel
          </Button>
        </Space>
      }
      pageFilters={
        <>
          <Select
            value={filters[filterAccounts.STATUS]}
            onChange={value => handleFilter(filterAccounts.STATUS, value)}
            placeholder='Tr???ng th??i'
            allowClear
            style={{ width: 150 }}
            options={[
              ...Object.values(staffStatus)?.map(item => ({
                value: item,
                label: item,
              }))
            ]}
          />
          <Select
            mode='multiple'
            value={filters[filterAccounts.ROLE]}
            onChange={value => handleFilter(filterAccounts.ROLE, value)}
            placeholder='Vai tr??'
            allowClear
            style={{ minWidth: 120 }}
            options={[
              {
                value: 'all',
                label: 'T???t c??? vai tr??',
              },
              ...Object.values(userRole)?.map(item => ({
                value: item,
                label: item,
                disabled: filters[filterAccounts.ROLE]?.includes('all')
              }))
            ]}
          />
          <Select
            mode='multiple'
            value={filters[filterAccounts.SCHOOL]}
            onChange={value => handleFilter(filterAccounts.SCHOOL, value)}
            placeholder='C?? s???'
            allowClear
            style={{ minWidth: 180 }}
            options={[
              {
                value: 'all',
                label: 'T???t c??? c?? s???',
              },
              ...listSchools?.map(item => ({
                ...item,
                disabled: filters[filterAccounts.SCHOOL]?.includes('all')
              }))
            ]}
          />
        </>
      }
      hasPageSearch
      pageSearchProps={{
        value: searchKeyword,
        placeholder: 'T??m theo t??n, S??T, ?????a ch???',
        onChange: e => setSearchKeyword(e?.target?.value),
      }}
    // tabs={[
    //   { key: '1', label: '' }
    // ]}  // L??m sao ???? ????? l???y ??c data c???a nh???ng ph???n thi???t l???p c??ng lo???i (l???p, h???c ph??, l????ng,...)
    >
      <div className='w-100 pt-2'>
        <Spin spinning={loading}>
          <Table
            columns={columns} dataSource={data}
            size='middle'
            className={'w-100 my-table'}
            pagination={{
              size: 'default',
              showTotal: total => `T???ng c???ng ${total} d??ng`,
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

export default FoodMenuLayout