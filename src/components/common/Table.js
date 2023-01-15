import React from 'react'
import { Table as AntdTable } from 'antd';

function Table(props) {
  const { columns, data } = props
  
  return (
    <AntdTable columns={columns} dataSource={data} />
  )
}

export default Table