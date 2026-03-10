
import type { UserInfo } from '../types/local/UserInfo';
import type { RemoteUserInfo } from '../types/remote/RemoteUserInfo'

/**
 * DB 데이터를 클라이언트 요구 사항에 맞춰 가공 후 전달
 */
export function converToUser(user: RemoteUserInfo): UserInfo {
  const data: UserInfo = {
    uid: user.uid,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: "-",
    updatedAt: "-",
    lastLoginAt: "-",
    logoutAt: "-",
    passwordResetAt: "-",
    deletedAt: "-"
  };
  return data;
}