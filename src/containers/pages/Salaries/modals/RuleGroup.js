import { Col, Divider, Form, Input, Row } from 'antd'
import React from 'react'
import { formatNumber } from '../../../../utils/format'

function RuleGroup(props) {
  const { title, listRules = [] } = props

  return (
    <div style={{ width: '95%' }}>
      <Divider {...{
        orientation: 'left',
        orientationMargin: '0',
        style: {
          marginTop: 36,
          marginBottom: 4,
          borderBlockStart: '0 rgba(5, 5, 5, 0.15)'   // độ đậm của divider
        }
      }}>
        {title}
      </Divider>

      <Row gutter={[12, 12]}>
        {listRules?.length > 0 && listRules?.map(rule => {
          const { label, value, colspan, isEmpty } = rule

          return isEmpty
            ? <Col span={colspan}></Col>
            : (
              <Col span={colspan}>
                <Form.Item label={label} style={{ marginBottom: 0 }}>
                  <Input {...{
                    placeholder: label,
                    defaultValue: formatNumber(value),
                    style: { width: '95%', textAlign: 'right' }
                  }} />
                </Form.Item>
              </Col>
            )
        })}
      </Row>
    </div>
  )
}

export default RuleGroup