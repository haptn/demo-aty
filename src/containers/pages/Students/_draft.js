import React, { useEffect, useMemo, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import _ from 'lodash'
import {
  Button, Collapse, Dropdown, Select, Space, Spin,
  Switch, Table, Tooltip, theme
} from 'antd'
import {
  FormOutlined, FileExcelOutlined, PlusOutlined, EditOutlined,
} from '@ant-design/icons'

import { filterAccounts, staffStatus } from '../../../config/constants'
import { useListSchools } from '../../../services/schoolServices'
import { useListStaffs, useMutationUpdateStaff } from '../../../services/staffServices'
import { AccountDetailDrawer } from '../..'
import { PageHeader } from '../../../components'

function TuitionFeesTab() {
  const { token } = theme.useToken()

  const [detailData, setDetailData] = useState(null)

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    status: null,
    jobPosition: [],
    // school: [],
  })
  const [page, setPage] = useState(1)

  const [openDetailDrawer, setOpenDetailDrawer] = useState(false)

  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })

  // const customListStaffs = (data = []) => {
  //   let newList = []
  //   const listStaffsBySchools = _.groupBy(data, 'schoolId')

  //   for (const [schoolId, listStaffsOfSchool] of Object.entries(listStaffsBySchools)) {
  //     newList = [
  //       ...newList,
  //       {
  //         id: schoolId,
  //         name: schools?.find(({ value }) => value === schoolId)?.label,
  //         type: 'school',
  //       },
  //       ...listStaffsOfSchool
  //     ]
  //   }
  //   return newList
  // }

  const queryClient = useQueryClient()
  const { data: staffs = [], isLoading } = useListStaffs(params,
    // { customSuccessData: customListStaffs }
  )
  const { data: allStaffs = [] } = useListStaffs()
  const staffMutation = useMutationUpdateStaff()
  const jobPositionOptions = useMemo(() => {
    let listJobPositions = _.map(allStaffs, ({ jobPosition }) => jobPosition)
    listJobPositions = _.uniq(listJobPositions).map(job => ({
      value: job,
      label: job,
    }))

    return listJobPositions
  }, [allStaffs])

  // const listStaffs = useMemo(() => {
  //   let newList = []
  //   const listStaffsBySchools = _.groupBy(staffs, 'schoolId')

  //   for (const [schoolId, listStaffsOfSchool] of Object.entries(listStaffsBySchools)) {
  //     newList = [
  //       ...newList,
  //       {
  //         id: schoolId,
  //         schoolName: schools?.find(({ value }) => value === schoolId)?.label,
  //         type: 'school',
  //       },
  //       ...listStaffsOfSchool
  //     ]
  //   }
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
      //   params.jobPosition = [...jobPositionOptions]
    }

    if (filters[filterAccounts.SCHOOL]?.length > 0) {
      if (!filters[filterAccounts.SCHOOL]?.includes('all'))
        params.schoolId = filters[filterAccounts.SCHOOL]
      else
        params.schoolId = [...schools]?.map(({ value }) => value)
    }

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

  const handleChangeWorkingStatuses = async (id, newStatus) => {
    const toastId = toast.loading("Loading...")

    try {
      await staffMutation.mutateAsync(
        {
          id,
          data: {
            status: newStatus ? staffStatus.WORKING : staffStatus.QUITTED
          }
        },
        {
          onSuccess: () => {
            return queryClient.invalidateQueries(['staffs', { ...params }])
          },
        }
      )
      toast.success(
        'C???p nh???t tr???ng th??i th??nh c??ng!',
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
            <h4>C???p nh???t tr???ng th??i th???t b???i!</h4>
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

  const handleClickBtnAddMenu = e => {
    // console.log('clicked ', e);
    // M??? dialog/drawer t????ng ???ng
  }

  const sharedOnCell = ({ type }) => type === 'school' ? { colSpan: 0 } : {}

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      // width: 40,
      // fixed: 'left',
      render: (id, { type }) => (!type || type !== 'school') ? id : '',
      // render: (_, _data, idx) => <span>{(page - 1) * 10 + idx + 1}</span>,
    },
    {
      title: 'M?? NV',
      dataIndex: 'staffId',
      key: 'staffId',
      // width: '6%',
      // fixed: 'left',
      // align: 'center',
      render: (_, { type, staffId, schoolName }) => (
        type === 'school' ? <b>{schoolName}</b> : staffId
      ),
      onCell: ({ type }) => type === 'school' ? { colSpan: 5 } : {}
    },
    {
      title: <div style={{ textAlign: 'center' }}>H??? t??n</div>,
      dataIndex: 'name',
      key: 'name',
      // fixed: 'left',
      // width: 200,
      render: (_, record) => {
        return (
          <div>
            <a onClick={() => handleViewDetail(record)}>
              <b>{record?.name}</b>
            </a>
            <br />
            <p>
              <i style={{ color: '#888', fontSize: '1.2rem' }}>Email: </i>
              {record?.email}
            </p>
            <p>
              <i style={{ color: '#888', fontSize: '1.2rem' }}>S??T: </i>
              {record?.phone}
            </p>
          </div>
        )
      },
      onCell: sharedOnCell
    },
    {
      title: 'MST',
      dataIndex: 'taxCode',
      key: 'taxCode',
      align: 'center',
      // width: 115,
      onCell: sharedOnCell
    },
    {
      title: <div style={{ textAlign: 'center' }}>Ch???c danh</div>,
      dataIndex: 'jobPosition',
      key: 'jobPosition',
      // width: 110
    },
    // {
    //   title: 'C?? s???',
    //   dataIndex: 'school',
    //   key: 'school',
    //   // width: '12rem',
    //   render: (_, { schoolId }) => (
    //     <span style={{ fontWeight: 500, color: '#444' }}>
    //       {schools?.find(({ value }) => value === schoolId)?.label ?? '-'}
    //     </span>
    //   ),
    //   onCell: sharedOnCell
    // },
    {
      title: 'Tr???ng th??i',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      // width: '12rem',
      render: (_, { id, status }) => (
        <Switch
          // checked={workingStatuses[id] === staffStatus.WORKING}
          checked={status === staffStatus.WORKING}
          onChange={newStatus => handleChangeWorkingStatuses(id, newStatus)}
          checkedChildren={staffStatus.WORKING}
          unCheckedChildren={staffStatus.QUITTED}
        />
      ),
      onCell: sharedOnCell
    },
    {
      title: '',
      key: 'action',
      // width: 80,
      align: 'center',
      // fixed: 'right',
      render: (_, record) => (
        <Space size="small" >
          <Tooltip title="Chi ti???t">
            <Button type="text"
              shape='circle'
              icon={<EditOutlined style={{ color: '#1677ff' }} />}
              onClick={() => handleViewDetail(record)}
            />
          </Tooltip>
        </Space>
      ),
      onCell: sharedOnCell
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
    onClick: handleClickBtnAddMenu,
  }

  return (
    <>
      <PageHeader
        title="H???c ph??"
        pageActions={
          <Space size='small'>
            <Button type="primary" icon={<PlusOutlined />}
              size='middle' className='p-btn'
            >
              Th??m
            </Button>

            <Button type="default" icon={<FileExcelOutlined />}
              size='middle' className='p-btn'
            >
              Xu???t Excel
            </Button>
          </Space>
        }
        pageFilters={
          <>
            <Select
              value={filters.status}
              onChange={value => handleFilter('status', value)}
              placeholder='Tr???ng th??i'
              allowClear
              style={{ width: 120 }}
              options={[
                ...Object.values(staffStatus)?.map(item => ({
                  value: item,
                  label: item,
                }))
              ]}
            />
            <Select
              mode='multiple'
              value={filters.jobPosition}
              onChange={value => handleFilter('jobPosition', value)}
              placeholder='Ch???c danh'
              allowClear
              style={{ minWidth: 150 }}
              options={[
                ...jobPositionOptions
                // {
                //   value: 'all',
                //   label: 'T???t c??? ch???c danh',
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
              value={filters[filterAccounts.SCHOOL]}
              onChange={value => handleFilter(filterAccounts.SCHOOL, value)}
              placeholder='C?? s???'
              allowClear
              style={{ minWidth: 180 }}
              options={[
                {
                  value: 'all',
                  label: 'T???t c??? c?? s???',
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
          placeholder: 'T??m theo t??n, S??T, ?????a ch???',
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
                  dataSource={staffs?.filter(staff => staff?.schoolId === schoolId)}
                  size='small'  // bordered
                  className={'w-100 my-table'}
                  scroll={{ y: 560 }}
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