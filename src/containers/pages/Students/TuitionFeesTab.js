import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import {
  Button, Dropdown, Space, Tooltip, Segmented
} from 'antd'
import {
  FormOutlined, FileExcelOutlined, PlusOutlined, EyeOutlined,
} from '@ant-design/icons'

import { useListSchools } from '../../../services/schoolServices'
import { useListCurrentCourses } from '../../../services/courseServices'
import { useListStudents } from '../../../services/studentServices'
import { useListCompletedTuitionFees } from '../../../services/tuitorFeeServices'
import { PageHeader } from '../../../components'
import { AccountDetailDrawer } from '../..'
import CollapsibleList from './components/CollapsibleList'
import { formatMoney } from '../../../utils/format'
import { currentCourseStatus } from '../../../config/constants'

function TuitionFeesTab() {
  const [detailData, setDetailData] = useState(null)

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    viewBy: 'Cơ sở'  // ['Cơ sở', 'Chương trình']  ||  [schools | courses]
    // status: null,
    // school: [],
  })
  const [page, setPage] = useState(1)

  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)

  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })
  const { data: courses = [] } = useListCurrentCourses(undefined,
    { customFields: ['name', 'status'] }
  )
  const { data: students = [] } = useListStudents()
  const { data: tuitorFees = [], isLoading } = useListCompletedTuitionFees(params)

  const sortedCoursesByTotalStudents = useMemo(() => {
    let clone = courses.map(course => {
      const listStudents = students?.filter(student => student?.classId?.includes(course?.name)) || []

      return ({
        ...course,
        totalStudents: listStudents?.length
      })
    })

    const statusOrder = [
      currentCourseStatus.ENROLLING,
      currentCourseStatus.ON_GOING,
      currentCourseStatus.COMING_SOON,
      currentCourseStatus.ENDED,
      currentCourseStatus.CANCELLED
    ]

    return _.orderBy(clone, ['totalStudents'], ['desc'])
      .sort((a, b) => statusOrder.indexOf(a?.status) - statusOrder.indexOf(b?.status))
  }, [JSON.stringify(courses), students])

  const sortedSchoolsByTotalStudents = useMemo(() => {
    let clone = schools.map(({ label: name, value: id }) => {
      const listStudents = students?.filter(student => student?.schoolId === id) || []

      return ({
        id, name,
        totalStudents: listStudents?.length
      })
    })

    return _.orderBy(clone, ['totalStudents'], ['desc'])
  }, [schools, students])

  useEffect(() => {
    // Update params
    let params = {}

    if (searchKeyword) {
      if (searchKeyword.startsWith('HP_'))
        params.id_like = searchKeyword
      else
        params.studentName_like = searchKeyword
    }

    setParams(params)
  }, [searchKeyword]) // filters

  const handleFilter = (type, value) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const handleViewDetail = record => {
    setDetailData(record)
    setOpenDetailDrawer(true)
  }

  const handleClickBtnAddMenu = e => {
    // console.log('clicked ', e);
    // Mở dialog/drawer tương ứng
  }

  // const getOtherFeesColumns = () => {

  // }

  // const getColumns = schoolId => {
  //   let columns = [
  //     {
  //       title: '#',
  //       dataIndex: 'id',
  //       key: 'id',
  //       align: 'center',
  //       width: 45,
  //       fixed: 'left',
  //       render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>,
  //     },
  //     {
  //       title: 'Mã HĐ',   // mã hóa đơn
  //       dataIndex: 'id',
  //       key: 'id',
  //       width: 90,
  //       fixed: 'left',
  //       render: (_, record) => (
  //         <a onClick={() => handleViewDetail(record)}>
  //           <b>{record?.id}</b>
  //         </a>
  //       )
  //     },
  //     {
  //       title: <div style={{ textAlign: 'center' }}>Tên Học viên</div>,
  //       dataIndex: 'studentName',
  //       key: 'studentName',
  //       fixed: 'left',
  //       width: 160,
  //       render: (value) => <p style={{ fontWeight: 500 }}>{value}</p>,
  //     },
  //     {
  //       title: <div style={{ textAlign: 'center' }}>Tên khóa học</div>,
  //       dataIndex: 'className',
  //       key: 'className',
  //       // fixed: 'left',
  //       width: 250,
  //       render: value => ['3', '4'].includes(schoolId)
  //         ? value   // trường phổ thông
  //         : value?.substring(0, value?.lastIndexOf('-'))
  //     },
  //     {
  //       title: <div style={{ textAlign: 'center' }}>Học phí</div>,
  //       dataIndex: 'tuitionFee',
  //       key: 'tuitionFee',
  //       // fixed: 'left',
  //       align: 'right',
  //       width: 120,
  //       render: value => (
  //         <span style={{ fontWeight: 500, background: 'lightyellow' }}>
  //           {formatMoney(value)}
  //         </span>
  //       )
  //     },
  //     {
  //       title: 'Các khoản phí khác',
  //       children: [
  //         {
  //           title: <div style={{ textAlign: 'center' }}>Đồng phục</div>,
  //           dataIndex: 'uniformFee',
  //           key: 'uniformFee',
  //           align: 'right',
  //           width: 105,
  //           render: (value) => value ? formatMoney(value) : '-',
  //           // fixed: 'left',
  //           // width: 180,
  //           // render: (_, { uniformFee, documentsFee, flightFee }) => (
  //           //   <>
  //           //     {!!uniformFee && (
  //           //       <div className='flex flex-between'>
  //           //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
  //           //           Đồng phục:
  //           //         </p>
  //           //         <span>{formatMoney(uniformFee)}</span>
  //           //       </div>
  //           //     )}
  //           //     {!!documentsFee && (
  //           //       <div className='flex flex-between'>
  //           //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
  //           //           Học liệu:
  //           //         </p>
  //           //         <span>{formatMoney(documentsFee)}</span>
  //           //       </div>
  //           //     )}
  //           //     {!!flightFee && (
  //           //       <div className='flex flex-between'>
  //           //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
  //           //           Vé máy bay:
  //           //         </p>
  //           //         <span>{formatMoney(flightFee)}</span>
  //           //       </div>
  //           //     )}
  //           //   </>
  //           // )
  //         },
  //         {
  //           title: <div style={{ textAlign: 'center' }}>Học liệu</div>,
  //           dataIndex: 'documentsFee',
  //           key: 'documentsFee',
  //           // fixed: 'left',
  //           align: 'right',
  //           width: 105,
  //           render: (value) => value ? formatMoney(value) : '-',
  //         },
  //         {
  //           title: <div style={{ textAlign: 'center' }}>Vé máy bay</div>,
  //           dataIndex: 'flightFee',
  //           key: 'flightFee',
  //           // fixed: 'left',
  //           align: 'right',
  //           width: 105,
  //           render: (value) => value ? formatMoney(value) : '-',
  //         },
  //       ]
  //     },
  //     {
  //       title: <div style={{ textAlign: 'center' }}>Người đóng HP</div>,
  //       dataIndex: 'paidBy',
  //       key: 'paidBy',
  //       // fixed: 'left',
  //       width: 150,
  //     },
  //     {
  //       title: <div style={{ textAlign: 'center' }}>Người nhận</div>,
  //       dataIndex: 'receivedBy',
  //       key: 'receivedBy',
  //       // fixed: 'left',
  //       width: 120,
  //     },
  //     {
  //       title: <div style={{ textAlign: 'center' }}>Ngày nhận</div>,
  //       dataIndex: 'receivedAt',
  //       key: 'receivedAt',
  //       width: 150,
  //     },
  //     // {
  //     //   title: 'Trạng thái',
  //     //   key: 'status',
  //     //   dataIndex: 'status',
  //     //   align: 'center',
  //     //   // width: '12rem',
  //     //   render: (_, { id, status }) => (
  //     //     <Switch
  //     //       // checked={workingStatuses[id] === staffStatus.WORKING}
  //     //       checked={status === staffStatus.WORKING}
  //     //       onChange={newStatus => handleChangeWorkingStatuses(id, newStatus)}
  //     //       checkedChildren={staffStatus.WORKING}
  //     //       unCheckedChildren={staffStatus.QUITTED}
  //     //     />
  //     //   ),
  //     // },
  //     {
  //       title: '',
  //       key: 'action',
  //       width: 60,
  //       align: 'center',
  //       // fixed: 'right',
  //       render: (_, record) => (
  //         <Space size="small" >
  //           <Tooltip title="Chi tiết">
  //             <Button type="text"
  //               shape='circle'
  //               icon={<EyeOutlined style={{ color: '#1677ff' }} />}
  //               onClick={() => handleViewDetail(record)}
  //             />
  //           </Tooltip>
  //         </Space>
  //       ),
  //     },
  //   ]

  //   if (['3', '4'].includes(schoolId)) {
  //     let otherFees = columns?.find(
  //       ({ title }) => title === 'Các khoản phí khác')?.children

  //     otherFees = otherFees.splice(2, 0,
  //       {
  //         title: (
  //           <div style={{ textAlign: 'center' }}>
  //             Bán trú / <br />Nội trú
  //           </div>
  //         ),
  //         dataIndex: 'boardingFee',
  //         key: 'boardingFee',
  //         // fixed: 'left',
  //         align: 'right',
  //         width: 105,
  //         render: (value) => value ? formatMoney(value) : '-',
  //       },
  //       {
  //         title: <div style={{ textAlign: 'center' }}>Bảo hiểm</div>,
  //         dataIndex: 'insuranceFee',
  //         key: 'insuranceFee',
  //         // fixed: 'left',
  //         align: 'right',
  //         width: 105,
  //         render: (value) => value ? formatMoney(value) : '-',
  //       }
  //     )

  //     const temp = []
  //     columns = columns?.map(column => {
  //       if (column?.title === 'Các khoản phí khác')
  //         temp.push(otherFees)
  //       else
  //         temp.push(column)
  //     })
  //   }

  //   return columns
  // }

  // const columnsViewBySchools = [
  //   {
  //     title: '#',
  //     dataIndex: 'id',
  //     key: 'id',
  //     align: 'center',
  //     width: 45,
  //     fixed: 'left',
  //     render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>,
  //   },
  //   {
  //     title: 'Mã HĐ',   // mã hóa đơn
  //     dataIndex: 'id',
  //     key: 'id',
  //     width: 90,
  //     fixed: 'left',
  //     render: (_, record) => (
  //       <a onClick={() => handleViewDetail(record)}>
  //         <b>{record?.id}</b>
  //       </a>
  //     )
  //   },
  //   {
  //     title: <div style={{ textAlign: 'center' }}>Tên Học viên</div>,
  //     dataIndex: 'studentName',
  //     key: 'studentName',
  //     fixed: 'left',
  //     width: 160,
  //     render: (value) => <p style={{ fontWeight: 500 }}>{value}</p>,
  //   },
  //   {
  //     title: <div style={{ textAlign: 'center' }}>Tên khóa học</div>,
  //     dataIndex: 'className',
  //     key: 'className',
  //     // fixed: 'left',
  //     width: 250,
  //     render: value => value?.substring(0, value?.lastIndexOf('-'))
  //   },
  //   {
  //     title: <div style={{ textAlign: 'center' }}>Học phí</div>,
  //     dataIndex: 'tuitionFee',
  //     key: 'tuitionFee',
  //     // fixed: 'left',
  //     align: 'right',
  //     width: 120,
  //     render: value => (
  //       <span style={{ fontWeight: 500, background: 'lightyellow' }}>
  //         {formatMoney(value)}
  //       </span>
  //     )
  //   },
  //   {
  //     title: 'Các khoản phí khác',
  //     children: [
  //       {
  //         title: <div style={{ textAlign: 'center' }}>Đồng phục</div>,
  //         dataIndex: 'uniformFee',
  //         key: 'uniformFee',
  //         align: 'right',
  //         width: 105,
  //         render: (value) => value ? formatMoney(value) : '-',
  //         // fixed: 'left',
  //         // width: 180,
  //         // render: (_, { uniformFee, documentsFee, flightFee }) => (
  //         //   <>
  //         //     {!!uniformFee && (
  //         //       <div className='flex flex-between'>
  //         //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
  //         //           Đồng phục:
  //         //         </p>
  //         //         <span>{formatMoney(uniformFee)}</span>
  //         //       </div>
  //         //     )}
  //         //     {!!documentsFee && (
  //         //       <div className='flex flex-between'>
  //         //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
  //         //           Học liệu:
  //         //         </p>
  //         //         <span>{formatMoney(documentsFee)}</span>
  //         //       </div>
  //         //     )}
  //         //     {!!flightFee && (
  //         //       <div className='flex flex-between'>
  //         //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
  //         //           Vé máy bay:
  //         //         </p>
  //         //         <span>{formatMoney(flightFee)}</span>
  //         //       </div>
  //         //     )}
  //         //   </>
  //         // )
  //       },
  //       {
  //         title: <div style={{ textAlign: 'center' }}>Học liệu</div>,
  //         dataIndex: 'documentsFee',
  //         key: 'documentsFee',
  //         // fixed: 'left',
  //         align: 'right',
  //         width: 105,
  //         render: (value) => value ? formatMoney(value) : '-',
  //       },
  //       {
  //         title: <div style={{ textAlign: 'center' }}>Vé máy bay</div>,
  //         dataIndex: 'flightFee',
  //         key: 'flightFee',
  //         // fixed: 'left',
  //         align: 'right',
  //         width: 105,
  //         render: (value) => value ? formatMoney(value) : '-',
  //       },
  //     ]
  //   },
  //   {
  //     title: <div style={{ textAlign: 'center' }}>Người đóng HP</div>,
  //     dataIndex: 'paidBy',
  //     key: 'paidBy',
  //     // fixed: 'left',
  //     width: 150,
  //   },
  //   {
  //     title: <div style={{ textAlign: 'center' }}>Người nhận</div>,
  //     dataIndex: 'receivedBy',
  //     key: 'receivedBy',
  //     // fixed: 'left',
  //     width: 120,
  //   },
  //   {
  //     title: <div style={{ textAlign: 'center' }}>Ngày nhận</div>,
  //     dataIndex: 'receivedAt',
  //     key: 'receivedAt',
  //     width: 150,
  //   },
  //   // {
  //   //   title: 'Trạng thái',
  //   //   key: 'status',
  //   //   dataIndex: 'status',
  //   //   align: 'center',
  //   //   // width: '12rem',
  //   //   render: (_, { id, status }) => (
  //   //     <Switch
  //   //       // checked={workingStatuses[id] === staffStatus.WORKING}
  //   //       checked={status === staffStatus.WORKING}
  //   //       onChange={newStatus => handleChangeWorkingStatuses(id, newStatus)}
  //   //       checkedChildren={staffStatus.WORKING}
  //   //       unCheckedChildren={staffStatus.QUITTED}
  //   //     />
  //   //   ),
  //   // },
  //   {
  //     title: '',
  //     key: 'action',
  //     width: 60,
  //     align: 'center',
  //     // fixed: 'right',
  //     render: (_, record) => (
  //       <Space size="small" >
  //         <Tooltip title="Chi tiết">
  //           <Button type="text"
  //             shape='circle'
  //             icon={<EyeOutlined style={{ color: '#1677ff' }} />}
  //             onClick={() => handleViewDetail(record)}
  //           />
  //         </Tooltip>
  //       </Space>
  //     ),
  //   },
  // ]

  // const columnsViewByCourses = [

  // ]

  let columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 45,
      fixed: 'left',
      render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>,
    },
    {
      title: 'Mã HĐ',   // mã hóa đơn
      dataIndex: 'id',
      key: 'id',
      width: 90,
      fixed: 'left',
      render: (_, record) => (
        <a onClick={() => handleViewDetail(record)}>
          <b>{record?.id}</b>
        </a>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tên Học viên</div>,
      dataIndex: 'studentName',
      key: 'studentName',
      fixed: 'left',
      width: 160,
      render: (value) => <p style={{ fontWeight: 500 }}>{value}</p>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tên khóa học</div>,
      dataIndex: 'className',
      key: 'className',
      // fixed: 'left',
      width: 270,
      // render: (value, { schoolId }) =>
      //   ['3', '4'].includes(schoolId)   // trường phổ thông
      //     ? value : value?.substring(0, value?.lastIndexOf('-'))
    },
    {
      title: <div style={{ textAlign: 'center' }}>Học phí</div>,
      dataIndex: 'tuitionFee',
      key: 'tuitionFee',
      // fixed: 'left',
      align: 'right',
      width: 120,
      render: value => (
        <span style={{ fontWeight: 500, background: 'lightyellow' }}>
          {value ? formatMoney(value) : '-'}
        </span>
      )
    },
    {
      title: 'Các khoản phí khác',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Đồng phục</div>,
          dataIndex: 'uniformFee',
          key: 'uniformFee',
          align: 'right',
          width: 105,
          render: (value) => value ? formatMoney(value) : '-',
          // fixed: 'left',
          // width: 180,
          // render: (_, { uniformFee, documentsFee, flightFee }) => (
          //   <>
          //     {!!uniformFee && (
          //       <div className='flex flex-between'>
          //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
          //           Đồng phục:
          //         </p>
          //         <span>{formatMoney(uniformFee)}</span>
          //       </div>
          //     )}
          //     {!!documentsFee && (
          //       <div className='flex flex-between'>
          //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
          //           Học liệu:
          //         </p>
          //         <span>{formatMoney(documentsFee)}</span>
          //       </div>
          //     )}
          //     {!!flightFee && (
          //       <div className='flex flex-between'>
          //         <p style={{ width: 'max-content', marginRight: '1rem' }}>
          //           Vé máy bay:
          //         </p>
          //         <span>{formatMoney(flightFee)}</span>
          //       </div>
          //     )}
          //   </>
          // )
        },
        {
          title: <div style={{ textAlign: 'center' }}>Học liệu</div>,
          dataIndex: 'documentsFee',
          key: 'documentsFee',
          // fixed: 'left',
          align: 'right',
          width: 105,
          render: (value) => value ? formatMoney(value) : '-',
        },
        {
          title: <div style={{ textAlign: 'center' }}>Vé máy bay</div>,
          dataIndex: 'flightFee',
          key: 'flightFee',
          // fixed: 'left',
          align: 'right',
          width: 105,
          render: (value) => value ? formatMoney(value) : '-',
        },
        {
          title: (
            <div style={{ textAlign: 'center' }}>
              Bán trú / <br />Nội trú
            </div>
          ),
          dataIndex: 'boardingFee',
          key: 'boardingFee',
          // fixed: 'left',
          align: 'right',
          width: 105,
          render: (value) => value ? formatMoney(value) : '-',
        },
        {
          title: <div style={{ textAlign: 'center' }}>Bảo hiểm</div>,
          dataIndex: 'insuranceFee',
          key: 'insuranceFee',
          // fixed: 'left',
          align: 'right',
          width: 105,
          render: (value) => value ? formatMoney(value) : '-',
        }
      ]
    },
    {
      title: <div style={{ textAlign: 'center' }}>Người đóng HP</div>,
      dataIndex: 'paidBy',
      key: 'paidBy',
      // fixed: 'left',
      width: 150,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Người nhận</div>,
      dataIndex: 'receivedBy',
      key: 'receivedBy',
      // fixed: 'left',
      width: 120,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Ngày nhận</div>,
      dataIndex: 'receivedAt',
      key: 'receivedAt',
      width: 150,
    },
    // {
    //   title: 'Trạng thái',
    //   key: 'status',
    //   dataIndex: 'status',
    //   align: 'center',
    //   // width: '12rem',
    //   render: (_, { id, status }) => (
    //     <Switch
    //       // checked={workingStatuses[id] === staffStatus.WORKING}
    //       checked={status === staffStatus.WORKING}
    //       onChange={newStatus => handleChangeWorkingStatuses(id, newStatus)}
    //       checkedChildren={staffStatus.WORKING}
    //       unCheckedChildren={staffStatus.QUITTED}
    //     />
    //   ),
    // },
    {
      title: '',
      key: 'action',
      width: 60,
      align: 'center',
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
    onClick: handleClickBtnAddMenu,
  }

  return (
    <>
      <PageHeader
        title="Học phí"
        pageActions={
          <Space size='small'>
            <Dropdown menu={menuProps}>
              <Button type="primary" icon={<PlusOutlined />}
                size='middle' className='p-btn'
              >
                Thêm phiếu thu học phí
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
            <span style={{ fontWeight: 500 }}>Phân theo:</span>
            <Segmented
              options={['Cơ sở', 'Chương trình']}
              value={filters.viewBy}
              onChange={value => handleFilter('viewBy', value)}
            />

            {/* <Space size='small'>
              <span style={{ fontWeight: 500 }}>Lọc theo:</span>
              <Segmented
                options={['', '']}
                value={filters.viewBy}
                onChange={value => handleFilter('viewBy', value)}
              />
            </Space> */}

            {/* <Select
              value={filters.status}
              onChange={value => handleFilter('status', value)}
              placeholder='Trạng thái'
              allowClear
              style={{ width: 120 }}
              options={[
                ...Object.values(staffStatus)?.map(item => ({
                  value: item,
                  label: item,
                }))
              ]}
            /> */}
            {/* <Select
              mode='multiple'
              value={filters.jobPosition}
              onChange={value => handleFilter('jobPosition', value)}
              placeholder='Chương trình'
              allowClear
              style={{ minWidth: 150 }}
              options={[
                // ...jobPositionOptions
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
            /> */}
          </>
        }
        hasPageSearch
        pageSearchProps={{
          value: searchKeyword,
          placeholder: 'Tìm theo tên HV, mã HĐ',
          onChange: e => setSearchKeyword(e?.target?.value),
        }}
      />

      {/* Có 3-4 blocks thống kê nhanh số HV đã/chưa hoàn thành HP, tổng số khóa học,... */}
      {/* <PageQuickStats {...{
        listStats: [
          {
            label: '',
            value: 0,
            bgColor: ''
          }
        ]
      }} /> */}

      <div className='w-100 pt-2'>
        {filters.viewBy === 'Cơ sở' ? (
          <CollapsibleList {...{
            defaultActiveKeys: schools?.map(({ value }) => value),
            parentList: sortedSchoolsByTotalStudents,
            tableProps: {
              // columns: columnsViewBySchools,
              columns, // getColumns,
              setPage, isLoading,
              getData: schoolId => tuitorFees?.filter(
                tuitorFee => tuitorFee?.schoolId === schoolId
              )
            }
          }} />
        ) : (
          <CollapsibleList {...{
            defaultActiveKeys: courses?.map(({ name }) => name),
            parentList: sortedCoursesByTotalStudents,
            tableProps: {
              // columns: columnsViewByCourses,
              columns, // getColumns,
              setPage, isLoading,
              getData: courseName => tuitorFees?.filter(
                tuitorFee => tuitorFee?.className?.includes(courseName)
              )
            }
          }} />
        )}
      </div>

      {openDetailDrawer && (
        <AccountDetailDrawer {...{
          data: detailData,
          open: openDetailDrawer,
          setOpen: setOpenDetailDrawer
        }} />
      )}
    </>
  )
}

export default TuitionFeesTab