import React, { useState } from 'react'
import { Layout } from 'antd'
import { ToastContainer } from 'react-toastify'
import { Breadcrumb, Header, Sidebar } from '../../components'

const { Content } = Layout

function MainLayout(props) {
  const {
    children,
    hasBreadcrumb = true,
    // title = ''
  } = props

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar {...{ collapsed, setCollapsed }} />
      <Layout className="site-layout">
        <Header />    {/*  {...{ title }} */}
        <Content style={{ padding: '2rem', backgroundColor: '#eaeaea' }}>
          {hasBreadcrumb &&
            <Breadcrumb />
          }
          <div className="site-layout-background">
            {children}
          </div>
        </Content>
      </Layout>

      <ToastContainer
        autoClose={2500}
        draggable={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </Layout>
  )
}

export default MainLayout