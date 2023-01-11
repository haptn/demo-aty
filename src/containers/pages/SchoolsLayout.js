import React, { useMemo, useState } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { Button, Input, Popconfirm, Select, Space, Switch, Table, Tag } from 'antd'
import {
  EditOutlined, EyeOutlined, StopOutlined,
  FileExcelOutlined, PlusOutlined,
  DownOutlined, RightOutlined, MinusOutlined
} from '@ant-design/icons'
import { MainLayout, SchoolDetailDrawer, AccountDetailDrawer } from '..'
import { listAccounts, listSchools } from '../../mock/data'
import { filterSchools, schoolStatus, schoolType, staffStatus } from '../../config/constants'
import styles from '../../styles/pages/SchoolLayout.module.scss'

const { Search } = Input

function SchoolsLayout() {
  const [openSchoolDrawer, setOpenSchoolDrawer] = useState(false)
  const [openAccountDrawer, setOpenAccountDrawer] = useState(false)
  const [openPopConfirm, setOpenPopConfirm] = useState(null)

  // const [opennedSchool, setOpennedSchool] = useState(null)
  const [data, setData] = useState(listSchools || [])
  const [detailData, setDetailData] = useState(null)
  const [schoolStatuses, setSchoolStatuses] = useState(() => {
    const obj = {}
    data.forEach(({ key, status }) => {
      obj[key] = status
    })
    return obj
  })
  const [workingStatuses, setWorkingStatuses] = useState(() => {
    const obj = {}
    listAccounts.forEach(({ key, status }) => {
      obj[key] = status
    })
    return obj
  })

  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    [filterSchools.STATUS]: null,
    [filterSchools.TYPE]: []
  })
  const [expandedKeys, setExpandedKeys] = useState([])
  const expandableRows = useMemo(() => {
    let clone = [...data]
    clone = _.remove(clone,
      item => listAccounts.map(({ schoolId }) => schoolId).includes(item.key)
    )
    return clone
  }, [data])

  const handleChangeWorkingStatuses = ({ key, status }) => {
    setWorkingStatuses(prevStatus => {
      const clone = { ...prevStatus }
      clone[key] = status === staffStatus.WORKING
        ? staffStatus.QUITTED : staffStatus.WORKING
      return clone
    })
  }

  const handleCloseSchool = key => {
    setSchoolStatuses(prevStatus => {
      const clone = { ...prevStatus }
      clone[key] = schoolStatus.CLOSED
      return clone
    })
    setOpenPopConfirm(null)
  }

  const handleSearch = keyword => {
    setData(() => {
      const clone = [...listSchools]
      return clone?.filter(school =>
        school?.name?.toLowerCase()?.includes(keyword?.toLowerCase())
        ||
        school?.address?.toLowerCase()?.includes(keyword?.toLowerCase())
      )
    })
  }

  const handleFilter = (type = '', value) => {
    setFilters(prev => ({ ...prev, [type]: value }))

    switch (type) {
      case filterSchools.STATUS:
        setData(prevData => {
          console.log('__status: ', prevData);

          const clone = !value ? [...listSchools] : [...prevData]
          return clone?.filter(({ status }) => status === value)
        })
        break;

      case filterSchools.TYPE:
        setData(prevData => {
          console.log('```type: ', prevData);

          const clone = (value?.includes('all') || value?.length <= 0)
            ? [...listSchools] : [...prevData]
          return clone?.filter(({ type }) => value?.includes(type))
        })
        break;

      default:
        break;
    }
  }

  const handleViewSchoolDetail = record => {
    setOpenSchoolDrawer(true)
    setDetailData(record)
  }

  const expandedRowRender = rowData => {
    const data = listAccounts.filter(
      item => item?.schoolId === rowData?.key   // opennedSchool
    )

    const columns = [
      {
        title: '#',
        // dataIndex: 'key',
        key: 'id',
        align: 'center',
        render: (_, _data, idx) => <span>{idx + 1}</span>
      },
      {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'SĐT',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Vai trò',
        dataIndex: 'role',
        key: 'role',
        align: 'center',
        render: (_, { role }) => {
          let color = role === 'Admin trường' ? 'magenta' : 'geekblue'
          return (
            <Tag color={color} key={role}>
              {role}
            </Tag>
          )
        },
      },
      {
        title: 'Trạng thái',
        key: 'status',
        align: 'center',
        render: (_, { key, status }) => (
          <Switch
            checked={workingStatuses[key] === staffStatus.WORKING}
            onChange={() => handleChangeWorkingStatuses({ key, status })}
            checkedChildren={staffStatus.WORKING}
            unCheckedChildren={staffStatus.QUITTED}
          />
        )
        // render: (_, { status }) => {
        //   let color = status === staffStatus.WORKING ? 'green'
        //     : status === staffStatus.QUITTED ? 'grey' : 'geekblue'

        //   return (
        //     <Tag color={color} key={status}>
        //       {status}
        //     </Tag>
        //   )
        // },
      },
      {
        title: '',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        render: () => (
          <Button type="text"
            shape='circle'
            icon={<EyeOutlined style={{ color: '#1677ff' }} />}
            onClick={() => setOpenAccountDrawer(true)}
          />
        ),
      },
    ]
    return (
      <Table columns={columns} dataSource={data} size='small' pagination={false} />
    )
  }

  const columns = [
    // {
    //   title: '#',
    //   dataIndex: 'key',
    //   key: 'key',
    //   align: 'center',
    // },
    {
      title: 'Tên cơ sở',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <div>
          <a onClick={() => handleViewSchoolDetail(record)}>
            <b>{record?.name}</b>
          </a>
          <br />
          <span style={{ fontSize: '1.15rem', color: '#333' }}>
            MST: {record?.taxCode}
          </span>
        </div>
      ),
      width: '20rem'
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      width: '12rem'
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
      width: '12rem'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (_, { address }) => (
        <div className='overflow-ellipsis'>{address}</div>
      )
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      width: '12rem',
      render: (_, { key }) => {
        const status = schoolStatuses[key]
        let color = status === schoolStatus.WORKING
          ? 'green'
          : status === schoolStatus.CLOSED
            ? 'volcano' : 'blue'

        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        )
      },
    },
    {
      title: '',
      key: 'action',
      align: 'center',
      width: '12rem',
      render: (_, record) => (
        <Space size="small" align='end'>
          <Button type="text"
            shape='circle'
            icon={<EditOutlined style={{ color: '#1677ff' }} />}
            onClick={() => handleViewSchoolDetail(record)}
          />
          <Popconfirm
            title="Bạn có chắc muốn đóng cơ sở này?"
            onConfirm={() => handleCloseSchool(record?.key)}
            onCancel={() => setOpenPopConfirm(null)}
            okText="Có, đóng"
            cancelText="Không"
            open={openPopConfirm === record?.key}
            okButtonProps={{ danger: true }}
          >
            <Button type="text" danger
              shape='circle'
              icon={<StopOutlined />}
              onClick={() => setOpenPopConfirm(record?.key)}
              disabled={schoolStatuses[record?.key] === schoolStatus.CLOSED}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <MainLayout>  {/* title="Quản lý Trường & Nhân viên" */}
      <div className='w-100 flex-between'>
        <h2>Quản lý Trường & Nhân viên</h2>

        {/* Buttons */}
        <Space size='small'>
          <Button type="primary" icon={<PlusOutlined />} size='middle'
            className='p-btn'
          >
            Thêm Trường
          </Button>
          <Button type="primary" icon={<PlusOutlined />} size='middle'
            className='p-btn'
          >
            Thêm Nhân viên
          </Button>
          <Button type="default" icon={<FileExcelOutlined />} size='middle' className='p-btn'>
            Xuất file Excel
          </Button>
        </Space>
      </div>

      <div className='w-100 pt-2 flex-between'>
        {/* Filters */}
        <Space size='small'>
          <Select
            value={filters[filterSchools.STATUS]}
            onChange={value => handleFilter(filterSchools.STATUS, value)}
            placeholder='Trạng thái'
            allowClear
            style={{ width: 150 }}
            options={[
              // {
              //   value: 'all',
              //   label: 'Tất cả trạng thái',
              // },
              ...Object.values(schoolStatus)?.map(item => ({
                value: item,
                label: item,
              }))
            ]}
          />
          <Select
            mode='multiple'
            value={filters[filterSchools.TYPE]}
            onChange={value => handleFilter(filterSchools.TYPE, value)}
            placeholder='Loại'
            allowClear
            style={{ minWidth: 120 }}
            options={[
              {
                value: 'all',
                label: 'Tất cả loại',
              },
              ...Object.values(schoolType)?.map(item => ({
                value: item,
                label: item,
                disabled: filters[filterSchools.TYPE]?.includes('all')
              }))
            ]}
          />
        </Space>

        {/* Search */}
        <Search allowClear enterButton
          value={searchKeyword}
          placeholder="Tìm theo tên, SĐT, địa chỉ"
          onChange={e => setSearchKeyword(e?.target?.value)}
          onSearch={handleSearch}
          style={{ width: 250 }}
        />
      </div>

      {/* Table */}
      <div className='w-100 pt-2'>
        <Table
          columns={columns} dataSource={data}
          size='middle'
          className={clsx(styles.table, 'w-100')}
          expandable={{
            columnTitle: () => {
              return expandedKeys.length >= expandableRows.length ? (
                <Button type="text"
                  shape='circle'
                  onClick={() => setExpandedKeys([])}
                  icon={<DownOutlined style={{ fontSize: '1rem', color: '#1677ff' }} />}
                />
              )
                : expandedKeys.length > 0 ? (
                  <Button type="text"
                    shape='circle'
                    onClick={() => setExpandedKeys([])}
                    icon={<MinusOutlined style={{ fontSize: '1rem', color: '#1677ff' }} />}
                  />
                ) : ( // expandedKeys.length <= 0
                  <Button type="text"
                    shape='circle'
                    onClick={() => setExpandedKeys([...expandableRows.map(item => item?.key)])}
                    icon={<RightOutlined style={{ fontSize: '1rem', color: '#1677ff' }} />}
                  />
                )
            },
            expandedRowKeys: expandedKeys,
            rowExpandable: record => listAccounts.map(item => item?.schoolId).includes(record?.key),
            expandedRowRender,
            expandIcon: ({ expanded, onExpand, record }) => {
              if (listAccounts
                .filter(item => item?.schoolId === record?.key)
                .length <= 0
              )
                return <></>

              return expanded ? (
                <Button type="text"
                  shape='circle'
                  onClick={e => onExpand(record, e)}
                  icon={<DownOutlined style={{ fontSize: '1rem', color: '#1677ff' }} />}
                />
              ) : (
                <Button type="text"
                  shape='circle'
                  onClick={e => onExpand(record, e)}
                  icon={<RightOutlined style={{ fontSize: '1rem', color: '#1677ff' }} />}
                />
              )
            },
            onExpand: (expanded, record) => {
              // setOpennedSchool(key)
              setExpandedKeys(prevList => {
                let clone = [...prevList]

                if (expanded && !clone.includes(record.key))
                  clone.push(record.key)
                else if (!expanded)
                  _.pull(clone, record.key)

                return clone
              })
            },
          }}
        />
      </div>

      {openSchoolDrawer && (
        <SchoolDetailDrawer {...{
          open: openSchoolDrawer,
          setOpen: setOpenSchoolDrawer,
          data: detailData
        }} />
      )}
      {openAccountDrawer && (
        <AccountDetailDrawer {...{
          open: openAccountDrawer,
          setOpen: setOpenAccountDrawer
        }} />
      )}
    </MainLayout>
  )
}

export default SchoolsLayout