import React, { useState } from 'react'
import { Input, Layout, Space } from 'antd'
import { ToastContainer } from 'react-toastify'
import { Breadcrumb, Header, Sidebar } from '../../components'

const { Content } = Layout

function MainLayout(props) {
  const {
    children,
    hasBreadcrumb = true,
    breadcrumbs = [],
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
        <Header />    {/*  {...{ title }} */}
        <Content style={{ padding: '2rem', backgroundColor: '#eaeaea' }}>
          {hasBreadcrumb &&
            <Breadcrumb {...{ data: breadcrumbs, title }} />
          }
          <div className="site-layout-background">
            {/* Page header */}
            <div className='w-100 flex-between'>
              <h2>{title}</h2>

              {/* Actions */}
              {pageActions}
            </div>

            {/* Page filters */}
            {(pageFilters || hasPageSearch) && (
              <div className='w-100 pt-2 flex-between'>
                {/* Filters */}
                <Space size='small'>
                  {pageFilters}
                  {hasSearchSameRow && (
                    <Input.Search
                      allowClear enterButton
                      style={{ width: 160 }}
                      {...pageSearchProps}
                    />
                  )}
                </Space>
        
                {/* Search */}
                {hasPageSearch && (
                  <Input.Search
                    allowClear enterButton
                    style={{ width: 250 }}
                    {...pageSearchProps}
                  />
                )}
              </div>
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
      />
    </Layout>
  )
}

export default MainLayout