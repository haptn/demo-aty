import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { URL_ROLES } from "../config/endpoints"
import { bindParams } from '../utils/format'

export const useListRoles = (params, options) => {
  const url = !!params ? `${URL_ROLES}?${bindParams(params)}` : URL_ROLES

  return useQuery(
    ['roles', { ...params }],
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
export const useRole = id => {
  return useQuery(
    ['role', id],
    () => api.get(`${URL_ROLES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddRole = () => {
  return useMutation({
    mutationFn: data => api.post(URL_ROLES, data),
  })
}

export const useMutationUpdateRole = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_ROLES}/${id}`, data),
  })
}

// export const useMutationRemoveRole = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_ROLES}/${id}`),
//   })
// }