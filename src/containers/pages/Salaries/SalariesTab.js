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
import { staffStatus } from '../../../config/constants'
import { useListSchools } from '../../../services/schoolServices'
import { useListStaffs, useMutationUpdateStaff } from '../../../services/staffServices'
import { PageHeader } from '../../../components'

function SalariesTab(props) {
  const { setDetailData, setOpenDetailDrawer } = props   // from SalaryPageLayout
  const { token } = theme.useToken()

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    status: null,
    jobPosition: [],
    // school: [],
  })
  const [page, setPage] = useState(1)

  const { data: staffs = [], isLoading } = useListStaffs(params)
  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })

  const { data: allStaffs = [] } = useListStaffs()
  const jobPositionOptions = useMemo(() => {
    let listJobPositions = _.map(allStaffs, ({ jobPosition }) => jobPosition)
    listJobPositions = _.uniq(listJobPositions).map(job => ({
      value: job,
      label: job,
    }))

    return listJobPositions
  }, [allStaffs])

  const [month, setMonth] = useState(dayjs().format('YYYY/M'))

  // const listStaffs = useMemo(() => {
  //   let newList = []

  //   // Cách 1: (tự làm tuần tự qua 2 bước)
  //   // let listStaffsBySchools = _.filter(staffs, ({ status }) => status === staffStatus.WORKING)
  //   // listStaffsBySchools = _.groupBy(listStaffsBySchools, 'schoolId')

  //   // Cách 2: (dùng chain() trong Lodash)
  //   const listStaffsBySchools = _.chain(staffs)
  //     .filter(({ status }) => status === staffStatus.WORKING)
  //     .groupBy('schoolId').value()

  //   _.values(listStaffsBySchools).forEach(listStaffsOfSchool => {
  //     newList.push(listStaffsOfSchool)
  //   });
  //   // for (const listStaffsOfSchool of listStaffsBySchools) {
  //   //   newList = [
  //   //     ...newList,
  //   //     ...listStaffsOfSchool
  //   //   ]
  //   // }
  //   return newList
  //   // return customListStaffs(staffs)
  // }, [staffs])

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
    setDetailData(prev => ({ ...prev, salary: record }))
    setOpenDetailDrawer(prev => ({ ...prev, salary: true }))
  }

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 40,
      fixed: 'left',
      render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>
    },
    // {
    //   title: 'Mã NV',
    //   dataIndex: 'staffId',
    //   key: 'staffId',
    //   width: '6%',
    //   // align: 'center',
    // },
    {
      title: 'Thông tin nhân viên',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Họ tên</div>,
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
          width: 200,
          render: (_, record) => {
            return (
              <div>
                <a onClick={() => handleViewDetail(record)}>
                  <b>{record?.name}</b>
                </a>
                <br />
                <p>
                  <i style={{ color: '#888', fontSize: '1.2rem' }}>Mã NV: </i>
                  {record?.staffId}
                </p>
                <p>
                  <i style={{ color: '#888', fontSize: '1.2rem' }}>Email: </i>
                  {record?.email}
                </p>
              </div>
            )
          },
        },
        {
          title: <div style={{ textAlign: 'center' }}>Chức danh</div>,
          dataIndex: 'jobPosition',
          key: 'jobPosition',
          width: 110,
          fixed: 'left',
        },
      ],
    },
    {
      title: <div style={{ textAlign: 'center' }}>MST</div>,
      dataIndex: 'taxCode',
      key: 'taxCode',
      align: 'center',
      width: 115,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Lương cơ bản</div>,
      dataIndex: 'basicSalary',
      key: 'basicSalary',
      align: 'right',
      width: 120,
      render: (_, { basicSalary }) => (
        <span style={{ fontWeight: 500 }}>
          {formatMoney(+basicSalary)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Hệ số lương</div>,
      dataIndex: 'salaryLevel',
      key: 'salaryLevel',
      width: 60,
      align: 'right',
    },
    {
      title: <div style={{ textAlign: 'center' }}>Thưởng /<br /> Phụ cấp</div>,
      dataIndex: 'bonus, allowance',
      key: 'bonus, allowance',
      width: 110,
      align: 'right',
      render: (_, { bonus, allowance }) => formatMoney(+bonus + +allowance),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Phụ cấp khác</div>,
      dataIndex: 'otherAllowance',
      key: 'otherAllowance',
      width: 110,
      align: 'right',
      render: (_, { otherAllowance }) => formatMoney(+otherAllowance)
    },
    {
      title: <div style={{ textAlign: 'center' }}>Lương Gross</div>,
      dataIndex: 'gross-salary',
      key: 'gross-salary',
      width: 120,
      align: 'right',
      render: (_, { basicSalary, bonus, allowance, otherAllowance }) => (
        <span style={{ fontWeight: 500, background: 'lightyellow' }}>
          {formatMoney(+basicSalary + +bonus + +allowance + +otherAllowance)}
        </span>
      ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Lương đóng BH</div>,
      dataIndex: 'insuranceSalary',
      key: 'insuranceSalary',
      width: 120,
      align: 'right',
      render: (_, { insuranceSalary }) => formatMoney(+insuranceSalary),
    },
    {
      title: 'Các khoản khấu trừ',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>BHXH</div>,
          dataIndex: 'bhxh',
          key: 'bhxh',
          width: 110,
          align: 'right',
          render: (_, { bhxh }) => formatMoney(+bhxh),
        },
        {
          title: <div style={{ textAlign: 'center' }}>BHYT</div>,
          dataIndex: 'bhyt',
          key: 'bhyt',
          width: 105,
          align: 'right',
          render: (_, { bhyt }) => formatMoney(+bhyt),
        },
        {
          title: <div style={{ textAlign: 'center' }}>BHTN</div>,
          dataIndex: 'bhtn',
          key: 'bhtn',
          width: 105,
          align: 'right',
          render: (_, { bhtn }) => formatMoney(+bhtn),
        },
        // {
        //   title: <div style={{ textAlign: 'center' }}>KPCĐ</div>,
        //   dataIndex: 'unionFee',
        //   key: 'unionFee',
        //   width: 105,
        //   align: 'right',
        //   render: (_, { unionFee }) => formatMoney(+unionFee),
        // },
        {
          title: <div style={{ textAlign: 'center' }}>Thuế TNCN</div>,
          dataIndex: 'taxTNCN',
          key: 'taxTNCN',
          width: 110,
          align: 'right',
          render: (_, { taxTNCN }) => formatMoney(+taxTNCN),
        },
        {
          title: <div style={{ textAlign: 'center' }}>Cộng</div>,
          dataIndex: 'total-insurances',
          key: 'total-insurances',
          width: 120,
          align: 'right',
          render: (_, { bhxh, bhyt, bhtn, taxTNCN }) => (
            <span style={{ fontWeight: 500, background: '#EAEAEA' }}>
              {formatMoney(+bhxh + +bhyt + +bhtn + +taxTNCN)}
            </span>
          ),
        },
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Giảm trừ <br /> gia cảnh</div>,
      dataIndex: 'familyReduction',
      key: 'familyReduction',
      width: 120,
      align: 'right',
      render: (_, { familyReduction }) => formatMoney(+familyReduction),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tổng thu nhập chịu thuế TNCN</div>,
      dataIndex: 'taxableIncome',
      key: 'taxableIncome',
      width: 120,
      align: 'right',
      render: (_, { taxableIncome }) => formatMoney(+taxableIncome),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Thu nhập tính thuế TNCN</div>,
      dataIndex: 'assessableIncome',
      key: 'assessableIncome',
      width: 120,
      align: 'right',
      render: (_, { assessableIncome }) => formatMoney(+assessableIncome),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Lương Net <br /> (Thực lãnh)</div>,
      dataIndex: 'netSalary',
      key: 'netSalary',
      width: 120,
      align: 'right',
      render: (_, { netSalary }) => (
        <span style={{ fontWeight: 500, background: 'lightyellow' }}>
          {formatMoney(+netSalary)}
        </span>
      )
    },
    {
      title: 'Bảo hiểm, KPCĐ công ty đóng',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>BHXH</div>,
          dataIndex: 'bhxhATY',
          key: 'bhxhATY',
          width: 110,
          align: 'right',
          render: (_, { bhxhATY }) => formatMoney(+bhxhATY),
        },
        {
          title: <div style={{ textAlign: 'center' }}>BHYT</div>,
          dataIndex: 'bhytATY',
          key: 'bhytATY',
          width: 105,
          align: 'right',
          render: (_, { bhytATY }) => formatMoney(+bhytATY),
        },
        {
          title: <div style={{ textAlign: 'center' }}>BHTN</div>,
          dataIndex: 'bhtnATY',
          key: 'bhtnATY',
          width: 105,
          align: 'right',
          render: (_, { bhtnATY }) => formatMoney(+bhtnATY),
        },
        {
          title: <div style={{ textAlign: 'center' }}>KPCĐ</div>,
          dataIndex: 'unionFee',
          key: 'unionFee',
          width: 105,
          align: 'right',
          render: (_, { unionFee }) => formatMoney(+unionFee),
        },
        // {
        //   title: <div style={{ textAlign: 'center' }}>Tổng</div>,
        //   dataIndex: 'total-aty',
        //   key: 'total-aty',
        //   width: 105,
        //   align: 'right',
        //   render: (_, { bhxhATY, bhytATY, bhtnATY, unionFee }) => (
        //     <span style={{ fontWeight: 500, background: '#F0F0F0' }}>
        //       {formatMoney(+bhxhATY + +bhytATY + +bhtnATY + +unionFee)}
        //     </span>
        //   ),
        // },
      ]
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      width: 80,
      fixed: 'right',
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
        title={`Bảng lương tháng ${month?.split('/')[1]} năm ${month?.split('/')[0]}`}
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
            <DatePicker picker="month"
              format={'MM/YYYY'} //locale={locale}
              value={dayjs(month, 'YYYY/MM')}
              onChange={value => setMonth(value.format('YYYY/M'))}
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
            />
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
              <Spin spinning={isLoading}>
                <Table
                  columns={columns}
                  dataSource={
                    staffs?.filter(staff =>
                      staff?.schoolId === schoolId && staff.status === staffStatus.WORKING
                    )
                  }
                  bordered size='small'
                  scroll={{ x: 'calc(100rem + 50%)', y: 575 }}
                  // scroll={{ x: 1500, y: 620 }}
                  className={'w-100 my-table'}
                  pagination={{
                    size: 'default',
                    showTotal: total => `Tổng cộng ${total} dòng`,
                    onChange: _page => setPage(_page)
                  }}
                  summary={pageData => {
                    let totalBasicSalary = 0
                    let totalBonusAllowance = 0
                    let totalOtherAllowance = 0

                    let totalGrossSalary = 0
                    let totalInsuranceSalary = 0
                    let totalNetSalary = 0

                    let total_BHXH = 0
                    let total_BHYT = 0
                    let total_BHTN = 0
                    let totalTaxTNCN = 0
                    let totalDeductions = 0  // bhxh + bhyt + bhtn + taxTNCN

                    let total_BHXH_ATY = 0
                    let total_BHYT_ATY = 0
                    let total_BHTN_ATY = 0
                    // let total_BH_ATY = 0  // bhxhATY + bhytATY + bhtnATY
                    let totalUnionFee = 0

                    let totalFamilyReduction = 0
                    let totalTaxableIncome = 0
                    let totalAssessableIncome = 0

                    pageData.forEach(rowData => {
                      // const { basicSalary, bonus, allowance, otherAllowance, insuranceSalary, bhxh, bhyt, bhtn, } = rowData
                      totalBasicSalary += +rowData?.basicSalary
                      totalBonusAllowance += (+rowData?.bonus + +rowData?.allowance)
                      totalOtherAllowance += +rowData?.otherAllowance

                      totalInsuranceSalary += +rowData?.insuranceSalary
                      totalNetSalary += +rowData?.netSalary

                      total_BHXH += +rowData?.bhxh
                      total_BHYT += +rowData?.bhyt
                      total_BHTN += +rowData?.bhtn
                      totalTaxTNCN += +rowData?.taxTNCN

                      total_BHXH_ATY += +rowData?.bhxhATY
                      total_BHYT_ATY += +rowData?.bhytATY
                      total_BHTN_ATY += +rowData?.bhtnATY
                      totalUnionFee += +rowData?.unionFee

                      totalFamilyReduction += +rowData?.familyReduction
                      totalTaxableIncome += +rowData?.taxableIncome
                      totalAssessableIncome += +rowData?.assessableIncome
                    });

                    totalDeductions += total_BHXH + total_BHYT + total_BHTN + totalTaxTNCN
                    totalGrossSalary += totalBasicSalary + totalBonusAllowance + totalOtherAllowance

                    return (
                      <Table.Summary fixed>
                        <Table.Summary.Row
                          style={{
                            textAlign: 'right',
                            fontWeight: 700,
                            background: token.colorBgTextHover
                          }}
                        >
                          <Table.Summary.Cell colSpan={3} index={0}>
                            Tổng
                          </Table.Summary.Cell>
                          <Table.Summary.Cell />
                          <Table.Summary.Cell>{formatMoney(totalBasicSalary)}</Table.Summary.Cell>
                          <Table.Summary.Cell />
                          <Table.Summary.Cell>{formatMoney(totalBonusAllowance)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalOtherAllowance)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalGrossSalary)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalInsuranceSalary)}</Table.Summary.Cell>

                          <Table.Summary.Cell>{formatMoney(total_BHXH)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(total_BHYT)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(total_BHTN)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalTaxTNCN)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalDeductions)}</Table.Summary.Cell>

                          <Table.Summary.Cell>{formatMoney(totalFamilyReduction)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalTaxableIncome)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalAssessableIncome)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalNetSalary)}</Table.Summary.Cell>

                          <Table.Summary.Cell>{formatMoney(total_BHXH_ATY)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(total_BHYT_ATY)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(total_BHTN_ATY)}</Table.Summary.Cell>
                          <Table.Summary.Cell>{formatMoney(totalUnionFee)}</Table.Summary.Cell>
                        </Table.Summary.Row>
                      </Table.Summary>
                    )
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

export default SalariesTab