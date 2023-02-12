import React, { useMemo } from 'react'
import clsx from 'clsx'
import { BronzeMedalIcon, GoldMedalIcon, SilverMedalIcon } from '../../assets'
import { formatNumber } from '../../utils/format'
import styles from '../../styles/pages/DashboardLayout.module.scss'

const RowCourse = (props) => {
  const {
    rankNo, rankImg, courseName, value,
    isHead, isFilterTotal
  } = props

  const formatValue = val => {
    if (val >= Math.pow(10, 9)) {
      return formatNumber((val / Math.pow(10, 9)).toFixed(3)) + ' tỷ đồng'
    }
    if (val >= Math.pow(10, 6)) {
      return formatNumber((val / Math.pow(10, 6)).toFixed(0)) + ' triệu đồng'
    }
    return formatNumber(val) + ' đồng'
  }

  return (   // value sẽ phụ thuộc zô type Học viên/Học phí
    <div className={
      clsx('flex flex-between', styles.rankings__item_tr, {
        [styles.thead]: isHead
      })
    }>
      <div className={clsx(styles.rankings__item_td, styles.num)}>
        {rankImg
          ? <img src={rankImg} alt={`rank ${rankNo}`} />
          : `${rankNo}`
        }
      </div>
      <div className={clsx('flex-1', styles.rankings__item_td)}>
        {courseName}
      </div>
      <div className={clsx(styles.rankings__item_td, styles.value)}>
        {(isFilterTotal && !isHead) ? formatValue(value) : value}
      </div>
    </div>
  )
}

const rankings = [
  {
    id: 1,
    courseName: 'Học kỳ quân đội Bộ binh sơ cấp',
    countStudents: 567,
    total: 4536000000   // Tổng học phí đã thu
  },
  {
    id: 2,
    courseName: 'Bootcamp Teen Extreme',
    countStudents: 180,
    total: 2700000000
  },
  {
    id: 3,
    courseName: 'Bootcamp Kid Extreme',
    countStudents: 212,
    total: 2544000000
  },
  {
    id: 4,
    courseName: 'Teen Leaders',
    countStudents: 82,
    total: 1640000000
  },
  {
    id: 5,
    courseName: 'Siêu Trí tuệ Teen-Kid',
    countStudents: 162,
    total: 972000000
  },
  {
    id: 6,
    courseName: 'Dân vũ',
    countStudents: 234,
    total: 468000000
  },
]

function CoursesTable(props) {
  const { filterType } = props  // , data: list rankings get từ API

  const isFilterTotal = filterType === 'Học phí'

  const listRankings = useMemo(() => {
    return isFilterTotal
      ? rankings?.sort((a, b) => b?.total - a?.total)
      : rankings?.sort((a, b) => b?.countStudents - a?.countStudents)
  }, [filterType])

  const getRankImg = rankNo => {
    switch (rankNo) {
      case 1:
        return GoldMedalIcon

      case 2:
        return SilverMedalIcon

      case 3:
        return BronzeMedalIcon

      default:
        return null
    }
  }

  return (
    <>
      <div className={styles.rankings__table}>
        {/* Table header */}
        <RowCourse {...{
          rankNo: 'Hạng',
          courseName: 'Tên chương trình',
          value: isFilterTotal ? 'Tổng học phí' : 'Số học viên',
          isHead: true
        }} />

        {/* Table body */}
        {listRankings?.map(({ id, courseName, countStudents, total }, idx) => (
          <RowCourse {...{
            key: id,
            rankNo: idx + 1,
            rankImg: getRankImg(idx + 1),
            courseName,
            value: isFilterTotal ? total : countStudents,
            isFilterTotal
          }} />
        ))}
      </div>
    </>
  )
}

export default CoursesTable