import React from 'react'
import { Badge, Collapse, Segmented, Space, Spin, Table, Tag, theme } from 'antd'
import { classStatus } from '../../../../config/constants'

function CollapsibleList(props) {
  const { token } = theme.useToken()

  const { defaultActiveKeys, parentList, getFilters, tableProps } = props
  const { columns, getData, setPage, isLoading } = tableProps   // , getColumns

  const getStatusTag = status => {
    let tagProps = {}

    switch (status) {
      case classStatus.COMING_SOON:
        tagProps = { color: 'green' }
        break
      case classStatus.ENROLLING:
        tagProps = { color: 'blue' }
        break
      case classStatus.PERFORMING:
        tagProps = { color: 'gold' }
        break

      default:
        tagProps = { color: 'red' } // magenta
        break
    }

    return <Tag {...tagProps}>{status}</Tag>
  }

  return (
    <Collapse
      defaultActiveKey={defaultActiveKeys}
      className='my-collapse'
      style={{ background: 'none', border: 'none' }}
    >
      {parentList?.map(({ id, name, status, totalStudents }) => (
        <Collapse.Panel
          key={id ?? name}    // 'id' cho 'schools', 'name' cho 'courses'
          header={
            <span style={{ fontWeight: 500 }} className='flex flex-between'>
              <Space size='small'>
                {name}
                {!!status && getStatusTag(status)}
                {/* <Tag color="blue">blue</Tag> */}
              </Space>
              <Space size='small'>
                <Badge status="success"
                  text={`Đã đóng (${getData(id ?? name)?.length}/${totalStudents})`}
                />
                <Badge status="warning"
                  text={`Chưa đóng (${totalStudents - getData(id ?? name)?.length}/${totalStudents})`}
                />
              </Space>
            </span>
          }
          style={{
            marginBottom: '1rem',
            background: token.colorBgTextHover,
            borderRadius: token.borderRadius,
            border: 'none',
          }}
        >
          {/*
            Chỗ này chưa có ý tưởng thiết kế cho đẹp, tạm comment để sau.
            Tui đang định cho cái filter thành dạng <Tag/> và lên header đứng.
          */}
          {(getFilters && typeof getFilters === 'function' && getFilters(name)) && (
            <Space size='small' style={{ marginBottom: 8 }}>
              <span style={{ marginLeft: 16 }}>
                Địa điểm tổ chức:
              </span>
              <Segmented options={getFilters(name)}
              // rảnh thì xử lý thêm việc show full list filter options,
              // count totalStudents mỗi khóa và có thể filter thật
              />
            </Space>
          )}

          <Spin spinning={isLoading}>
            <Table
              // columns={getColumns(id)}
              columns={columns}
              dataSource={getData(id ?? name)}
              bordered size='small'
              className={'w-100 my-table'}
              scroll={{ y: 560 }}
              pagination={{
                size: 'default',
                showTotal: total => `Tổng cộng ${total} dòng`,
                onChange: _page => setPage(_page)
              }}
            />
          </Spin>
        </Collapse.Panel>
      ))}
    </Collapse>
  )
}

export default CollapsibleList