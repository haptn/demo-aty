import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Button, Col, Collapse, DatePicker, Dropdown, Row, Select, Space, Spin, Table, Tag, theme, Tooltip } from 'antd'
import {
  UploadOutlined, FileExcelOutlined,
  FormOutlined, FileAddOutlined, FileSearchOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

import { taxPeriod, taxStatus } from '../../../config/constants'
import { useListSchools } from '../../../services/schoolServices'
import { useListTaxes } from '../../../services/taxServices'
import { PageHeader } from '../../../components'
import IncomingTaxes from './IncomingTaxes'

function DeclarationTab(props) {
  const { setDetailData, setOpenDetailDrawer } = props   // from SalaryPage
  const { token } = theme.useToken()

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    schools: [],
    status: null,
    months: [dayjs().subtract(1, 'month').format('YYYY/M'), dayjs().format('YYYY/M')],
  })
  const [page, setPage] = useState(1)

  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })
  const { data: taxDeclarations = [], isLoading } = useListTaxes(params)
  const listPeriods = Object.values(taxPeriod)?.map(period => `Tờ khai ${period?.split('Theo ')?.join('')}`)

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

    setParams(params)
  }, [searchKeyword, filters])

  const handleFilter = (type = '', value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleViewDetail = record => {
    setDetailData(prev => ({ ...prev, salary: record }))
    setOpenDetailDrawer(prev => ({ ...prev, salary: true }))
  }

  const colSpan0 = ({ isGroupName }) => ({
    colSpan: isGroupName ? 0 : 1,
  })

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>Kỳ kê khai</div>,
      dataIndex: 'period',
      key: 'period',
      render: (period, record) => record?.isGroupName
        ? <span style={{ fontWeight: 500, marginLeft: '0.5rem' }}>{period}</span>
        : (
          <a style={{ marginLeft: '2rem' }}
            onClick={() => handleViewDetail(record)}
          >
            {period}
          </a>
        ),
      onCell: ({ isGroupName }) => ({
        colSpan: isGroupName ? 5 : 1,
      })
    },
    {
      title: <div style={{ textAlign: 'center' }}>Loại tờ khai</div>,
      dataIndex: 'declarationType',
      key: 'declarationType',
      // width: '23%',
      onCell: colSpan0,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Ngày chỉnh sửa</div>,
      dataIndex: 'updatedDate',
      key: 'updatedDate',
      // width: '23%',
      onCell: colSpan0,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Ngày nộp</div>,
      dataIndex: 'submitedDate',
      key: 'submitedDate',
      // width: '23%',
      onCell: colSpan0,
    },
    // {
    //   title: 'Ngày giờ',
    //   children: [
    //     {
    //       title: <div style={{ textAlign: 'center' }}>Phát động</div>,
    //       dataIndex: 'announcementDate',
    //       key: 'announcementDate',
    //       width: '12rem',
    //       align: 'right',
    //     },
    //     {
    //       title: <div style={{ textAlign: 'center' }}>Bắt đầu</div>,
    //       dataIndex: 'startDate',
    //       key: 'startDate',
    //       width: '12rem',
    //       align: 'right',
    //     },
    //     {
    //       title: <div style={{ textAlign: 'center' }}>Kết thúc</div>,
    //       dataIndex: 'endDate',
    //       key: 'endDate',
    //       width: '12rem',
    //       align: 'right',
    //     }
    //   ]
    // },
    {
      title: <div style={{ textAlign: 'center' }}>Trạng thái</div>,
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      // width: '12rem',
      render: (status) => {
        let color = status === taxStatus.SUBMITTED
          ? 'green' : 'blue'

        return (
          <Tag color={color} key={status} style={{ fontWeight: 500 }}>
            {status}
          </Tag>
        )
      },
      onCell: colSpan0,
    },
    {
      title: '',
      key: 'action',
      align: 'center',
      width: '15rem',
      render: (_, { status }) => status === taxStatus.NOT_SUBMITTED ? (
        <Space size="small" align='end'>
          <Button type="text" icon={<UploadOutlined style={{ color: '#1677ff' }} />}>
            Nộp tờ khai
          </Button>

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
      ) : <></>,
      onCell: colSpan0,
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
        title='Danh sách tờ khai'
        pageActions={
          <Space size='small'>
            <Button type="default" icon={<FileSearchOutlined />}
              size='middle' className='p-btn'
            >
              Khai bổ sung
            </Button>

            <Dropdown menu={menuProps}>
              <Button type="primary" icon={<FileAddOutlined />}
                size='middle' className='p-btn'
              >
                Lập tờ khai
              </Button>
            </Dropdown>
          </Space>
        }
        pageFilters={
          <>
            {/* <ConfigProvider locale={locale}>   // ko có tác dụng */}
            <DatePicker.RangePicker picker="month"
              format={'MM/YYYY'} //locale={locale}
              value={[dayjs(filters.months[0], 'YYYY/MM'), dayjs(filters.months[1], 'YYYY/MM')]}
              onChange={value => handleFilter('months', value)}
              allowClear={false}
              popupClassName='my-datepicker'
              style={{ width: 180 }}
            // monthCellRender={(date) => (
            //   <span className='my-datepicker__month-cell'>
            //     Tháng {dayjs(date).format("M")}
            //   </span>
            // )}
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
                ...Object.values(taxStatus)?.map(item => ({
                  value: item,
                  label: item,
                }))
              ]}
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
          placeholder: 'Tìm theo tên chương trình',
          onChange: e => setSearchKeyword(e?.target?.value),
        }}
      />

      <div className='w-100 pt-2'>
        <Row gutter={15}>
          {/* Taxes' declaration tables */}
          <Col span={17}>
            <Collapse
              defaultActiveKey={listPeriods}
              className='my-collapse'
              style={{ background: 'none', border: 'none' }}
            >
              {listPeriods?.map(period => (
                <Collapse.Panel key={period}
                  header={<h4>{period}</h4>}
                  style={{
                    marginBottom: '1rem',
                    background: token.colorBgTextHover,
                    borderRadius: token.borderRadius,
                    border: 'none',
                  }}
                >
                  {console.log('period', period?.split('Tờ khai ').join(''), taxDeclarations)}
                  <Spin spinning={isLoading}>
                    <Table
                      columns={columns}
                      dataSource={
                        taxDeclarations?.filter(item => item?.taxPeriod === period?.split('Tờ khai ').join('Theo '))
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
          </Col>

          {/* List in-coming taxes need to submit */}
          <Col span={7}>
            <IncomingTaxes />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default DeclarationTab