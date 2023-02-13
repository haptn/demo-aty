import React from 'react'
import { MainLayout } from '..'

function ActivitiesLayout() {
  return (
    <MainLayout
      title="Hoạt động"
      breadcrumbs={[
        { path: '/programs', name: 'Chương trình' }
      ]}
    >
      Hoạt động
    </MainLayout>
  )
}

export default ActivitiesLayout