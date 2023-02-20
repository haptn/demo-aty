import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { URL_STAFFS } from "../config/endpoints"
import { bindParams } from '../utils/format'

export const useListStaffs = (params, options) => {
  const url = !!params ? `${URL_STAFFS}?${bindParams(params)}` : URL_STAFFS

  return useQuery(
    ['staffs', { ...params }],
    () => api.get(url),
    {
      // staleTime: 10 * 60 * 1000,  // same as cacheTime
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
      },
      // onSuccess: data => {
      //   const { customSuccessData } = options
      //   if (customSuccessData && typeof customSuccessData === 'function') {
      //     console.log('zôoo', customSuccessData(data));
      //     return customSuccessData(data)
      //   }
      //   else
      //     return data
      // }
    },
  )
}

// Tạm thời bỏ qua vấn đề prefetching, chỉ viết hàm fetch bth trước
export const useStaff = id => {
  return useQuery(
    ['staff', id],
    () => api.get(`${URL_STAFFS}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddStaff = () => {
  return useMutation({
    mutationFn: data => api.post(URL_STAFFS, data),
  })
}

export const useMutationUpdateStaff = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_STAFFS}/${id}`, data),
  })
}

// export const useMutationRemoveStaff = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_STAFFS}/${id}`),
//   })
// }