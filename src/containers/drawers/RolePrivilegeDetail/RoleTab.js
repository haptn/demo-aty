import React, { useState } from 'react'
import { Checkbox, Col, Form, Input, Row, Spin, Table, Tag } from 'antd'
import { useListAccounts } from '../../../services/accountServices'
import { userRole } from '../../../config/constants'
import { useListSchools } from '../../../services/schoolServices'

function RoleTab({ data }) {
  return (
    <Form layout='vertical'>
      <Row gutter={[20, 0]}>
        <Col span={7}>
          <Form.Item label="Mã vai trò" required>
            <Input className='w-100' defaultValue={data?.id} />
          </Form.Item>
        </Col>
        <Col span={17}>
          <Form.Item label="Tên vai trò" required>
            <Input className='w-100' defaultValue={data?.name} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Mô tả">
            <Input className='w-100' defaultValue={data?.description} />
          </Form.Item>
        </Col>

        {/* List user accounts */}
        <Col span={24}>
          <p className='pb-1'>Chọn người dùng</p>
          <TableAccounts currentRole={data?.name} />
        </Col>
      </Row>
    </Form>
  )
}

export default RoleTab

const TableAccounts = ({ currentRole = '' }) => {
  const { data: schools = [] } = useListSchools(undefined,
    { isCustom: true, isAllSchools: true }
  )
  const { data: accounts = [], isLoading } = useListAccounts()
  const data = accounts?.map((item, idx) => ({
    key: idx,
    ...item
  }))

  const [selectedRowKeys, setSelectedRowKeys] = useState(
    data?.filter(({ role }) => role === currentRole)?.map(({ key }) => key)
    ?? []
  )

  const columns = [
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        let color = record?.role === userRole.SCHOOL_ADMIN
          ? 'volcano' : record?.role === userRole.ADMIN
            ? 'magenta' : 'geekblue'
        return (
          <>
            <span style={{ fontWeight: 500 }}>{record?.name}</span>
            <br />
            <Tag color={color} key={record?.role} className='mt-1'>
              <span style={{ fontWeight: 500 }}>{record?.role}</span>
            </Tag>
          </>
        )
      },
      // width: '20rem'
    },
    {
      title: 'TT Liên lạc',
      dataIndex: 'contact',
      key: 'contact',
      // width: '12rem',
      render: (_, { email, phone }) => (
        <>
          <span>{phone}</span>
          <br />
          <span>{email}</span>
        </>
      )
    },
    {
      title: 'Cơ sở',
      dataIndex: 'school',
      key: 'school',
      // width: '12rem',
      render: (_, { schoolId }) => (
        <span style={{ fontWeight: 500, color: '#444' }}>
          {schools?.find(({ value }) => value === schoolId)?.label ?? '-'}
        </span>
      )
    },
  ]

  const handleSelect = (record, selected) => {
    if (selected) {
      setSelectedRowKeys((keys) => [...keys, record.key])
    } else {
      setSelectedRowKeys((keys) => {
        const index = keys.indexOf(record.key)
        return [...keys.slice(0, index), ...keys.slice(index + 1)]
      })
    }
  }

  const toggleSelectAll = () => {
    setSelectedRowKeys((keys) =>
      keys.length === data.length ? [] : data.map((r) => r.key)
    )
  }

  const headerCheckbox = (
    <Checkbox
      checked={selectedRowKeys.length === data.length}
      indeterminate={
        selectedRowKeys.length > 0 && selectedRowKeys.length < data.length
      }
      onChange={toggleSelectAll}
    />
  )

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    type: 'checkbox',
    // fixed: true,   // haven't known what's this for
    selectedRowKeys,
    onSelect: handleSelect,
    columnTitle: headerCheckbox,

    // These 2 properties below are from Antd's docs
    // onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
    // },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User',
    //   // Column configuration not to be checked
    //   name: record.name,
    // }),
  }

  return (
    <Spin spinning={isLoading}>
      <Table
        columns={columns}
        dataSource={data}
        bordered size='small'
        rowSelection={rowSelection}
        // scroll={{ x: 'calc(100rem + 50%)' }}
        className={'w-100 my-table'}
        pagination={{
          // hideOnSinglePage: true,
          size: 'medium',
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"]
        }}
      />
    </Spin>
  )
}

// Reference of table with checkbox:
// https://stackoverflow.com/questions/63019597/can-one-control-the-state-of-antd-tables-check-all-control