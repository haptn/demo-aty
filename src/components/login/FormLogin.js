import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { setLocal } from '../../utils/storage'
import { keys, userRole } from '../../config/constants'

function FormLogin() {
  const navigate = useNavigate()
  const [errMsg, setErrMsg] = useState('')

  // Handle Login
  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    const { username, password } = values

    if (['kt.q1@aty.edu.vn', 'annv@aty.edu.vn',
      'admin.q1@aty.edu.vn',
      'admin.aty@aty.edu.vn'].includes(username)
    ) {
      if (password !== '123456')
        setErrMsg('Mật khẩu không đúng')
      else {
        setErrMsg('')
        setLocal(keys.USER, {
          username,
          name: username === 'annv@aty.edu.vn' // 'kt.q1@aty.edu.vn'
            ? 'Nguyễn Văn A'
            : username === 'admin.q1@aty.edu.vn'
              ? 'Trần Thị B'
              : 'Lê Thị C',
          role: username === 'kt.q1@aty.edu.vn'
            ? userRole.ACCOUNTER
            : username === 'admin.q1@aty.edu.vn'
              ? userRole.SCHOOL_ADMIN
              : userRole.ADMIN,
          // roleName: username === 'kt.q1@aty.edu.vn'
          //   ? userRole.ACCOUNTER.name
          //   : username === 'admin.q1@aty.edu.vn'
          //     ? userRole.SCHOOL_ADMIN.name
          //     : userRole.ADMIN.name,
        })
        navigate(0)
      }
    }
    else
      setErrMsg('Tài khoản không tồn tại')
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
    >
      <h2 style={{ margin: '2.4rem 0', textAlign: 'center' }}>
        Welcome back! ^^
      </h2>

      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          onChange={() => setErrMsg('')}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
        style={{ marginBottom: '.5rem' }}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          onChange={() => setErrMsg('')}
        />
      </Form.Item>

      {!!errMsg && (
        <span style={{ fontStyle: 'italic', color: 'red' }}>
          {errMsg}
        </span>
      )}

      {/* <Form.Item> */}
      <Form.Item name="remember" valuePropName="checked" //noStyle
        style={{ marginTop: '1.5rem' }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      {/* </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormLogin