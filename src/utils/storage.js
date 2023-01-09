// Local Storage
export const getLocal = key => {
  let result = localStorage.getItem(key)

  if (result && typeof result === 'string' && result?.includes('{'))
    result = JSON.parse(localStorage.getItem(key))

  return result
}

export const setLocal = (key, value) => {
  if (typeof value === 'string')
    localStorage.setItem(key, value)
  else
    localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocal = key => {
  localStorage.removeItem(key)
}

// Cookies