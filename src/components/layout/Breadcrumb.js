import React, { useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { routes } from '../../config/path'
const { Item: BreadcrumbItem } = AntdBreadcrumb

const REMOVE_TEXT = 'Quản lý '

function Breadcrumb({ data = [], title = '' }) {    // , hasTabs = false  // làm sau
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const pageTitle = useMemo(() => {
    return title?.includes(REMOVE_TEXT)
      ? title.replace(new RegExp(REMOVE_TEXT), '')
      : title
  }, [title])

  const breadcrumbs = useMemo(() => {
    return [...data, pageTitle]
    // return hasTabs ? [...data] : [...data, pageTitle]   // Nếu có tabs thì ko có pageTitle (?)
  }, [pathname])
  const isLast = idx => idx < breadcrumbs?.length - 1

  return (
    <AntdBreadcrumb separator='>' style={{ marginBottom: '1rem' }}>
      <BreadcrumbItem onClick={() => navigate('/')}
        style={{ cursor: 'pointer' }}
      >
        <HomeOutlined />
      </BreadcrumbItem>
      {pathname !== routes.DASHBOARD &&
        breadcrumbs?.map((item, idx) => (
          <BreadcrumbItem key={idx}>
            {isLast(idx)
              ? <Link to={item?.path}>
                <span style={{ fontWeight: 500 }}>{item?.name}</span>
              </Link>
              : pageTitle
            }
          </BreadcrumbItem>
        )
        )}
    </AntdBreadcrumb>
  )
}

export default Breadcrumb