import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { URL_TAXES, URL_TAX_TYPES } from "../config/endpoints"
import { bindParams } from '../utils/format'

// ============================= Taxes =============================
export const useListTaxes = (params, options) => {
  const url = !!params ? `${URL_TAXES}?${bindParams(params)}` : URL_TAXES

  return useQuery(
    ['taxes', { ...params }],
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
export const useTax = id => {
  return useQuery(
    ['tax', id],
    () => api.get(`${URL_TAXES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddTax = () => {
  return useMutation({
    mutationFn: data => api.post(URL_TAXES, data),
  })
}

export const useMutationUpdateTax = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_TAXES}/${id}`, data),
  })
}

// export const useMutationRemoveTax = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_TAXES}/${id}`),
//   })
// }


// ============================= Tax types =============================
export const useListTaxTypes = (params, options) => {
  const url = !!params ? `${URL_TAX_TYPES}?${bindParams(params)}` : URL_TAX_TYPES

  return useQuery(
    ['taxes', { ...params }],
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
export const useTaxType = id => {
  return useQuery(
    ['tax', id],
    () => api.get(`${URL_TAX_TYPES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddTaxType = () => {
  return useMutation({
    mutationFn: data => api.post(URL_TAX_TYPES, data),
  })
}

export const useMutationUpdateTaxType = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_TAX_TYPES}/${id}`, data),
  })
}

// export const useMutationRemoveTax = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_TAX_TYPES}/${id}`),
//   })
// }
