import React, { useMemo } from 'react'
import { Col, Input, Row, Space } from 'antd'
import { OrganizationGraph } from '@ant-design/graphs'
import { schoolOrganizations } from '../../../mock/data'
import { staffStatus } from '../../../config/constants'

function StaffsContent({ schoolData }) {
  const data = useMemo(() => 
    schoolOrganizations?.[schoolData?.key], [schoolData]
  )

  return (
    <OrganizationGraph
      data={data}
      nodeCfg={{
        style: node => {
          console.log('node', node)
          
          return ({
            fill: node?.value?.status === staffStatus.QUITTED
              ? '#ddd' : 'transparent',
            stroke: node?.value?.status === staffStatus.QUITTED
              ? '#bbb' : '#1677ff',
            // path: node?.value?.status === staffStatus.QUITTED
            // ? '#bbb' : '#1677ff',
          })
        },
        label: {
          style: (node, _group, type) => {
            console.log({node, _group, type})

            const styles = {
              title: {
                fill: '#b5b5b5',
              },
              name: {
                // fontSize: '1.2rem',
                fill: '#b5b5b5',
              },
            };
            // return staffStatus.QUITTED
            return node.value?.status === staffStatus.QUITTED ? styles[type] : {};
          },
        },
      }}
    />
  )
}

export default StaffsContent



// const [editableStr, seteditableStr] = useState({
//   title: 'Mr.',
//   name: 'Lương Dũng Nhân',
//   email: 'nhan.dl@aty.edu.vn'
// })

// return (
//   <Space className=''>
//     {/* Representor */}
//     <Row>
//       <Col span={24}>
//         <h3>1/ Người đại diện</h3>
//       </Col>
//       <Col span={1} />
//       <Col span={10}>
//         {/* <Typography.Paragraph
//           editable={{
//             onChange: seteditableStr,
//             triggerType: ['text'],
//           }}
//         >
//           {editableStr?.title} {editableStr?.name}
//         </Typography.Paragraph> */}
//         {/* <Select options={['Mr.', 'Ms']}>
//         </Select> */}
//         <Input style={{ width: '100%' }} value='Lương Dũng Nhân' placeholder='Họ và tên' />
//       </Col>
//       <Col span={2}>
//       </Col>
//       <Col span={11}>
//         <Input style={{ width: '100%' }} value='nhan.dl@aty.edu.vn' placeholder='Email' />
//       </Col>
//     </Row>

//     {/* </Form.Item> */}
//     {/* Head Accounter */}
//     {/* <Form.Item label="Kế toán trường" name='headAccounter'>
//       <Input style={{ width: '50%' }} />
//     </Form.Item>
//     </Row> */}
//   </Space>
// )