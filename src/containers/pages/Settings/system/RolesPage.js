import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Popconfirm, Space, Spin, Table, Tooltip } from 'antd'
import {
  FileExcelOutlined, PlusOutlined,
  CopyOutlined, EditOutlined,
  StopOutlined, UsergroupAddOutlined,
} from '@ant-design/icons'

import { userRole } from '../../../../config/constants'
import { useListRoles } from '../../../../services/roleServices'
import { MainLayout, PrivilegeDrawer, RoleDrawer } from '../../..'

function RolesPage() {
  const [detailData, setDetailData] = useState(null)

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  // const [filters, setFilters] = useState({
  //   [filterAccounts.STATUS]: null,
  //   [filterAccounts.ROLE]: [],
  //   [filterAccounts.SCHOOL]: [],
  // })
  const [page, setPage] = useState(1)

  const [openDrawer, setOpenDrawer] = useState({
    role: { add: false, edit: false },
    privilege: false
    // add: false,
    // detail: false,
  })
  const [openPopConfirm, setOpenPopConfirm] = useState({
    lockRole: null
  })

  const { data: accounts = [], isLoading } = useListRoles(params)

  useEffect(() => {
    // Update params
    let params = {}

    if (searchKeyword)
      params.name_like = searchKeyword

    setParams(params)
  }, [searchKeyword])   // , filters

  // Currently, I can only search by name or phone. Maybe in the future, I will enhance to be able to search by email 
  // const handleFilter = (type = '', value) => {
  //   setFilters(prev => ({ ...prev, [type]: value }))
  // }

  const handleToggleDrawer = (type = '', status, mode = '', record = null) => {
    setDetailData(record)
    if (type === 'privilege')
      setOpenDrawer(prev => ({ ...prev, privilege: status }))
    else
      setOpenDrawer(prev => ({ ...prev, [type]: { ...prev[type], [mode]: status } }))
    // setOpenDrawer(prev => ({ ...prev, [mode]: status }))
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>
    },
    {
      title: 'Mã vai trò',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên vai trò',
      dataIndex: 'name',
      key: 'name',
      // width: '20rem'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      // width: '12rem',
    },
    {
      title: '',
      key: 'action',
      align: 'center',
      width: '20rem',
      render: (_, record) => (
        <Space size="small" align='end'>
          <Tooltip title="Chi tiết">
            <Button type="text"
              shape='circle'
              icon={<EditOutlined style={{ color: '#1677ff' }} />}
              onClick={() => handleToggleDrawer('role', true, 'edit', record)}
            />
          </Tooltip>
          <Tooltip title="Phân quyền">
            <Button type="text"
              shape='circle'
              icon={<UsergroupAddOutlined style={{ color: '#1677ff' }} />}
              onClick={() => handleToggleDrawer('privilege', true, '', record)}
            />
          </Tooltip>
          <Tooltip title="Nhân bản">
            <Button type="text"
              shape='circle'
              icon={<CopyOutlined style={{ color: '#1677ff' }} />}
            />
          </Tooltip>

          <Popconfirm
            title="Bạn có chắc muốn khóa vai trò này?"
            placement='rightTop'
            onConfirm={() => setOpenPopConfirm(
              prev => ({ ...prev, lockRole: record?.id })
            )}
            onCancel={() => setOpenPopConfirm({ lockRole: null })}
            okText="Có"
            cancelText="Không"
            open={openPopConfirm.lockRole === record?.id}
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Khóa vai trò">
              <Button type="text" danger
                shape='circle'
                icon={<StopOutlined />}
                onClick={() => setOpenPopConfirm({ lockRole: record?.id, resetPass: null })}
                disabled={record?.status === userRole.ADMIN}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const btnAddOptions = [
    {
      label: 'Nhập từ Excel',
      key: 'import-xlsx',
      icon: <FileExcelOutlined />,
    },
  ]

  const menuProps = {
    items: btnAddOptions,
  }

  return (
    <MainLayout
      title="Vai trò và quyền hạn"
      breadcrumbs={[
        { path: '/settings', name: 'Thiết lập chung' },
        // { path: '/settings', name: 'Nội bộ ATY' },
      ]}
      pageActions={
        <Space size='small'>
          <Dropdown menu={menuProps} placement='bottomRight'>
            <Button type="primary" icon={<PlusOutlined />}
              size='middle' className='p-btn'
              onClick={() => handleToggleDrawer('role', true, 'add')}
            >
              Thêm
            </Button>
          </Dropdown>

          <Button type="default" icon={<FileExcelOutlined />}
            size='middle' className='p-btn'
          >
            Xuất Excel
          </Button>
        </Space>
      }
      // pageFilters={
      //   <>
      //     <Select
      //       value={filters[filterAccounts.STATUS]}
      //       onChange={value => handleFilter(filterAccounts.STATUS, value)}
      //       placeholder='Trạng thái'
      //       allowClear
      //       style={{ width: 110 }}
      //       options={[
      //         ...Object.values(staffStatus)?.map(item => ({
      //           value: item,
      //           label: item,
      //         }))
      //       ]}
      //     />
      //     <Select
      //       mode='multiple'
      //       value={filters[filterAccounts.ROLE]}
      //       onChange={value => handleFilter(filterAccounts.ROLE, value)}
      //       placeholder='Vai trò'
      //       allowClear
      //       style={{ minWidth: 150 }}
      //       options={[
      //         {
      //           value: 'all',
      //           label: 'Tất cả vai trò',
      //         },
      //         ...Object.values(userRole)?.map(item => ({
      //           value: item,
      //           label: item,
      //           disabled: filters[filterAccounts.ROLE]?.includes('all')
      //         }))
      //       ]}
      //     />
      //     <Select
      //       mode='multiple'
      //       value={filters[filterAccounts.SCHOOL]}
      //       onChange={value => handleFilter(filterAccounts.SCHOOL, value)}
      //       placeholder='Cơ sở'
      //       allowClear
      //       style={{ minWidth: 180 }}
      //       options={[
      //         {
      //           value: 'all',
      //           label: 'Tất cả cơ sở',
      //         },
      //         ...schools?.map(item => ({
      //           ...item,
      //           disabled: filters[filterAccounts.SCHOOL]?.includes('all')
      //         }))
      //       ]}
      //     />
      //   </>
      // }
      hasPageSearch
      pageSearchProps={{
        value: searchKeyword,
        placeholder: 'Tìm theo tên vai trò',
        onChange: e => setSearchKeyword(e?.target?.value),
      }}
    >
      <div className='w-100 pt-2'>
        <Spin spinning={isLoading}>
          <Table
            columns={columns} dataSource={accounts}
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

      {(openDrawer.role.add || openDrawer.role.edit) && (
        <RoleDrawer {...{
          data: detailData,
          mode: openDrawer.role.add ? 'add' : openDrawer.role.edit ? 'edit' : '',
          open: (openDrawer.role.add || openDrawer.role.edit),
          setOpen: (mode, status) => handleToggleDrawer('role', status, mode)
        }} />
      )}

      {openDrawer.privilege && (
        <PrivilegeDrawer {...{
          data: detailData,
          open: openDrawer.privilege,
          setOpen: status => handleToggleDrawer('privilege', status)
        }} />
      )}
    </MainLayout>
  )
}

export default RolesPage