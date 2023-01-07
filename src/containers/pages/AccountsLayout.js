import React from 'react'
import { Button, Table } from 'antd'
import {
  EditOutlined, DeleteOutlined,
  FileExcelOutlined, PlusOutlined,
} from '@ant-design/icons'
import { MainLayout } from '..'
import { listAccounts } from '../../mock/data'

function AccountsLayout() {
  return (
    <MainLayout title="Quản lý Tài khoản">
      <div className='w-100 flex-row-end'>
        <div>
          <Button type="primary" icon={<PlusOutlined/>} size='middle'
            style={{ padding: '.4rem .8rem', marginRight: '.8rem' }}
          >
            Tạo mới
          </Button>
          <Button type="default" icon={<FileExcelOutlined/>} size='middle'
            style={{ padding: '.4rem .8rem' }}
          >
            Xuất file Excel
          </Button>
        </div>
      </div>

      <div className='w-100 pt-2'>
        {/* <Table columns={columns} dataSource={listAccounts} /> */}
      </div>
    </MainLayout>
  )
}

export default AccountsLayout