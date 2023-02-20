import React, { useState } from 'react'
import { Layout, Tabs } from 'antd'
import { ToastContainer } from 'react-toastify'
import { Breadcrumb, Header, PageHeader, Sidebar } from '../../components'

const { Content } = Layout

function MainLayout(props) {
  const {
    children,
    hasBreadcrumb = true,
    breadcrumbs = [],
    tabs,        // để làm cái này sau, hơi phức tạp vụ lấy list của những settings trong cùng 1 group
    title = '',
    pageActions,
    pageFilters,
    pageSearchProps,
    hasPageSearch = false,   // khả năng là ko cần field này vì "gần như" tất cả page search đều cần truyền props để nhận value & onChange()
    hasSearchSameRow = false // thanh search nằm cùng dòng vs title và các pageActions
  } = props

  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar {...{ collapsed, setCollapsed }} />
      <Layout className="site-layout">
        <Header />
        <Content style={{ padding: '1.5rem', backgroundColor: '#EEEEEE', overflowY: 'hidden' }}>
          {hasBreadcrumb &&
            <Breadcrumb {...{
              data: breadcrumbs,
              title,
              hasTabs: tabs && tabs?.items?.length > 0
            }} />
          }
          <div className="site-layout-background">
            {/* Tabs (optional) */}
            {(tabs && tabs?.items?.length > 0) ? (
              <Tabs {...{
                // defaultActiveKey: tabs?.[0]?.key,
                items: tabs?.items || [],
                onChange: tabs?.onChange,
                activeKey: tabs?.activeKey
              }} />
            ) : (
              <PageHeader {...{
                title, pageActions, pageFilters,
                hasPageSearch, hasSearchSameRow,
                pageSearchProps,
              }} />
            )}

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
      // enableMultiContainer   // chưa biết này là gì
      />
    </Layout>
  )
}

export default MainLayout