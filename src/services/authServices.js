import { keys, staffStatus } from "../config/constants"
import { getLocal } from "../utils/storage"

// Vì JSON Server ko làm đc chức năng login nên ở đây tui viết tạm hàm này dùng tạm list accounts fetch từ API
export const login = async ({ username, password }, foundAccount) => {
  return new Promise((resolve, reject) => {
    if (foundAccount?.email !== username)
      reject('Tài khoản không tồn tại')

    if (foundAccount?.password !== password)
      reject('Mật khẩu không đúng')

    if (foundAccount?.status !== staffStatus.WORKING)
      reject(`Bạn không được cấp quyền đăng nhập. 
        Nếu bạn cho rằng có sự nhầm lẫn, vui lòng liên hệ admin qua hotline 0284310309.
      `)

    resolve('success')
  })
}

export const logout = () => {
  const user = getLocal(keys.USER)

  // Xử lý sau
  // if (!user?.isRemembered)
  //   removeLocal(keys.USER)
}