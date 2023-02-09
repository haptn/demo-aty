import qs from 'qs'

export const bindParams = params => qs.stringify(params, { indices: false })

export const formatNumber = value => new Intl.NumberFormat('vi-VN').format(value)

export const formatMoney = value => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(value)
}

export const formatMoneyReport = value => {
  let val = Math.abs(value)
  if (val >= Math.pow(10, 9)) {
    return formatNumber((val / Math.pow(10, 9)).toFixed(2)) + ' tỷ'
  }
  if (val >= Math.pow(10, 6)) {
    return formatNumber((val / Math.pow(10, 6)).toFixed(1)) + ' triệu'
  }
  return formatNumber(val) + ' VNĐ'
}