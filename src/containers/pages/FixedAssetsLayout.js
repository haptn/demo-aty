import React from 'react'
import { MainLayout } from '..'

function FixedAssetsLayout() {
  return (
    <MainLayout
      title="Tài sản cố định"
      breadcrumbs={[
        { path: '/assets', name: 'Tài sản' }
      ]}
    >
      Tài sản cố định
    </MainLayout>
  )
}

export default FixedAssetsLayout