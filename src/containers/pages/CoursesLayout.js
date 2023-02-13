import React from 'react'
import { MainLayout } from '..'

function CoursesLayout() {
  return (
    <MainLayout
      title="Khóa học"
      breadcrumbs={[
        { path: '/programs', name: 'Chương trình' }
      ]}
    >
      Khóa học
    </MainLayout>
  )
}

export default CoursesLayout