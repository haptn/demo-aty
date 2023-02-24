import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { Button, Collapse, DatePicker, Select, Space, Spin, Table, theme, Tooltip } from 'antd'
import {
  EyeOutlined, FileExcelOutlined,
  MailOutlined, PrinterOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'
// import 'dayjs/locale/vi'
// import locale from 'antd/es/date-picker/locale/vi_VN'

import { formatMoney } from '../../../utils/format'
import { useListSchools } from '../../../services/schoolServices'
import { PageHeader } from '../../../components'

function AccountingTab(props) {
  const { setDetailData, setOpenDetailDrawer } = props   // from SalaryPage
  const { token } = theme.useToken()

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    fromTime: null,
    toMonth: null,
    // status: null,
    // jobPosition: [],
    // school: [],
  })
  const [page, setPage] = useState(1)
  const [month, setMonth] = useState([dayjs().format('YYYY/M'), dayjs().format('YYYY/M')])
  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })

  const data = [
    {
      id: '1',
      schoolId: '1',
      name: 'Hạch toán chi phí lương tháng 1/2023',
      total: 1234000000
    },
    {
      id: '2',
      schoolId: '1',
      name: 'Hạch toán chi phí lương tháng 2/2023',
      total: 987000000
    },
    {
      id: '3',
      schoolId: '3',
      name: 'Hạch toán chi phí lương tháng 1/2023',
      total: 1111000000
    },
    {
      id: '4',
      schoolId: '3',
      name: 'Hạch toán chi phí lương tháng 2/2023',
      total: 1345000000
    },
    {
      id: '5',
      schoolId: '4',
      name: 'Hạch toán chi phí lương tháng 1/2023',
      total: 1234000000
    },
    {
      id: '6',
      schoolId: '4',
      name: 'Hạch toán chi phí lương tháng 2/2023',
      total: 1456000000
    },
  ]

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

  // Currently, I can only search by name or phone. Maybe in the future, I will enhance to be able to search by email 
  const handleFilter = (type = '', value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleViewDetail = record => {
    setDetailData(prev => ({ ...prev, accounting: record }))
    setOpenDetailDrawer(prev => ({ ...prev, accounting: true }))
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      // width: 40,
      render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>
    },
    {
      title: <div style={{ textAlign: 'center' }}>Diễn giải</div>,
      dataIndex: 'name',
      key: 'name',
      // width: 200,
      render: (_, record) => {
        return (
          <a onClick={() => handleViewDetail(record)}>
            <b>{record?.name}</b>
          </a>
        )
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tổng chi phí</div>,
      dataIndex: 'total',
      key: 'total',
      // width: 110,
      align: 'right',
      render: (_, { total }) => formatMoney(total),
    },
    {
      title: '',
      key: 'action',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <Space size="small" >
          <Tooltip title="Chi tiết">
            <Button type="text"
              shape='circle'
              icon={<EyeOutlined style={{ color: '#1677ff' }} />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>

          <Tooltip title="In phiếu lương">
            <Button type="text"
              shape='circle'
              icon={<PrinterOutlined />}  //  style={{ color: '#1677ff' }}
              onClick={() => { }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title={`Hạch toán chi phí lương`}
        pageActions={
          <Space size='small'>
            {/* <Button type="primary" icon={<MailOutlined />}
              size='middle' className='p-btn'
            >
              Hạch toán lương
            </Button> */}

            {/* nên thêm cái dialog/popconfirm confirm gửi mail cho [số] người (mail, shortName, name,...)  */}
            <Button type="primary" icon={<MailOutlined />}
              size='middle' className='p-btn'
            >
              Gửi mail phiếu lương
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
            {/* <ConfigProvider locale={locale}>   // ko có tác dụng */}
            <DatePicker.RangePicker picker="month"
              format={'MM/YYYY'} //locale={locale}
              value={[dayjs(month[0], 'YYYY/MM'), dayjs(month[1], 'YYYY/MM')]}
              onChange={value => setMonth([value[0].format('YYYY/M'), value[1].format('YYYY/M')])}
              allowClear={false}
              popupClassName='my-datepicker'
            // disabledDate={current => current && current > dayjs().endOf('day')}
            // Để custom sang tiếng Việt nó đang bị mất 1 số cái CSS nên giờ đang tạm comment lại
            // monthCellRender={(date) => (
            //   <span className='my-datepicker__month-cell'>
            //     Tháng {dayjs(date).format("M")}
            //   </span>
            // )}
            // dateRender={(date) => `Tháng ${dayjs(date).format("M")}`}
            />
            {/* </ConfigProvider> */}

            {/* <Select
              mode='multiple'
              value={filters.jobPosition}
              onChange={value => handleFilter('jobPosition', value)}
              placeholder='Chức danh'
              allowClear
              style={{ minWidth: 140 }}
              options={[
                ...jobPositionOptions
                // {
                //   value: 'all',
                //   label: 'Tất cả chức danh',
                // },
                // ...Object.values(userRole)?.map(item => ({
                //   value: item,
                //   label: item,
                //   disabled: filters.jobPosition?.includes('all')
                // }))
              ]}
            /> */}
            {/* <Select
              mode='multiple'
              value={filters.school}
              onChange={value => handleFilter('school', value)}
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
                  disabled: filters.school?.includes('all')
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
      />

      <div className='w-100 pt-2'>
        <Collapse
          defaultActiveKey={schools?.map(({ value }) => value)}
          className='my-collapse'
          style={{ background: 'none', border: 'none' }}
        >
          {schools?.map(({ label: schoolName, value: schoolId }) => (
            <Collapse.Panel key={schoolId} header={schoolName}
              style={{
                marginBottom: '1rem',
                background: token.colorBgTextHover,
                borderRadius: token.borderRadius,
                border: 'none',
              }}
            >
              {/* <Spin spinning={isLoading}> */}
              <Table
                columns={columns}
                dataSource={data?.filter(record => record?.schoolId === schoolId)
                  // staffs?.filter(staff =>
                  //   staff?.schoolId === schoolId && staff.status === staffStatus.WORKING
                  // )
                }
                bordered size='small'
                className={'w-100 mb-1 my-table'}
                pagination={{
                  size: 'default',
                  showTotal: total => `Tổng cộng ${total} dòng`,
                  onChange: _page => setPage(_page),
                  hideOnSinglePage: true
                }}
                summary={pageData => {
                  let totalExpense = 0

                  pageData.forEach(({ total }) => {
                    totalExpense += total
                  });

                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row
                        style={{
                          textAlign: 'right',
                          fontWeight: 700,
                          background: token.colorBgTextHover
                        }}
                      >
                        <Table.Summary.Cell colSpan={2} index={0}>
                          Tổng
                        </Table.Summary.Cell>
                        {/* <Table.Summary.Cell /> */}
                        <Table.Summary.Cell>{formatMoney(totalExpense)}</Table.Summary.Cell>
                        <Table.Summary.Cell />
                      </Table.Summary.Row>
                    </Table.Summary>
                  )
                }}
                style={{ marginBottom: '30px' }}
              />
              {/* </Spin> */}
            </Collapse.Panel>
          ))}
        </Collapse>
      </div>
    </>
  )
}

export default AccountingTab