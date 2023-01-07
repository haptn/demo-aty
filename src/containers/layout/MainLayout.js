import React, { useState } from 'react'
import { Layout } from 'antd'
import { Breadcrumb, Header, Sidebar } from '../../components'

const { Content } = Layout

function MainLayout(props) {
  const { 
    children,
    hasBreadcrumb = true,
    title = ''
  } = props

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar {...{ collapsed, setCollapsed }} />
      <Layout className="site-layout">
        <Header {...{title}} />
        <Content style={{ padding: '2rem', backgroundColor: '#e5e5e5' }}>
          {hasBreadcrumb &&
            <Breadcrumb/>
          }
          <div className="site-layout-background">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout