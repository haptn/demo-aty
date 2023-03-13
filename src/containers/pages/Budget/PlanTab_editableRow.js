import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { toast } from 'react-toastify'
import { Button, DatePicker, Dropdown, Form, Input, InputNumber, Popconfirm, Select, Space, Spin, Table, Typography, theme } from 'antd'
import {
  DeleteOutlined, FileExcelOutlined, FormOutlined, FileAddOutlined
} from '@ant-design/icons'
import dayjs from 'dayjs'

import { taxStatus } from '../../../config/constants'
import { useListSchools } from '../../../services/schoolServices'
import { useListBudgetPlan } from '../../../services/budgetServices'
import { PageHeader } from '../../../components'
import { formatMoney } from '../../../utils/format'

function PlanTab() {
  const [form] = Form.useForm()

  const [params, setParams] = useState(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filters, setFilters] = useState({
    schools: [],
    year: dayjs().format('YYYY'),
  })
  const [page, setPage] = useState(1)
  const [openPopConfirm, setOpenPopConfirm] = useState(null)

  const { data: schools = [] } = useListSchools(undefined, { isCustom: true })
  const { data: budgetPlan = [], isLoading } = useListBudgetPlan(params)

  const [data, setData] = useState(budgetPlan)
  const [editingKey, setEditingKey] = useState('')
  const isEditing = record => record?.key === editingKey

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

  const handleChangeStatuses = (id) => {
    const toastId = toast.loading("Loading...")

    // Call API mutationBudgetPlan

    toast.update(toastId, {
      render: "Bỏ tiêu chí thành công!",
      type: "success",
      isLoading: false,
      autoClose: 1500
    })
  }

  const edit = record => {
    form.setFieldsValue({
      ...record,
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
      // ...record,   // sao lại spread ở cuối nhỉ?
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (id) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => id === item.id)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: <div style={{ textAlign: 'center' }}>Tên chỉ tiêu</div>,
      dataIndex: 'criteria',
      key: 'criteria',
      width: 340,
      fixed: 'left',
      editable: false,
      render: (criteria, { level }) => (
        <p style={{
          fontWeight: level === 4 ? 400 : 500,
          marginLeft: level === 4 ? '2.4rem' : level === 3 ? '1.2rem' : 0
        }}>
          {criteria}
        </p>
      ),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tổng cộng</div>,
      dataIndex: 'total',
      key: 'total',
      fixed: 'left',
      width: 105,
      align: 'right',
      render: value => (
        <span style={{ fontWeight: 500, background: 'lightyellow' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 1</div>,
      dataIndex: 'jan',
      key: 'jan',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 2</div>,
      dataIndex: 'feb',
      key: 'feb',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 3</div>,
      dataIndex: 'mar',
      key: 'mar',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 4</div>,
      dataIndex: 'apr',
      key: 'apr',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 5</div>,
      dataIndex: 'may',
      key: 'may',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 6</div>,
      dataIndex: 'jun',
      key: 'jun',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 7</div>,
      dataIndex: 'jul',
      key: 'jul',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 8</div>,
      dataIndex: 'aug',
      key: 'aug',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 9</div>,
      dataIndex: 'sep',
      key: 'sep',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 10</div>,
      dataIndex: 'oct',
      key: 'oct',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 11</div>,
      dataIndex: 'nov',
      key: 'nov',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tháng 12</div>,
      dataIndex: 'dec',
      key: 'dec',
      width: 105,
      align: 'right',
      editable: true,
      render: value => value >= 0 ? formatMoney(value) : (
        <span style={{ color: '#ff4d4f' }}>
          {formatMoney(value)}
        </span>
      )
    },
    {
      title: '',
      key: 'action',
      dataIndex: 'action',
      align: 'right',
      width: 48,
      fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        const EditActions = editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        )

        return (
          <Space size="small" align='end'>
            <EditActions />

            <Popconfirm
              title="Bạn có chắc muốn bỏ tiêu chí này?"
              onConfirm={() => handleChangeStatuses(record?.id)}
              onCancel={() => setOpenPopConfirm(null)}
              okText="Có"
              cancelText="Không"
              open={openPopConfirm === record?.id}
              okButtonProps={{ danger: true }}
            >
              <Button type="text" danger
                shape='circle'
                icon={<DeleteOutlined />}
                onClick={() => setOpenPopConfirm(record?.id)}
              />
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'number',
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  })

  const btnAddOptions = [
    {
      label: 'Chỉ tiêu doanh thu',
      key: 'revenue',
      icon: <FormOutlined />,
    },
    {
      label: 'Chỉ tiêu chi phí',
      key: 'cost',
      icon: <FormOutlined />,
    },
    {
      label: 'Chỉ tiêu lợi nhuận',
      key: 'profit',
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
      // console.log('clicked ', e)
      // Mở dialog/drawer tương ứng
    },
  }

  return (
    <>
      <PageHeader
        title={`Kế hoạch ngân sách năm ${filters.year}`}
        pageActions={
          <Space size='small'>
            <Button type="default" icon={<FileExcelOutlined />}
              size='middle' className='p-btn'
            >
              Xuất Excel
            </Button>

            <Dropdown menu={menuProps}>
              <Button type="primary" icon={<FileAddOutlined />}
                size='middle' className='p-btn'
              >
                Thêm chỉ tiêu
              </Button>
            </Dropdown>
          </Space>
        }
        pageFilters={
          <>
            <DatePicker picker="year"
              format='YYYY'
              value={dayjs(filters.year, 'YYYY')}   // uncontrolled component
              onChange={value => handleFilter('year', value.format('YYYY'))}
              // onChange={(_, newValue) => console.log({ newValue, filters: filters.year })}
              allowClear={false}
              disabledDate={current => current && current > dayjs().endOf('day')}
              style={{ width: 80 }}
              popupClassName='my-datepicker'
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
          placeholder: 'Tìm theo tên chỉ tiêu',
          onChange: e => setSearchKeyword(e?.target?.value),
        }}
      />

      <div className='w-100 pt-2'>
        <Spin spinning={isLoading}>
          <Table
            // columns={columns}
            columns={mergedColumns}
            dataSource={budgetPlan}
            bordered size='small'
            scroll={{ x: 'calc(100rem + 50%)' }}
            className={'w-100 my-table'}
            rowClassName='editable-row'
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            pagination={{
              size: 'default',
              showTotal: total => `Tổng cộng ${total} dòng`,
              onChange: _page => {
                cancel()
                setPage(_page)
              }
            }}
          />
        </Spin>
      </div>
    </>
  )
}

export default PlanTab

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}