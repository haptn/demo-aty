import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import _ from 'lodash'

import { OverviewTab } from '.'
import { MainLayout } from '../..'

function AssetsPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const [openModal, setOpenModal] = useState({
    rules: false
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
      key: 'facilities',
      label: 'Cơ sở vật chất',
      children: <i>(Danh sách cơ sở vật chất của từng cơ sở)</i>,
    },
    {
      key: 'fixed-assets',
      label: 'Tài sản cố định',
      children: (
        <i>
          (Danh sách tài sản cố định (giá trị &gt; 30tr) của từng cơ sở)
        </i>
      ),
    },
    {
      key: 'tools',
      label: 'Dụng cụ, thiết bị',
      children: <i>
        Danh sách dụng cụ, thiết bị của từng cơ sở.
        <br />
        Để dễ dàng cho việc kiểm kê sau này thì mỗi dụng cụ, thiết bị nên được dán 1 mã nhận diện (barcode / QRcode).
        Chỉ cần quét mã này là xem được thông tin và tình trạng của thiết bị.
      </i>,
    },
    {
      key: 'inventory',
      label: 'Kiểm kê',
      children: (
        <i>
          Kiểm kê tài sản định kì.
          <br />
          Phần này có thể đi kèm với chức năng quét mã vạch trên mobile app để thuận tiện trong quá trình đi kiểm kê.
          Người kiểm kê có thể quét mã và update tình trạng hiện tại (còn hoạt động tốt/mất/hỏng) của DCTB.
        </i>
      ),
    },
    {
      key: 'depreciation',
      label: 'Khấu hao',
      children: <i>(Danh sách TSCĐ/DCTB khấu hao theo thời gian)</i>,
    },
    {
      key: 'requests',
      label: 'Yêu cầu tài sản',
      children: (
        <i>
          (Danh sách yêu cầu tài sản (xin cấp gì, cho cơ sở nào, ngày yêu cầu, người sử dụng, người tạo yêu cầu, người duyệt, trạng thái, ngày thực hiện))
        </i>
      ),
    },
  ]

  const activeTab = useMemo(() => {
    return location.pathname.replace('/assets', '')?.replace('/', '')
  }, [location.pathname])

  return (
    <MainLayout
      title="Tài sản"
      tabs={{
        items: tabs,
        onChange: activeKey => navigate(activeKey),
        activeKey: activeTab
      }}
    >
      {/* Phần này share chung cho tất cả các tabs => mở modal,... */}

      {/* <div className='w-100 pt-2'>
        <Spin spinning={isLoading}>
          
        </Spin>
      </div> */}

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

export default AssetsPage