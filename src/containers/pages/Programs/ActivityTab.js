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
      title: <div style={{ textAlign: 'center' }}>Ho???t ?????ng</div>,
      dataIndex: 'name',
      key: 'name',
      width: '23%',
      render: (_, { name }) => <span style={{ fontWeight: 500 }}>{name}</span>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Ph?? tham gia</div>,
      dataIndex: 'attendenceFee',
      key: 'attendenceFee',
      align: 'right',
      width: '12rem',
      render: attendenceFee => formatMoney(attendenceFee ?? 0),
      sorter: (a, b) => a?.attendenceFee - b?.attendenceFee,
    },
    {
      title: 'S??? l?????ng',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>T???i thi???u</div>,
          dataIndex: 'minParticipants',
          key: 'minParticipants',
          align: 'right',
          render: value => formatNumber(value ?? 0)
        },
        {
          title: <div style={{ textAlign: 'center' }}>T???i ??a</div>,
          dataIndex: 'maxParticipants',
          key: 'maxParticipants',
          align: 'right',
          render: value => value ? formatNumber(value) : 'Kh??ng gi???i h???n'
        },
        {
          title: <div style={{ textAlign: 'center' }}>Th???c t???</div>,
          dataIndex: 'totalParticipants',
          key: 'totalParticipants',
          align: 'right',
          render: value => value ? formatNumber(value) : ''
        }
      ]
    },
    // {
    //   title: 'Ph???m vi ??p d???ng',
    //   dataIndex: 'schoolId',
    //   key: 'schoolId',
    //   width: '15%',
    //   render: (_, { schoolId }) => {
    //     return !schoolId ? <>{'T???t c??? c?? s???'}</> : <>{schoolId}</>
    //   },
    //   // width: '12rem'
    // },
    // {
    //   title: <div style={{ textAlign: 'center' }}>M?? t???</div>,
    //   dataIndex: 'description',
    //   key: 'description',
    //   width: '15%',
    //   // width: '12rem'
    // },
    {
      title: 'Ng??y gi???',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Ph??t ?????ng</div>,
          dataIndex: 'announcementDate',
          key: 'announcementDate',
          width: '12rem',
          align: 'right',
        },
        {
          title: <div style={{ textAlign: 'center' }}>B???t ?????u</div>,
          dataIndex: 'startDate',
          key: 'startDate',
          width: '12rem',
          align: 'right',
        },
        {
          title: <div style={{ textAlign: 'center' }}>K???t th??c</div>,
          dataIndex: 'endDate',
          key: 'endDate',
          width: '12rem',
          align: 'right',
        }
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tr???ng th??i</div>,
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
          <Tooltip title="Chi ti???t">
            <Button type="text"
              shape='circle'
              icon={<EditOutlined style={{ color: '#1677ff' }} />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>

          {/* <Popconfirm
            title="B???n c?? ch???c mu???n d???ng kh??a h???c n??y?"
            onConfirm={() => handleChangeStatuses(record?.id)}
            onCancel={() => setOpenPopConfirm(null)}
            okText="C??, d???ng"
            cancelText="Kh??ng"
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
      label: 'Th??m th??? c??ng',
      key: 'manual',
      icon: <FormOutlined />,

    },
    {
      label: 'Nh???p t??? Excel',
      key: 'import-xlsx',
      icon: <FileExcelOutlined />,
    },
  ]

  const menuProps = {
    items: btnAddOptions,
    onClick: e => {
      // console.log('clicked ', e);
      // M??? dialog/drawer t????ng ???ng
    },
  }

  return (
    <>
      <PageHeader
        title='Danh s??ch Ho???t ?????ng / S??? ki???n'
        pageActions={
          <Space size='small'>
            <Dropdown menu={menuProps}>
              <Button type="primary" icon={<PlusOutlined />}
                size='middle' className='p-btn'
              >
                Th??m Ch????ng tr??nh
              </Button>
            </Dropdown>

            <Button type="default" icon={<FileExcelOutlined />}
              size='middle' className='p-btn'
            >
              Xu???t Excel
            </Button>
          </Space>
        }
        pageFilters={
          <>
            {/* <ConfigProvider locale={locale}>   // ko c?? t??c d???ng */}
            <DatePicker picker="month"
              format={'MM/YYYY'} //locale={locale}
              value={dayjs(filters.month, 'YYYY/MM')}
              onChange={value => handleFilter('month', value.format('YYYY/M'))}
              allowClear={false}
              disabledDate={current => current && current > dayjs().endOf('day')}
              popupClassName='my-datepicker'
              monthCellRender={(date) => (
                <span className='my-datepicker__month-cell'>
                  Th??ng {dayjs(date).format("M")}
                </span>
              )}
            // dateRender={(date) => `Th??ng ${dayjs(date).format("M")}`}
            />
            {/* </ConfigProvider> */}

            <Select
              // mode='multiple'
              value={filters.status}
              onChange={value => handleFilter('status', value)}
              placeholder='Tr???ng th??i'
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
                //   label: 'T???t c??? ch???c danh',
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
          placeholder: 'T??m theo t??n ch????ng tr??nh',
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
                    showTotal: total => `T???ng c???ng ${total} d??ng`,
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