import React from 'react'
import { Drawer } from '../../..'

function StaffDetail({ data, open, setOpen }) {
  const handleSave = () => {
    setOpen(prev => ({ ...prev, accounting: false }))
  }

  return (
    <Drawer title={`Thông tin nhân viên`}   // ${data?.name}
      open={open}
      onClose={() => setOpen(prev => ({ ...prev, staff: false }))}
      onSave={handleSave}
    >

    </Drawer>
  )
}

export default StaffDetail