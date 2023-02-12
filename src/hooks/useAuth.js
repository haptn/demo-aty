import { getLocal } from "../utils/storage"
import { keys, userRole } from "../config/constants"

export const useAuth = () => {
  const user = getLocal(keys.USER)

  return {
    isAuthen: !!user,
    isAdmin: !!user && user?.role === userRole.ADMIN,
    isSchoolAdmin: !!user && user?.role === userRole.SCHOOL_ADMIN,
    isRemembered: user?.isRemembered
  }
}