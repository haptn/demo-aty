import qs from 'qs'

export const bindParams = params => qs.stringify(params, { indices: false })

export const formatMoney = value => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
    .format(value)
}