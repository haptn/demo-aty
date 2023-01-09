export const toCapital = (str = '') => {
  let result = str.toLowerCase().charAt(0).toUpperCase()
  + str.toLowerCase().substring(1)

  const tempArr = result.split(' & ')
  if (tempArr.length > 1) {
    return tempArr.map(item => toCapital(item)).join(' & ')
  }

  return result
}
