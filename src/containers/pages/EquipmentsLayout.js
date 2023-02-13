import React from 'react'
import { MainLayout } from '..'

function EquipmentsLayout() {
  return (
    <MainLayout
      title="Công cụ dụng cụ"
      breadcrumbs={[
        { path: '/assets', name: 'Tài sản' }
      ]}
    >
      Công cụ dụng cụ
    </MainLayout>
  )
}

export default EquipmentsLayout