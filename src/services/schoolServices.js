import { useMutation, useQuery } from '@tanstack/react-query'
import api from "../config/api"
import { URL_SCHOOLS } from "../config/endpoints"
import { bindParams } from '../utils/format'

// Ko đc import queryClient ở đây, chỉ đc import trong custom hook hoặc component
// const queryClient = useQueryClient()    // chưa biết có xài hay ko

export default function useSchools(props = {}) {
  const { params, id } = props

  const getList = useQuery(
    ['schools', { ...params }],
    () => api.get(!!params ? `${URL_SCHOOLS}?${bindParams(params)}` : URL_SCHOOLS),
    {
      staleTime: 30 * 1000,   // 30s
      cacheTime: 10 * 60 * 1000,  // 10min
    },
  )

  const get = useQuery(
    ['school', id],
    () => id && api.get(`${URL_SCHOOLS}/${id}`),
    {
      staleTime: 60 * 1000,   // 1 min
    }
  )

  const add = useMutation({
    mutationFn: data => api.post(URL_SCHOOLS, data),
    // Nếu dùng mutateAsync() thay vì mutate() thì ở đây ko cần onSuccess()
  })

  const update = useMutation({
    mutationFn: data => api.patch(`${URL_SCHOOLS}/${id}`, data),  // gọi thử API xem nên pass "id" chỗ này hay ở trên args của hàm 
    // Nếu dùng mutateAsync() thay vì mutate() thì ở đây ko cần onSuccess()
    // onSuccess: (_, {id, name}) => {   // chưa biết có lấy ra đc name này ko
    //   toast.success(`Xóa thành công trường ${name}`)
    //   queryClient.setQueryData(['school', id], data)
    // }
  })

  const remove = useMutation({
    mutationFn: id => api.delete(`${URL_SCHOOLS}/${id}`),  // gọi thử API xem nên pass "id" chỗ này hay ở trên args của hàm 
    // onSuccess: data => {    // viết tạm, chưa đọc docs, ko chắc có chạy đc ko
    //   if (onSuccess && typeof onSuccess === 'function')
    //     onSuccess(data)
    // }
    // onSuccess: (_, name) => {   // chưa biết có lấy ra đc name này ko
    //   toast.success(`Xóa thành công trường ${name}`)
    //   queryClient.invalidateQueries({ queryKey: ['schools', {...params}] })
    // }
  })

  return ({ get, getList, add, update, remove })
}


// export const useListSchools = params => {
//   const url = !!params ? `${URL_SCHOOLS}?${bindParams(params)}` : URL_SCHOOLS

//   return useQuery(
//     ['schools', { ...params }],
//     () => api.get(url),
//     {
//       staleTime: 30 * 1000,   // 30s
//       cacheTime: 10 * 60 * 1000,  // 10min
//     },
//   )
// }

// // Tạm thời bỏ qua vấn đề prefetching, chỉ viết hàm fetch bth trước
// export const useSchool = id => {
//   return useQuery(
//     ['school', id],
//     () => api.get(`${URL_SCHOOLS}/${id}`),
//     {
//       staleTime: 60 * 1000,   // 1 min
//     }
//   )
// }

// export const useSchoolAdding = () => {  // data
//   return useMutation({
//     mutationFn: (data) => api.post(URL_SCHOOLS, data),
//     // Nếu dùng mutateAsync() thay vì mutate() thì ở đây ko cần onSuccess()
//   })
// }

// export const useSchoolUpdating = (id, data) => {
//   return useMutation({
//     mutationFn: (id) => api.patch(`${URL_SCHOOLS}/${id}`, data),  // gọi thử API xem nên pass "id" chỗ này hay ở trên args của hàm 
//     // Nếu dùng mutateAsync() thay vì mutate() thì ở đây ko cần onSuccess()
//     // onSuccess: (_, {id, name}) => {   // chưa biết có lấy ra đc name này ko
//     //   toast.success(`Xóa thành công trường ${name}`)
//     //   queryClient.setQueryData(['school', id], data)
//     // }
//   })
// }

// export const useSchoolRemoving = onSuccess => {  // id,
//   return useMutation({
//     mutationFn: (id) => api.delete(`${URL_SCHOOLS}/${id}`),  // gọi thử API xem nên pass "id" chỗ này hay ở trên args của hàm 
//     onSuccess: data => {    // viết tạm, chưa đọc docs, ko chắc có chạy đc ko
//       if (onSuccess && typeof onSuccess === 'function')
//         onSuccess(data)
//     }
//     // onSuccess: (_, name) => {   // chưa biết có lấy ra đc name này ko
//     //   toast.success(`Xóa thành công trường ${name}`)
//     //   queryClient.invalidateQueries({ queryKey: ['schools', {...params}] })
//     // }
//   })
// }