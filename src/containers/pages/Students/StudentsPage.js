import React, { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { MainLayout } from '../..'
import { OverviewTab, StudentsTab, TuitionFeesTab } from '.'

function StudentsPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    {
      key: '',
      label: 'Tổng quan',
      children: <OverviewTab />,
    },
    {
      key: 'list',
      label: 'DS Học viên',
      children: <StudentsTab />,
    },
    {
      key: 'tuition-fees',
      label: 'Học phí',
      children: <TuitionFeesTab />,
    },
    {
      key: 'insurances',
      label: 'Bảo hiểm',
      children: (
        <i>
          DS học viên đã đóng tiền bảo hiểm (filter: bắt buộc/tự nguyện) (họ tên, số tiền đã đóng, ngày đóng, người nhận,...)
          <br /><br />
          (Nên tách ra 1 bảng riêng hay gộp chung trong bảng Học phí của trường học (đối với học sinh ở cơ sở Thủ Khoa Huân & Q12)?)
        </i>
      ),
      // children: <InsurancesTab />,
    },
    // {
    //   key: 'report',
    //   label: 'Báo cáo',
    //   children: <></>,
    // },
  ]

  const activeTab = useMemo(() => {
    return location.pathname.replace('/students', '')?.replace('/', '')
  }, [location.pathname])

  return (
    <MainLayout
      title="Học viên"
      tabs={{
        items: tabs,
        onChange: activeKey => navigate(activeKey),
        activeKey: activeTab
      }}
    >
      {/* Phần này share chung cho tất cả các tabs => mở modal,... */}

      {/* {openDetailDrawer && (
        <AccountDetailDrawer {...{
          data: detailData,
          open: openDetailDrawer,
          setOpen: setOpenDetailDrawer
        }} />
      )} */}
    </MainLayout>
  )
}

export default StudentsPage