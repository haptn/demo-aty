import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import {
  URL_COURSES, URL_CURRENT_COURSES, URL_CURRENT_ACTIVITIES
} from "../config/endpoints"
import { bindParams } from '../utils/format'

export const useListCourses = (params, options) => {
  const url = !!params ? `${URL_COURSES}?${bindParams(params)}` : URL_COURSES

  return useQuery(
    ['courses', { ...params }],
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
export const useCourse = id => {
  return useQuery(
    ['course', id],
    () => api.get(`${URL_COURSES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddCourse = () => {
  return useMutation({
    mutationFn: data => api.post(URL_COURSES, data),
  })
}

export const useMutationUpdateCourse = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_COURSES}/${id}`, data),
  })
}

// export const useMutationRemoveCourse = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_COURSES}/${id}`),
//   })
// }

// ======================== Current Courses ========================
export const useListCurrentCourses = (params, options) => {
  const url = !!params ? `${URL_CURRENT_COURSES}?${bindParams(params)}` : URL_CURRENT_COURSES

  return useQuery(
    ['current-courses', { ...params }],
    () => api.get(url),
    {
      staleTime: 10 * 60 * 1000,  // same as cacheTime
      // cacheTime: 10 * 60 * 1000,  // default 10min
      select: data => {
        if (!options?.isCustom && !options?.customFields)
          return data

        if (options?.customFields && options?.customFields?.length > 0) {

          return data?.map(item => {
            const resultObj = {}

            for (const field of options?.customFields) {
              resultObj[field] = item?.[field]
            }
            return resultObj
          })
        }

        return data?.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      }
    },
  )
}

// Tạm thời bỏ qua vấn đề prefetching, chỉ viết hàm fetch bth trước
export const useCurrentCourse = id => {
  return useQuery(
    ['current-course', id],
    () => api.get(`${URL_CURRENT_COURSES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddCurrentCourse = () => {
  return useMutation({
    mutationFn: data => api.post(URL_CURRENT_COURSES, data),
  })
}

export const useMutationUpdateCurrentCourse = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_CURRENT_COURSES}/${id}`, data),
  })
}

// export const useMutationRemoveCourse = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_CURRENT_COURSES}/${id}`),
//   })
// }

// ======================== Current Courses ========================
export const useListCurrentActivities = (params, options) => {
  const url = !!params ? `${URL_CURRENT_ACTIVITIES}?${bindParams(params)}` : URL_CURRENT_ACTIVITIES

  return useQuery(
    ['current-activities', { ...params }],
    () => api.get(url),
    {
      staleTime: 10 * 60 * 1000,  // same as cacheTime
      // cacheTime: 10 * 60 * 1000,  // default 10min
      select: data => {
        if (!options?.isCustom && !options?.customFields)
          return data

        if (options?.customFields && options?.customFields?.length > 0) {

          return data?.map(item => {
            const resultObj = {}

            for (const field of options?.customFields) {
              resultObj[field] = item?.[field]
            }
            return resultObj
          })
        }

        return data?.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
      }
    },
  )
}

// Tạm thời bỏ qua vấn đề prefetching, chỉ viết hàm fetch bth trước
export const useCurrentActivity = id => {
  return useQuery(
    ['current-activity', id],
    () => api.get(`${URL_CURRENT_ACTIVITIES}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddCurrentActivity = () => {
  return useMutation({
    mutationFn: data => api.post(URL_CURRENT_ACTIVITIES, data),
  })
}

export const useMutationUpdateCurrentActivity = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_CURRENT_ACTIVITIES}/${id}`, data),
  })
}

// export const useMutationRemoveActivity = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_CURRENT_ACTIVITIES}/${id}`),
//   })
// }