import { Modal } from 'antd'
import React from 'react'
import RuleGroup from './RuleGroup'

function ModalRules({ open, setOpen }) {
  const listRules = [
    {
      title: 'Quy định',
      rules: [
        {
          label: 'Mức lương cơ sở',
          value: 1490000,
          colspan: 6
        },
        {
          label: 'Mức lương tối đa đóng BHXH, BHYT, KPCĐ',
          value: 29800000,
          colspan: 6
        },
        {
          label: 'Mức lương tối đa đóng BHTN',
          value: 1490000,
          colspan: 6
        },
        {
          isEmpty: true,
          colspan: 6
        },
        {
          label: 'Số ngày tính công trong tháng',
          value: 24,
          colspan: 6
        },
        {
          label: 'Số giờ tính công trong ngày',
          value: 8,
          colspan: 6
        },
      ]
    },
    {
      title: 'Tỉ lệ hưởng lương làm thêm ban ngày',
      rules: [
        {
          label: 'Làm thêm ngày thường (%)',
          value: 150,
          colspan: 6
        },
        {
          label: 'Thứ 7, Chủ nhật (%)',
          value: 200,
          colspan: 6
        },
        {
          label: 'Ngày lễ, Tết (%)',
          value: 300,
          colspan: 6
        },
      ]
    },
    {
      title: 'Tỉ lệ hưởng lương làm thêm ban đêm',
      rules: [
        {
          label: 'Làm thêm ngày thường (%)',
          value: 200,
          colspan: 6
        },
        {
          label: 'Thứ 7, Chủ nhật (%)',
          value: 270,
          colspan: 6
        },
        {
          label: 'Ngày lễ, Tết (%)',
          value: 390,
          colspan: 6
        },
      ]
    },
    {
      title: 'Tỷ lệ bảo hiểm công ty phải đóng',
      rules: [
        {
          label: 'Bảo hiểm xã hội (%)',
          value: 17.5,
          colspan: 6
        },
        {
          label: 'Bảo hiểm y tế (%)',
          value: 3,
          colspan: 6
        },
        {
          label: 'Bảo hiểm thất nghiệp (%)',
          value: 0,
          colspan: 6
        },
        {
          label: 'Kinh phí công đoàn (%)',
          value: 2,
          colspan: 6
        },
      ]
    },
    {
      title: 'Tỷ lệ bảo hiểm nhân viên phải đóng',
      rules: [
        {
          label: 'Bảo hiểm xã hội (%)',
          value: 8,
          colspan: 6
        },
        {
          label: 'Bảo hiểm y tế (%)',
          value: 1.5,
          colspan: 6
        },
        {
          label: 'Bảo hiểm thất nghiệp (%)',
          value: 1,
          colspan: 6
        },
        {
          label: 'Kinh phí công đoàn (%)',
          value: 0,
          colspan: 6
        },
      ]
    },
    {
      title: 'Thuế TNCN',
      rules: [
        {
          label: 'Giảm trừ bản thân',
          value: 11000000,
          colspan: 6
        },
        {
          label: 'Giảm trừ người phụ thuộc',
          value: 4400000,
          colspan: 6
        },
        {
          label: 'Thuế suất cá nhân không cư trú (%)',
          value: 20,
          colspan: 6
        },
        {
          label: 'Thuế suất cá nhân cư trú và không ký HĐLĐ hoặc HĐLĐ dưới 03 tháng (%)',
          value: 10,
          colspan: 6
        },
      ]
    },
  ]

  return (
    <Modal
      title="Quy định Lương, Bảo hiểm, Thuế TNCN"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={960}
      footer={<></>}
    >
      {listRules?.map(rule => (
        <RuleGroup {...{
          key: rule?.title,
          title: rule?.title,
          listRules: rule?.rules
        }} />
      ))}
    </Modal>
  )
}

export default ModalRules