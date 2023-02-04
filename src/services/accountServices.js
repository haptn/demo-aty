import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { URL_ACCOUNTS } from "../config/endpoints"
import { bindParams } from '../utils/format'

// export default function useAccounts(props = {}) {
//   const { params, id } = props

//   const getList = useQuery(
//     ['accounts', { ...params }],
//     () => api.get(!!params ? `${URL_ACCOUNTS}?${bindParams(params)}` : URL_ACCOUNTS),
//     {
//       staleTime: 30 * 1000,   // 30s
//       cacheTime: 10 * 60 * 1000,  // 10min
//     },
//   )

//   const get = useQuery(
//     ['account', id],
//     () => id && api.get(`${URL_ACCOUNTS}/${id}`),
//     {
//       staleTime: 60 * 1000,   // 1 min
//     }
//   )

//   const add = useMutation({
//     mutationFn: (data) => api.post(URL_ACCOUNTS, data),
//   })

//   const update = useMutation({
//     mutationFn: ({ id, data }) => {
//       return api.patch(`${URL_ACCOUNTS}/${id}`, data)
//     },
//   })

//   const remove = useMutation({
//     mutationFn: (id) => api.delete(`${URL_ACCOUNTS}/${id}`),
//   })

//   return ({ get, getList, add, update, remove })
// }

export const useListAccounts = params => {
  const url = !!params ? `${URL_ACCOUNTS}?${bindParams(params)}` : URL_ACCOUNTS

  return useQuery(
    ['accounts', { ...params }],
    () => api.get(url),
    {
      staleTime: 30 * 1000,   // 30s
      cacheTime: 10 * 60 * 1000,  // 10min
    }
  )
}

export const useAccount = id => {
  return useQuery(
    ['account', id],
    () => api.get(`${URL_ACCOUNTS}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
      enabled: !!id
    }
  )
}

export const useMutationAddAccount = () => {
  return useMutation({
    mutationFn: data => api.post(URL_ACCOUNTS, data),
  })
}

export const useMutationUpdateAccount = () => {
  return useMutation({
    mutationFn: ({ id, data }) => api.patch(`${URL_ACCOUNTS}/${id}`, data),
  })
}