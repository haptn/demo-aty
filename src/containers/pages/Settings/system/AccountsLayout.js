import React, { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import _ from 'lodash'
import clsx from 'clsx'
import { Button, Popconfirm, Select, Space, Spin, Switch, Table, Tag, Tooltip } from 'antd'
import {
  FileExcelOutlined, PlusOutlined,
  EditOutlined, LockOutlined, KeyOutlined
} from '@ant-design/icons'

import { filterAccounts, staffStatus, userRole } from '../../../../config/constants'
import { useListSchools } from '../../../../services/schoolServices'
import { useListAccounts, useMutationUpdateAccount } from '../../../../services/accountServices'
import { AccountDetailDrawer, MainLayout } from '../../..'
import styles from '../../../../styles/pages/SchoolLayout.module.scss'

function AccountsLayout() {
  const [detailData, setDetailData] = useState(null)

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    [filterAccounts.STATUS]: null,
    [filterAccounts.ROLE]: [],
    [filterAccounts.SCHOOL]: [],
  })
  const [page, setPage] = useState(1)

  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)
  const [openPopConfirm, setOpenPopConfirm] = useState({
    lockAccount: null,
    resetPass: null
  })

  const queryClient = useQueryClient()
  const { data: accounts = [], isLoading } = useListAccounts(params)
  const accountMutation = useMutationUpdateAccount()

  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })

  useEffect(() => {
    // Update params
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
        params.schoolId = [...schools]?.map(({ value }) => value)
    }

    setParams(params)
  }, [searchKeyword, filters])

  // Currently, I can only search by name or phone. Maybe in the future, I will enhance to be able to search by email 
  const handleFilter = (type = '', value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleViewDetail = record => {
    setDetailData(record)
    setOpenDetailDrawer(true)
  }

  const handleChangeWorkingStatuses = async (id, newStatus) => {
    const toastId = toast.loading("Loading...")

    accountMutation.mutateAsync(
      {
        id,
        data: {
          status: newStatus ? staffStatus.WORKING : staffStatus.QUITTED
        }
      },
      {
        onSuccess: () => {
          toast.update(toastId, {
            render: "Cập nhật trạng thái thành công!",
            type: "success",
            isLoading: false,
            autoClose: 1500
          });
          queryClient.invalidateQueries(['accounts', { ...params }])
        },
        onError: error => {
          toast.update(toastId, {
            render: (
              <>
                <h4>Cập nhật trạng thái thất bại!</h4>
                <p>{error?.message}</p>
              </>
            ),
            type: "error",
            isLoading: false,
            autoClose: 1500,
          })
        },
      }
    )
  }

  // Chờ confirm, ko biết có nên dùng ko
  const handleLockAccount = id => {
    setOpenPopConfirm({
      lockAccount: null,
      resetPass: null
    })
  }

  // Default password = 123456
  const handleResetPass = id => {
    const toastId = toast.loading("Loading...")

    accountMutation.mutate(
      {
        id,
        data: { password: '123456' }
      },
      {
        onSuccess: res => {
          setOpenPopConfirm({
            lockAccount: null,
            resetPass: null
          })
          toast.update(toastId, {
            render: (
              <>
                <h4 style={{ marginBottom: '.35rem' }}>
                  Đặt lại mật khẩu thành công!
                </h4>
                <p>
                  Mật khẩu mới: <b>{res?.password}</b>
                </p>
              </>
            ),
            type: "success",
            isLoading: false,
            autoClose: 2500
          })
        },
        onError: error => {
          toast.update(toastId, {
            render: (
              <>
                <h4>Đặt lại mật khẩu thất bại!</h4>
                <p>{error?.message}</p>
              </>
            ),
            type: "error",
            isLoading: false,
            autoClose: 1500,
          })
        },
      }
    )
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
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        let color = record?.role === 'Admin trường'
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
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
      // width: '12rem'
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
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      // width: '12rem',
      render: (_, { id, status }) => (
        <Switch
          // checked={workingStatuses[id] === staffStatus.WORKING}
          checked={status === staffStatus.WORKING}
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
          <Tooltip title="Chi tiết">
            <Button type="text"
              shape='circle'
              icon={<EditOutlined style={{ color: '#1677ff' }} />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>

          <Popconfirm
            title="Bạn có chắc muốn khóa tài khoản này?"
            onConfirm={() => handleLockAccount(record?.id)}
            onCancel={() => setOpenPopConfirm({ lockAccount: null, resetPass: null })}
            okText="Chắc chắn"
            cancelText="Không"
            open={openPopConfirm.lockAccount === record?.id}
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Khóa tài khoản">
              <Button type="text" danger
                shape='circle'
                icon={<LockOutlined />}
                onClick={() => setOpenPopConfirm({ lockAccount: record?.id, resetPass: null })}
              // disabled={record?.status === staffStatus.QUITTED}
              />
            </Tooltip>
          </Popconfirm>

          {/* Đổi pass */}
          <Popconfirm
            title={(<span>Bạn có chắc muốn đặt lại mật khẩu cho <b>{record?.name}</b>?</span>)}
            onConfirm={() => handleResetPass(record?.id)}
            onCancel={() => setOpenPopConfirm({ lockAccount: null, resetPass: null })}
            okText="Chắc chắn"
            cancelText="Không"
            open={openPopConfirm.resetPass === record?.id}
            // okButtonProps={{ danger: true }}
            placement='topRight'
          >
            <Tooltip title="Đặt lại pass">
              <Button type="text"
                shape='circle'
                icon={<KeyOutlined style={{ color: '#1677ff' }} />}
                onClick={() => setOpenPopConfirm({ lockAccount: null, resetPass: record?.id })}
              // disabled={workingStatuses[record?.id] === staffStatus.QUITTED}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <MainLayout
      title="Tài khoản & Quyền hạn"
      breadcrumbs={[
        { path: '/settings', name: 'Thiết lập chung' },
        // { path: '/settings', name: 'Nội bộ ATY' },
      ]}
      pageActions={
        <Space size='small'>
          <Button type="primary" icon={<PlusOutlined />}
            size='middle' className='p-btn'
          >
            Thêm Tài khoản
          </Button>
          <Button type="default" icon={<FileExcelOutlined />}
            size='middle' className='p-btn'
          >
            Xuất file Excel
          </Button>
        </Space>
      }
      pageFilters={
        <>
          <Select
            value={filters[filterAccounts.STATUS]}
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
          />
          <Select
            mode='multiple'
            value={filters[filterAccounts.ROLE]}
            onChange={value => handleFilter(filterAccounts.ROLE, value)}
            placeholder='Vai trò'
            allowClear
            style={{ minWidth: 120 }}
            options={[
              {
                value: 'all',
                label: 'Tất cả vai trò',
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
                disabled: filters[filterAccounts.SCHOOL]?.includes('all')
              }))
            ]}
          />
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
            columns={columns} dataSource={accounts}
            size='middle'
            className={clsx(styles.table, 'w-100')}
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

export default AccountsLayout