import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { URL_TUITION_FEES, URL_SETTING_TUITION_FEES } from "../config/endpoints"
import { bindParams } from '../utils/format'

export const useListCompletedTuitionFees = (params, options) => {
  const url = !!params ? `${URL_TUITION_FEES}?${bindParams(params)}` : URL_TUITION_FEES

  return useQuery(
    ['completed-tuition-fees', { ...params }],
    () => api.get(url),
    {
      staleTime: 10 * 60 * 1000,  // same as cacheTime
      // cacheTime: 10 * 60 * 1000,  // default 10min
      // select: data => {
      //   if (!options?.isCustom && !options?.customField)
      //     return data

      //   if (options?.customField)
      //     return data?.map(item => item?.[options?.customField])

      //   return data?.map(({ id, name }) => ({
      //     value: id,
      //     label: name,
      //   }))
      // }
    },
  )
}

// Tạm thời bỏ qua vấn đề prefetching, chỉ viết hàm fetch bth trước
export const useCompletedTuitionFee = id => {
  return useQuery(
    ['completed-tuition-fee', id],
    () => api.get(`${URL_TUITION_FEES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddCompletedTuitionFee = () => {
  return useMutation({
    mutationFn: data => api.post(URL_TUITION_FEES, data),
  })
}

export const useMutationUpdateCompletedTuitionFee = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_TUITION_FEES}/${id}`, data),
  })
}

// export const useMutationRemoveCompletedTuitionFee = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_TUITION_FEES}/${id}`),
//   })
// }


// ==================== Setting Tuition Fees ====================
export const useListTuitionFees = (params, options) => {
  const url = !!params ? `${URL_SETTING_TUITION_FEES}?${bindParams(params)}` : URL_SETTING_TUITION_FEES

  return useQuery(
    ['setting-tuition-fees', { ...params }],
    () => api.get(url),
    {
      staleTime: 10 * 60 * 1000,  // same as cacheTime
      // cacheTime: 10 * 60 * 1000,  // default 10min
      // select: data => {
      //   if (!options?.isCustom && !options?.customField)
      //     return data

      //   if (options?.customField)
      //     return data?.map(item => item?.[options?.customField])

      //   return data?.map(({ id, name }) => ({
      //     value: id,
      //     label: name,
      //   }))
      // }
    },
  )
}

// Tạm thời bỏ qua vấn đề prefetching, chỉ viết hàm fetch bth trước
export const useTuitionFee = id => {
  return useQuery(
    ['setting-tuition-fee', id],
    () => api.get(`${URL_SETTING_TUITION_FEES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddTuitionFee = () => {
  return useMutation({
    mutationFn: data => api.post(URL_SETTING_TUITION_FEES, data),
  })
}

export const useMutationUpdateTuitionFee = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_SETTING_TUITION_FEES}/${id}`, data),
  })
}

// export const useMutationRemoveTuitionFee = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_SETTING_TUITION_FEES}/${id}`),
//   })
// }
