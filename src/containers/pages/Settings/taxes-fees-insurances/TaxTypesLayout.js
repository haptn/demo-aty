import React, { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import _ from 'lodash'
import { Button, Select, Space, Spin, Switch, Table, Tooltip } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'

import { taxTypeStatus } from '../../../../config/constants'
import { useListTaxTypes, useMutationUpdateTaxType } from '../../../../services/taxServices'
import { MainLayout, AccountDetailDrawer } from '../../..'
import { formatMoney } from '../../../../utils/format'

function TaxTypesLayout() {
  const [detailData, setDetailData] = useState(null)

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    status: null,

    // .status: null,
    // [filterAccounts.ROLE]: [],
    // [filterAccounts.SCHOOL]: [],
  })
  const [page, setPage] = useState(1)

  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)

  const queryClient = useQueryClient()
  const { data: taxes = [], isLoading } = useListTaxTypes(params)
  const taxTypeMutation = useMutationUpdateTaxType()

  useEffect(() => {
    // Update params
    let params = {}

    if (searchKeyword) {
      if (searchKeyword.startsWith('0'))
        params.phone_like = searchKeyword
      else
        params.name_like = searchKeyword
    }
    if (filters.status) params.status = filters.status

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

  const handleChangeStatus = async (id, newStatus) => {
    const toastId = toast.loading("Loading...")

    try {
      await taxTypeMutation.mutateAsync(
        {
          id,
          data: {
            status: newStatus ? taxTypeStatus.APPLYING : taxTypeStatus.NOT_APPLIED
          }
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries(['taxes', { ...params }])
          },
        }
      )
      toast.success(
        'Cập nhật trạng thái thành công!',
        {
          updateId: toastId,
          autoClose: 1500
        }
      )
    }
    catch (error) {
      toast.error(
        (
          <>
            <h4>Cập nhật trạng thái thất bại!</h4>
            <p>{error?.message}</p>
          </>
        ),
        {
          updateId: toastId,
          autoClose: 1500
        }
      )
    }
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
      title: 'Loại thuế',
      dataIndex: 'name',
      key: 'name',
      // width: '28%',
      render: (_, record) => (
        <div>
          <a onClick={() => handleViewDetail(record)}>
            <b>{record?.name}</b>
          </a>
          <br />
          {record?.shortName && (
            <span style={{ fontWeight: 400 }}>
              ({record?.shortName})
            </span>
          )}
        </div>
      ),
    },
    {
      title: 'Chú thích',
      dataIndex: 'note',
      key: 'note',
      // width: '28%',
    },
    {
      title: 'Giá trị',
      dataIndex: 'value',
      key: 'value',
      width: '10%',
      // width: '12rem',
      render: (_, { value, unit }) => {
        if (unit === '%')
          return value ? `${value}%` : '...%'   // don't know default value
        return `${formatMoney(value)}`
      },
    },
    {
      title: 'Đang áp dụng',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: '10%',
      // width: '12rem',
      render: (_, { id, status }) => (
        <Switch
          checked={status === taxTypeStatus.APPLYING}
          onChange={newStatus => handleChangeStatus(id, newStatus)}
          loading={taxTypeMutation.isLoading && taxTypeMutation?.variables?.id === id}
        />
      )
    },
    {
      title: '',
      key: 'action',
      align: 'center',
      width: '10%',
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

  return (
    <MainLayout
      title="Loại thuế"
      breadcrumbs={[
        { path: '/settings', name: 'Thiết lập chung' },
        // { path: '/settings', name: 'Nội bộ ATY' },
      ]}
      pageActions={
        <Space size='small'>
          <Button type="primary" icon={<PlusOutlined />}
            size='middle' className='p-btn'
          >
            Thêm Loại thuế
          </Button>
          {/* <Button type="default" icon={<FileExcelOutlined />}
            size='middle' className='p-btn'
          >
            Xuất Excel
          </Button> */}
        </Space>
      }
      pageFilters={
        <>
          <Select
            value={filters.status}
            onChange={value => handleFilter('status', value)}
            placeholder='Trạng thái'
            allowClear
            style={{ width: 150 }}
            options={[
              ...Object.values(taxTypeStatus)?.map(item => ({
                value: item,
                label: item,
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
            columns={columns} dataSource={taxes}
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

export default TaxTypesLayout