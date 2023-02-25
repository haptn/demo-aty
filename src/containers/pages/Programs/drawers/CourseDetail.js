import React from 'react'
import { Drawer } from '../../..'

function CourseDetail({ data, open, setOpen }) {
  const handleSave = () => {
    setOpen(prev => ({ ...prev, accounting: false }))
  }

  return (
    <Drawer title={`Thông tin chương trình`}   // ${data?.name}
      open={open}
      onClose={() => setOpen(prev => ({ ...prev, staff: false }))}
      onSave={handleSave}
    >

    </Drawer>
  )
}

export default CourseDetail