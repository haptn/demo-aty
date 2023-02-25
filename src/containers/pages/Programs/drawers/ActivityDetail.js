import React from 'react'
import { Drawer } from '../../..'

function ActivityDetail({ data, open, setOpen }) {
  const handleSave = () => {
    setOpen(prev => ({ ...prev, accounting: false }))
  }

  return (
    <Drawer title={`Thông tin hoạt động ${data?.name}`}
      open={open}
      onClose={() => setOpen(prev => ({ ...prev, accounting: false }))}
      onSave={handleSave}
      width={'calc(100% - 200px)'}
    >

    </Drawer>
  )
}

export default ActivityDetail