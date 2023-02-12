import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Checkbox, Form, Input } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { setLocal } from '../../utils/storage'
import { keys, userRole } from '../../config/constants'
import { useAccountForLogin } from '../../services/accountServices'
import { login } from '../../services/authServices'

function FormLogin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const { data: account = null } = useAccountForLogin(email)

  // Handle Login
  const onFinish = (values) => {
    setLoading(true)
    const { username, password, remember } = values

    login({ username, password }, account)
      .then(res => {
        if (res !== 'success') return

        setErrMsg('')
        setLocal(keys.USER, { ...account, isRemembered: remember })
        navigate(0)
      })
      .catch(error => {
        setErrMsg(error)
      })
      .finally(() => setLoading(false))
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
          value={email}
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          onChange={e => {
            setEmail(e?.target?.value)
            setErrMsg('')
          }}
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
        <Checkbox>Duy trì đăng nhập</Checkbox>
      </Form.Item>
      {/* </Form.Item> */}

      <Form.Item>
        <Button type="primary" htmlType="submit"
          loading={loading}
          className="login-form-button"
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FormLogin