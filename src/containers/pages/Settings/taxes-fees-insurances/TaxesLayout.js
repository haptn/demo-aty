import React from 'react'
import { MainLayout } from '../../..'

function TaxesLayout() {
  return (
    <MainLayout
      title="Loại thuế"
      breadcrumbs={[
        { path: '/settings', name: 'Thiết lập chung' },
        // { path: '/settings', name: 'Nội bộ ATY' },
      ]}
    >
      Loại thuế
    </MainLayout>
  )
}

export default TaxesLayout