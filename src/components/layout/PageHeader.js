import React from 'react'
import { Input, Space } from 'antd'

function PageHeader(props) {
  const {
    title, pageActions, pageFilters,
    hasPageSearch = false,    // khả năng là ko cần field này vì "gần như" tất cả page search đều cần truyền props để nhận value & onChange()
    hasSearchSameRow = false, // thanh search nằm cùng dòng vs title và các pageActions
    pageSearchProps
  } = props
  return (
    <>
      {/* Page header */}
      <div className='w-100 flex-between'>
        <h2>{title}</h2>

        {/* Actions */}
        {pageActions}

        {/* Search box */}
        {hasSearchSameRow && (
          <Input.Search
            allowClear enterButton
            style={{ width: 250 }}
            {...pageSearchProps}
          />
        )}
      </div>

      {/* Page filters */}
      {(pageFilters || hasPageSearch) && (
        <div className='w-100 pt-2 flex-between'>
          {/* Filters */}
          <Space size='small'>
            {pageFilters}
            {/* {hasSearchSameRow && (    // ko nhớ sao hồi đó để ở đây
              <Input.Search
                allowClear enterButton
                style={{ width: 160 }}
                {...pageSearchProps}
              />
            )} */}
          </Space>

          {/* Search */}
          {hasPageSearch && (
            <Input.Search
              allowClear enterButton
              style={{ width: 250 }}
              {...pageSearchProps}
            />
          )}
        </div>
      )}
    </>
  )
}

export default PageHeader