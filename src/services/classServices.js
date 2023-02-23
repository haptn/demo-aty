import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { URL_CLASSES } from "../config/endpoints"
import { bindParams } from '../utils/format'

export const useListClasses = (params, options) => {
  const url = !!params ? `${URL_CLASSES}?${bindParams(params)}` : URL_CLASSES

  return useQuery(
    ['classes', { ...params }],
    () => api.get(url),
    {
      staleTime: 10 * 60 * 1000,  // same as cacheTime
      // cacheTime: 10 * 60 * 1000,  // default 10min
      select: data => {
        if (!options?.isCustom && !options?.customField)
          return data

        if (options?.customField)
          return data?.map(item => item?.[options?.customField])

        return data?.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      }
    },
  )
}

// Tạm thời bỏ qua vấn đề prefetching, chỉ viết hàm fetch bth trước
export const useClass = id => {
  return useQuery(
    ['class', id],
    () => api.get(`${URL_CLASSES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddClass = () => {
  return useMutation({
    mutationFn: data => api.post(URL_CLASSES, data),
  })
}

export const useMutationUpdateClass = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_CLASSES}/${id}`, data),
  })
}

// export const useMutationRemoveClass = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_CLASSES}/${id}`),
//   })
// }

// export const useListAccountsInSchool = schoolId => {
//   return useQuery(
//     ['school-accounts', { schoolId }],
//     () => api.get(`${URL_CLASSES}/${schoolId}/accounts`),
//     {
//       staleTime: 30 * 60 * 1000,   // 30 min
//       // cacheTime: 10 * 60 * 1000,  // 10min
//       enabled: !!schoolId
//       // select: data => {}
//     },
//   )
// }