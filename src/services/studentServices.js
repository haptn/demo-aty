import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { URL_STUDENTS } from "../config/endpoints"
import { bindParams } from '../utils/format'

export const useListStudents = (params, options) => {
  const url = !!params ? `${URL_STUDENTS}?${bindParams(params)}` : URL_STUDENTS

  return useQuery(
    ['students', { ...params }],
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
export const useStudent = id => {
  return useQuery(
    ['student', id],
    () => api.get(`${URL_STUDENTS}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddStudent = () => {
  return useMutation({
    mutationFn: data => api.post(URL_STUDENTS, data),
  })
}

export const useMutationUpdateStudent = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_STUDENTS}/${id}`, data),
  })
}

// export const useMutationRemoveStudent = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_STUDENTS}/${id}`),
//   })
// }