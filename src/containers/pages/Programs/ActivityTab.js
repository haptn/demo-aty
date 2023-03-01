import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Button, Collapse, DatePicker, Dropdown, Select, Space, Spin, Table, Tag, theme, Tooltip } from 'antd'
import {
  EditOutlined, FileExcelOutlined,
  FormOutlined, PlusOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

import { formatMoney, formatNumber } from '../../../utils/format'
import { currentActivityStatus } from '../../../config/constants'
import { useListSchools } from '../../../services/schoolServices'
import { useListCurrentActivities } from '../../../services/courseServices'
import { PageHeader } from '../../../components'

function ActivityTab(props) {
  const { setDetailData, setOpenDetailDrawer } = props   // from SalaryPage
  const { token } = theme.useToken()

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    status: null,
    month: dayjs().format('YYYY/M')
  })
  const [page, setPage] = useState(1)

  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })
  const { data: activities = [], isLoading } = useListCurrentActivities(params)

  useEffect(() => {
    // Update params
    let params = {}

    if (searchKeyword) {
      if (searchKeyword.startsWith('0'))
        params.phone_like = searchKeyword
      else
        params.name_like = searchKeyword
    }

    if (filters.status)
      params.status = filters.status

    if (filters.jobPosition?.length > 0) {
      // if (!filters.jobPosition?.includes('all'))
      params.jobPosition = filters.jobPosition
      // else
      //   params.role = [...Object.values(userRole)]
    }

    // if (filters.school?.length > 0) {
    //   if (!filters.school?.includes('all'))
    //     params.schoolId = filters.school
    //   else
    //     params.schoolId = [...schools]?.map(({ value }) => value)
    // }

    setParams(params)
  }, [searchKeyword, filters])

  const handleFilter = (type = '', value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleViewDetail = record => {
    setDetailData(prev => ({ ...prev, salary: record }))
    setOpenDetailDrawer(prev => ({ ...prev, salary: true }))
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: '6rem',
      align: 'center',
      render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>
    },
    {
      title: <div style={{ textAlign: 'center' }}>Hoạt động</div>,
      dataIndex: 'name',
      key: 'name',
      width: '23%',
      render: (_, { name }) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Phí tham gia</div>,
      dataIndex: 'attendenceFee',
      key: 'attendenceFee',
      align: 'right',
      width: '12rem',
      render: attendenceFee => formatMoney(attendenceFee ?? 0),
      sorter: (a, b) => a?.attendenceFee - b?.attendenceFee,
    },
    {
      title: 'Số lượng',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Tối thiểu</div>,
          dataIndex: 'minParticipants',
          key: 'minParticipants',
          align: 'right',
          render: value => formatNumber(value ?? 0)
        },
        {
          title: <div style={{ textAlign: 'center' }}>Tối đa</div>,
          dataIndex: 'maxParticipants',
          key: 'maxParticipants',
          align: 'right',
          render: value => value ? formatNumber(value) : 'Không giới hạn'
        },
        {
          title: <div style={{ textAlign: 'center' }}>Thực tế</div>,
          dataIndex: 'totalParticipants',
          key: 'totalParticipants',
          align: 'right',
          render: value => value ? formatNumber(value) : ''
        }
      ]
    },
    // {
    //   title: 'Phạm vi áp dụng',
    //   dataIndex: 'schoolId',
    //   key: 'schoolId',
    //   width: '15%',
    //   render: (_, { schoolId }) => {
    //     return !schoolId ? <>{'Tất cả cơ sở'}</> : <>{schoolId}</>
    //   },
    //   // width: '12rem'
    // },
    // {
    //   title: <div style={{ textAlign: 'center' }}>Mô tả</div>,
    //   dataIndex: 'description',
    //   key: 'description',
    //   width: '15%',
    //   // width: '12rem'
    // },
    {
      title: 'Ngày giờ',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Phát động</div>,
          dataIndex: 'announcementDate',
          key: 'announcementDate',
          width: '12rem',
          align: 'right',
        },
        {
          title: <div style={{ textAlign: 'center' }}>Bắt đầu</div>,
          dataIndex: 'startDate',
          key: 'startDate',
          width: '12rem',
          align: 'right',
        },
        {
          title: <div style={{ textAlign: 'center' }}>Kết thúc</div>,
          dataIndex: 'endDate',
          key: 'endDate',
          width: '12rem',
          align: 'right',
        }
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Trạng thái</div>,
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: '12rem',
      render: (status) => {
        let color = status === currentActivityStatus.COMING_SOON
          ? 'green'
          : status === currentActivityStatus.PREPARING
            ? 'blue'
            : status === currentActivityStatus.ON_GOING
              ? 'gold'
              : status === currentActivityStatus.ENDED
                ? 'red' : ''

        return (
          <Tag color={color} key={status} style={{ fontWeight: 500 }}>
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

          {/* <Popconfirm
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
              disabled={record?.status === currentActivityStatus.PAUSED}
            />
          </Popconfirm> */}
        </Space>
      ),
    },
  ]

  const btnAddOptions = [
    {
      label: 'Thêm thủ công',
      key: 'manual',
      icon: <FormOutlined />,

    },
    {
      label: 'Nhập từ Excel',
      key: 'import-xlsx',
      icon: <FileExcelOutlined />,
    },
  ]

  const menuProps = {
    items: btnAddOptions,
    onClick: e => {
      // console.log('clicked ', e);
      // Mở dialog/drawer tương ứng
    },
  }

  return (
    <>
      <PageHeader
        title='Danh sách Hoạt động / Sự kiện'
        pageActions={
          <Space size='small'>
            <Dropdown menu={menuProps}>
              <Button type="primary" icon={<PlusOutlined />}
                size='middle' className='p-btn'
              >
                Thêm Chương trình
              </Button>
            </Dropdown>

            <Button type="default" icon={<FileExcelOutlined />}
              size='middle' className='p-btn'
            >
              Xuất Excel
            </Button>
          </Space>
        }
        pageFilters={
          <>
            {/* <ConfigProvider locale={locale}>   // ko có tác dụng */}
            <DatePicker picker="month"
              format={'MM/YYYY'} //locale={locale}
              value={dayjs(filters.month, 'YYYY/MM')}
              onChange={value => handleFilter('month', value.format('YYYY/M'))}
              allowClear={false}
              disabledDate={current => current && current > dayjs().endOf('day')}
              popupClassName='my-datepicker'
              monthCellRender={(date) => (
                <span className='my-datepicker__month-cell'>
                  Tháng {dayjs(date).format("M")}
                </span>
              )}
            // dateRender={(date) => `Tháng ${dayjs(date).format("M")}`}
            />
            {/* </ConfigProvider> */}

            <Select
              // mode='multiple'
              value={filters.status}
              onChange={value => handleFilter('status', value)}
              placeholder='Trạng thái'
              allowClear
              style={{ minWidth: 140 }}
              options={[
                ...Object.values(currentActivityStatus)?.map(item => ({
                  value: item,
                  label: item,
                }))
                // ...jobPositionOptions
                // {
                //   value: 'all',
                //   label: 'Tất cả chức danh',
                // },
                // ...Object.values(userRole)?.map(item => ({
                //   value: item,
                //   label: item,
                //   disabled: filters.status?.includes('all')
                // }))
              ]}
            />
          </>
        }
        hasPageSearch
        pageSearchProps={{
          value: searchKeyword,
          placeholder: 'Tìm theo tên chương trình',
          onChange: e => setSearchKeyword(e?.target?.value),
        }}
      />

      <div className='w-100 pt-2'>
        <Collapse
          defaultActiveKey={schools?.map(({ value }) => value)}
          className='my-collapse'
          style={{ background: 'none', border: 'none' }}
        >
          {schools?.map(({ value: schoolId, label: schoolName }) => (
            <Collapse.Panel key={schoolName} header={schoolName}
              style={{
                marginBottom: '1rem',
                background: token.colorBgTextHover,
                borderRadius: token.borderRadius,
                border: 'none',
              }}
            >
              <Spin spinning={isLoading}>
                <Table
                  columns={columns}
                  dataSource={
                    activities?.filter(activity => !activity?.schoolId || activity?.schoolId === schoolId)
                  }
                  size='small'
                  className={'w-100 my-table'}
                  pagination={{
                    size: 'default',
                    showTotal: total => `Tổng cộng ${total} dòng`,
                    onChange: _page => setPage(_page)
                  }}
                />
              </Spin>
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </>
  )
}

export default ActivityTab