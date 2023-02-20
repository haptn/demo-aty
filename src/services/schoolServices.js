import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { schoolStatus } from '../config/constants'
import { URL_SCHOOLS } from "../config/endpoints"
import { bindParams } from '../utils/format'

export const useListSchools = (params, options) => {
  const url = !!params ? `${URL_SCHOOLS}?${bindParams(params)}` : URL_SCHOOLS

  return useQuery(
    ['schools', { ...params }],
    () => api.get(url),
    {
      staleTime: Infinity,
      // cacheTime: 10 * 60 * 1000,  // 10min
      select: data => {
        let cloneData = [...data]

        if (!options?.isAllSchools)
          cloneData = cloneData?.filter(({ status }) => status === schoolStatus.WORKING)

        if (!options?.isCustom && !options?.customField)
          return cloneData

        if (options?.customField)
          return cloneData?.map(item => item?.[options?.customField])

        return cloneData?.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      }
    },
  )
}

export const useListAccountsInSchool = schoolId => {
  return useQuery(
    ['school-accounts', { schoolId }],
    () => api.get(`${URL_SCHOOLS}/${schoolId}/accounts`),
    {
      staleTime: 30 * 60 * 1000,   // 30 min
      // cacheTime: 10 * 60 * 1000,  // 10min
      enabled: !!schoolId
      // select: data => {}
    },
  )
}

// Tạm thời bỏ qua vấn đề prefetching, chỉ viết hàm fetch bth trước
export const useSchool = id => {
  return useQuery(
    ['school', id],
    () => api.get(`${URL_SCHOOLS}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddSchool = () => {
  return useMutation({
    mutationFn: data => api.post(URL_SCHOOLS, data),
  })
}

export const useMutationUpdateSchool = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_SCHOOLS}/${id}`, data),
  })
}

// export const useMutationRemoveSchool = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_SCHOOLS}/${id}`),
//   })
// }