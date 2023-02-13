import React, { useState } from 'react'
import { MainLayout } from '../..'
import { listSettings } from '../../../mock/data'
import { SettingItem } from '../../../components'

function SettingLayout() {
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <MainLayout
      title="Thiết lập chung"
      // pageActions={
      //   <Space size='small'>
      //     <Button type="primary" icon={<PlusOutlined />} size='middle'
      //       className='p-btn'
      //     >
      //       Thêm Danh mục
      //     </Button>
      //   </Space>
      // }
      hasSearchSameRow
      pageSearchProps={{
        value: searchKeyword,
        placeholder: 'Tìm danh mục',
        onChange: e => setSearchKeyword(e?.target?.value),
      }}
    >
      <div className='mt-2 p-3 bg-white border-r-1'>
        <div className='masonry grid-3'>
          {listSettings?.length > 0 &&
            listSettings?.map(group => (
              <div className='masonry-item' key={group?.id}>
                <SettingItem {...{
                  // key: group?.id,
                  title: group?.name,
                  list: group?.children
                }} />
              </div>
            ))
          }
        </div>
      </div>
    </MainLayout>
  )
}

export default SettingLayout