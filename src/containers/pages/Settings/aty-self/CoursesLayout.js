import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import qs from 'qs'
import _ from 'lodash'
import { Button, Popconfirm, Select, Space, Spin, Table, Tag, Tooltip } from 'antd'
import {
  FileExcelOutlined, PlusOutlined,
  EditOutlined, StopOutlined
} from '@ant-design/icons'

import api from '../../../../config/api'
import { courseStatus, filterCourses } from '../../../../config/constants'
import { URL_COURSES } from '../../../../config/endpoints'
import { AccountDetailDrawer, MainLayout } from '../../..'
import { formatMoney } from '../../../../utils/format'

function CoursesLayout() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [detailData, setDetailData] = useState(null)

  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    [filterCourses.STATUS]: null,
    [filterCourses.PRICE]: null
  })

  // const [statuses, setStatuses] = useState({})   // cái này là gì???
  const [page, setPage] = useState(1)

  const [openPopConfirm, setOpenPopConfirm] = useState(null)
  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)
  // const [openPopConfirm, setOpenPopConfirm] = useState({
  //   lockAccount: null,
  //   resetPass: null
  // })

  useEffect(() => {
    setLoading(true)

    let params = {}

    if (searchKeyword)
      params.name_like = searchKeyword

    if (filters[filterCourses.STATUS])
      params.status = filters[filterCourses.STATUS]

    params = qs.stringify(params, { indices: false })

    api.get(`${URL_COURSES}?${params}`)
      .then(res => {
        setData(res)
        // setStatuses(() => {
        //   const obj = {}
        //   res.forEach(({ id, status }) => {
        //     obj[id] = status
        //   })
        //   return obj
        // })
      })
      .finally(() => setLoading(false))

    return () => {
      setData([])
    }
  }, [searchKeyword, filters])

  // console.log('statuses: ', statuses)

  // Currently, I can only search by name or phone. Maybe in the future, I will enhance to be able to search by email 
  const handleFilter = (type = '', value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleViewDetail = record => {
    setDetailData(record)
    setOpenDetailDrawer(true)
  }

  const handleChangeStatuses = (id, newStatus) => {
    const toastId = toast.loading("Loading...")

    api.patch(
      `${URL_COURSES}/${id}`,
      { status: newStatus ?? courseStatus.PAUSED }
    ).then(res => {
      // setStatuses(prevStatus => {
      //   const clone = { ...prevStatus }
      //   clone[id] = res?.status
      //   return clone
      // })

      console.log('res: ', res)

      toast.update(toastId, {
        render: "Cập nhật trạng thái thành công!",
        type: "success",
        isLoading: false,
        autoClose: 1500
      });
    })
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
      title: 'Tên chương trình',
      dataIndex: 'name',
      key: 'name',
      width: '25%',
      render: (_, { name }) => <span style={{ fontWeight: 500 }}>{name}</span>,
      // width: '20rem'
    },
    {
      title: 'Học phí',
      dataIndex: 'price',
      key: 'price',
      // align: 'right',
      // width: '20rem'
      render: (_, { price }) => formatMoney(price),
      sorter: (a, b) => a?.price - b?.price,
    },
    {
      title: 'Phạm vi áp dụng',
      dataIndex: 'schoolId',
      key: 'schoolId',
      width: '15%',
      render: (_, { schoolId }) => {
        return !schoolId ? <>{'Tất cả cơ sở'}</> : <>{schoolId}</>
      },
      // width: '12rem'
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: '15%',
      // width: '12rem'
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      // width: '12rem',
      render: (_, { id, status }) => {
        // const status = schoolStatuses[id]
        let color = status === courseStatus.READIED
          ? 'green'
          : status === courseStatus.PAUSED
            ? 'volcano' : 'blue'

        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        )
      }
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
            title="Bạn có chắc muốn dừng khóa học này?"
            onConfirm={() => handleChangeStatuses(record?.id)}
            onCancel={() => setOpenPopConfirm(null)}
            okText="Có, dừng"
            cancelText="Không"
            open={openPopConfirm === record?.id}
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger
              shape='circle'
              icon={<StopOutlined />}
              onClick={() => setOpenPopConfirm(record?.id)}
              disabled={record?.status === courseStatus.PAUSED}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <MainLayout
      title="Chương trình, khóa học"
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
            Xuất Excel
          </Button>
        </Space>
      }
      pageFilters={
        <>
          <Select
            value={filters[filterCourses.STATUS]}
            onChange={value => handleFilter(filterCourses.STATUS, value)}
            placeholder='Trạng thái'
            allowClear
            style={{ width: 150 }}
            options={[
              ...Object.values(courseStatus)?.map(item => ({
                value: item,
                label: item,
              }))
            ]}
          />
          {/* <Select
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
              ...listSchools?.map(item => ({
                ...item,
                disabled: filters[filterAccounts.SCHOOL]?.includes('all')
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
        <Spin spinning={loading}>
          <Table
            columns={columns} dataSource={data}
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

export default CoursesLayout