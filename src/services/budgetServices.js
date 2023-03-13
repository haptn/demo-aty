import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import {
  URL_BUDGET_PLAN,
  URL_BUDGET_PRACTICAL,
  URL_BUDGET_PRACTICAL_COST,
  URL_BUDGET_PRACTICAL_REVENUE
} from "../config/endpoints"
import { bindParams } from '../utils/format'


// ========================== URL_BUDGET_PLAN ==========================
export const useListBudgetPlan = (params, options) => {
  const url = !!params ? `${URL_BUDGET_PLAN}?${bindParams(params)}` : URL_BUDGET_PLAN

  return useQuery(
    ['list-budget-plan', { ...params }],
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
export const useBudgetPlan = id => {
  return useQuery(
    ['budget-plan', id],
    () => api.get(`${URL_BUDGET_PLAN}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddBudgetPlan = () => {
  return useMutation({
    mutationFn: data => api.post(URL_BUDGET_PLAN, data),
  })
}

// export const useMutationRemoveBudgetPlan = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_BUDGET_PLAN}/${id}`),
//   })
// }

export const useMutationUpdateBudgetPlan = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_BUDGET_PLAN}/${id}`, data),
  })
}

// ========================== URL_BUDGET_PRACTICAL ==========================
export const useListPracticalBudget = (params, options) => {
  const url = !!params ? `${URL_BUDGET_PRACTICAL}?${bindParams(params)}` : URL_BUDGET_PRACTICAL

  return useQuery(
    ['list-practical-budget', { ...params }],
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
export const usePracticalBudget = id => {
  return useQuery(
    ['practical-budget', id],
    () => api.get(`${URL_BUDGET_PRACTICAL}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddPracticalBudget = () => {
  return useMutation({
    mutationFn: data => api.post(URL_BUDGET_PRACTICAL, data),
  })
}

// export const useMutationRemovePracticalBudget = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_BUDGET_PRACTICAL}/${id}`),
//   })
// }

export const useMutationUpdatePracticalBudget = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_BUDGET_PRACTICAL}/${id}`, data),
  })
}

// ========================== URL_BUDGET_PRACTICAL_COST ==========================
export const useListPracticalCost = (params, options) => {
  const url = !!params ? `${URL_BUDGET_PRACTICAL_COST}?${bindParams(params)}` : URL_BUDGET_PRACTICAL_COST

  return useQuery(
    ['list-practical-cost', { ...params }],
    () => api.get(url),
    {
      staleTime: 10 * 60 * 1000,  // same as cacheTime
      // cacheTime: 10 * 60 * 1000,  // default 10min
      enabled: options?.enabled,
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
export const usePracticalCost = id => {
  return useQuery(
    ['practical-cost', id],
    () => api.get(`${URL_BUDGET_PRACTICAL_COST}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddPracticalCost = () => {
  return useMutation({
    mutationFn: data => api.post(URL_BUDGET_PRACTICAL_COST, data),
  })
}

// export const useMutationRemovePracticalCost = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_BUDGET_PRACTICAL_COST}/${id}`),
//   })
// }

export const useMutationUpdatePracticalCost = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_BUDGET_PRACTICAL_COST}/${id}`, data),
  })
}

// ========================== URL_BUDGET_PRACTICAL_REVENUE ==========================
export const useListPracticalRevenue = (params, options) => {
  const url = !!params ? `${URL_BUDGET_PRACTICAL_REVENUE}?${bindParams(params)}` : URL_BUDGET_PRACTICAL_REVENUE

  return useQuery(
    ['list-practical-revenue', { ...params }],
    () => api.get(url),
    {
      staleTime: 10 * 60 * 1000,  // same as cacheTime
      // cacheTime: 10 * 60 * 1000,  // default 10min
      enabled: options?.enabled,
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
export const usePracticalRevenue = id => {
  return useQuery(
    ['practical-revenue', id],
    () => api.get(`${URL_BUDGET_PRACTICAL_REVENUE}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddPracticalRevenue = () => {
  return useMutation({
    mutationFn: data => api.post(URL_BUDGET_PRACTICAL_REVENUE, data),
  })
}

// export const useMutationRemovePracticalRevenue = () => {
//   return useMutation({
//     mutationFn: id => api.delete(`${URL_BUDGET_PRACTICAL_REVENUE}/${id}`),
//   })
// }

export const useMutationUpdatePracticalRevenue = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_BUDGET_PRACTICAL_REVENUE}/${id}`, data),
  })
}