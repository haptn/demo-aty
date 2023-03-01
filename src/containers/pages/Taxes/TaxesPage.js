import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'

import { MainLayout } from '../..'
import { DeclarationTab, OverviewTab } from '.'

function TaxesPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [openModal, setOpenModal] = useState({
    // rules: false
  })
  const [openDetailDrawer, setOpenDetailDrawer] = useState({
    activity: false,
    course: false,
  })
  const [detailData, setDetailData] = useState({
    activity: null,
    course: null,
  })

  const tabs = [
    {
      key: '',
      label: 'Tổng quan',
      children: <OverviewTab {...{ setOpenModal }} />,
    },
    {
      key: 'declaration',
      label: 'Khai thuế',
      children: <DeclarationTab {...{ setOpenModal }} />,
    },
    // {
    //   key: 'deposit-slip',
    //   label: 'Giấy nộp tiền',
    //   children: (
    //     <i>
    //       (Danh sách  của từng cơ sở)
    //     </i>
    //   ),
    // },
  ]

  const activeTab = useMemo(() => {
    return location.pathname.replace('/taxes', '')?.replace('/', '')
  }, [location.pathname])

  return (
    <MainLayout
      title="Thuế"
      tabs={{
        items: tabs,
        onChange: activeKey => navigate(activeKey),
        activeKey: activeTab
      }}
    >
      {/* Phần này share chung cho tất cả các tabs => mở modal,... */}

      {/* {openDetailDrawer?.activity && (
        <ActivityDetail {...{
          data: detailData?.activity,
          open: openDetailDrawer,
          setOpen: setOpenDetailDrawer
        }} />
      )}
      {openDetailDrawer?.course && (
        <CourseDetail {...{
          data: detailData?.course,
          open: openDetailDrawer?.course,
          setOpen: setOpenDetailDrawer
        }} />
      )} */}
    </MainLayout>
  )
}

export default TaxesPage