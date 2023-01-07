import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { routes } from '../../config/path'
import { toCapital } from '../../utils/string'
import { menuItems } from '../../mock/data'
const { Item: BreadcrumbItem } = AntdBreadcrumb

function Breadcrumb() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const currentPage = useMemo(() => {
    return toCapital(
      menuItems.find(item => item?.key === pathname)?.label
    )
  }, [pathname])

  return (
    <AntdBreadcrumb separator='>' style={{ marginBottom: '1.6rem' }}>
      <BreadcrumbItem onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        <HomeOutlined />
      </BreadcrumbItem>
      {pathname !== routes.DASHBOARD && (
        <BreadcrumbItem>{currentPage}</BreadcrumbItem>
      )}
    </AntdBreadcrumb>
  )
}

export default Breadcrumb