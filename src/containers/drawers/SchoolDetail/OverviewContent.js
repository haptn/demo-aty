import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import { schoolType } from '../../../config/constants'

function OverviewContent({ data, onClose }) {
  const [form] = Form.useForm()

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  }
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 }
  }

  return (
    <Form
      {...formItemLayout}
      form={form}
      initialValues={{
        ...data,
        // representor: 'Mr. Lương Dũng Nhân',
        // headAccounter: 'Ms. Thúy'
      }}
    >
      {/* Name */}
      <Form.Item label="Tên cơ sở" name='name'>
        <Input />
      </Form.Item>

      <Form.Item label="Mã số thuế" name='taxCode'>
        <Input disabled />
      </Form.Item>

      {/* Type */}
      <Form.Item label="Loại cơ sở" name='type'>
        <Select
          allowClear
          // style={{ width: 150 }}
          options={[
            ...Object.values(schoolType)?.map(item => ({
              value: item,
              label: item,
            }))
          ]}
        />
      </Form.Item>

      {/* Phone */}
      <Form.Item label="SĐT" name='phone'>
        <Input placeholder="input placeholder" />
      </Form.Item>
      {/* Address */}
      <Form.Item label="Địa chỉ" name='address'>
        <Input />
      </Form.Item>

      {/* Button */}
      <Form.Item {...buttonItemLayout}>
        <Button type="primary"
          disabled={form.isFieldsTouched}
          onClick={onClose}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default OverviewContent