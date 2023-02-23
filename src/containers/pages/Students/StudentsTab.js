import React, { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import {
  Button, Dropdown, Space, Tooltip, Radio, Segmented
} from 'antd'
import {
  FormOutlined, FileExcelOutlined, PlusOutlined, EditOutlined,
} from '@ant-design/icons'

import { useListSchools } from '../../../services/schoolServices'
import { useListCourses } from '../../../services/courseServices'
import { useListStudents } from '../../../services/studentServices'
import { PageHeader } from '../../../components'
import { AccountDetailDrawer } from '../..'
import CollapsibleList from './components/CollapsibleList'

function StudentsTab() {
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
  const { data: courses = [] } = useListCourses(undefined, { customField: 'name' })
  const { data: students = [], isLoading } = useListStudents(params,
    // { customSuccessData: customListStaffs }
  )
  const sortedCoursesByTotalStudents = useMemo(() => {
    let clone = courses.map(course => {
      const listStudents = students?.filter(student => student?.classId?.includes(course)) || []

      return ({
        name: course,
        totalStudents: listStudents?.length
      })
    })

    return _.orderBy(clone, ['totalStudents'], ['desc'])
  }, [courses, students])

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
      if (searchKeyword.startsWith('0'))
        params.phone_like = searchKeyword
      else
        params.name_like = searchKeyword
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

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 60,
      // fixed: 'left',
      // render: (id, { type }) => (!type || type !== 'school') ? id : '',
      render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>,
    },
    // {
    //   title: 'Mã HV',
    //   dataIndex: 'staffId',
    //   key: 'staffId',
    //   // width: '6%',
    //   // fixed: 'left',
    //   // align: 'center',
    //   render: (_, { type, staffId, schoolName }) => (
    //     type === 'school' ? <b>{schoolName}</b> : staffId
    //   ),
    //   onCell: ({ type }) => type === 'school' ? { colSpan: 5 } : {}
    // },
    {
      title: 'Thông tin Học viên',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Họ tên</div>,
          dataIndex: 'name',
          key: 'name',
          // fixed: 'left',
          width: 180,
          render: (_, record) => {
            return (
              <div>
                <a onClick={() => handleViewDetail(record)}>
                  <b>{record?.name}</b>
                </a>
                <p>
                  <i style={{ color: '#888', fontSize: '1.2rem' }}>Nickname: </i>
                  {record?.nickName || '-'}
                </p>
              </div>
            )
          },
        },
        {
          title: 'TT liên lạc',
          dataIndex: 'nickname',
          key: 'nickname',
          width: 240,
          // fixed: 'left',
          render: (_, record) => {
            return (
              <>
                <p>
                  <i style={{ color: '#888', fontSize: '1.2rem' }}>Email: </i>
                  {record?.email || '-'}
                </p>
                <p>
                  <i style={{ color: '#888', fontSize: '1.2rem' }}>SĐT: </i>
                  {record?.phone || '-'}
                </p>
              </>
            )
          }
        },
        {
          title: 'Ngày sinh',
          dataIndex: 'dob',
          key: 'dob',
          width: 120,
          // fixed: 'left',
        },
      ]
    },
    {
      title: 'Thông tin Phụ huynh',
      children: [
        {
          title: <div style={{ textAlign: 'center' }}>Họ tên</div>,
          dataIndex: 'name',
          key: 'name',
          // fixed: 'left',
          width: 180,
          render: (_, { parent }) => <p style={{ fontWeight: 500 }}>{parent?.name}</p>,
        },
        {
          title: 'TT liên lạc',
          dataIndex: 'nickname',
          key: 'nickname',
          width: 240,
          // fixed: 'left',
          render: (_, { parent }) => {
            return (
              <>
                <p>
                  <i style={{ color: '#888', fontSize: '1.2rem' }}>Email: </i>
                  {parent?.email || '-'}
                </p>
                <p>
                  <i style={{ color: '#888', fontSize: '1.2rem' }}>SĐT: </i>
                  {parent?.phone || '-'}
                </p>
              </>
            )
          }
        },
      ]
    },
    // {
    //   title: 'Cơ sở',
    //   dataIndex: 'school',
    //   key: 'school',
    //   // width: '12rem',
    //   render: (_, { schoolId }) => (
    //     <span style={{ fontWeight: 500, color: '#444' }}>
    //       {schools?.find(({ value }) => value === schoolId)?.label ?? '-'}
    //     </span>
    //   ),
    // },
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
      // fixed: 'right',
      render: (_, record) => (
        <Space size="small" >
          <Tooltip title="Chi tiết">
            <Button type="text"
              shape='circle'
              icon={<EditOutlined style={{ color: '#1677ff' }} />}
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
        title="Danh sách Học viên"
        pageActions={
          <Space size='small'>
            <Dropdown menu={menuProps}>
              <Button type="primary" icon={<PlusOutlined />}
                size='middle' className='p-btn'
              >
                Thêm Học viên
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
            {/* <Radio.Group
              value={filters.viewBy} onChange={e => handleFilter('viewBy', e.target.value)}
              defaultValue='schools' // buttonStyle="solid"
            >
              <Radio.Button value="schools">Cơ sở</Radio.Button>
              <Radio.Button value="courses">Chương trình</Radio.Button>
            </Radio.Group> */}

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
          placeholder: 'Tìm theo tên, SĐT, địa chỉ',
          onChange: e => setSearchKeyword(e?.target?.value),
        }}
      />

      <div className='w-100 pt-2'>
        {/* {filters.viewBy === 'schools' ? (   // used for Radio */}
        {filters.viewBy === 'Cơ sở' ? (         // used for Segmented
          <CollapsibleList {...{
            defaultActiveKeys: schools?.map(({ value }) => value),
            parentList: sortedSchoolsByTotalStudents,
            tableProps: {
              columns, setPage, isLoading,
              getData: schoolId => students?.filter(
                student => student?.schoolId === schoolId
              )
            }
          }} />
        ) : (
          <CollapsibleList {...{
            defaultActiveKeys: courses,
            parentList: sortedCoursesByTotalStudents,
            tableProps: {
              columns, setPage, isLoading,
              getData: courseName => students?.filter(
                student => student?.classId?.includes(courseName)
              )
            },
            getFilters: currentCourse => {
              let filters = []

              students
                ?.filter(student => student?.classId?.includes(currentCourse))
                ?.forEach(({ classId }) => {
                  // Chỗ này phải là "classId?.split('-')?.length === 3" do tui đang để theo format:
                  // className = [schoolId]-[courseName]-[index]
                  // => Nếu > 3 tức là trong "courseName" có dấu "-" (case khóa "Siêu Trí tuệ Teen-Kid")
                  let courseName = classId?.split('-')?.length === 3 ? (classId?.split('-')?.[1] ?? '') : ''
                  courseName = courseName?.replace(currentCourse, '')?.trim()

                  if (courseName && !filters?.includes(courseName))
                    filters.push(courseName)
                })
              return filters?.length > 0 ? filters : null
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

export default StudentsTab