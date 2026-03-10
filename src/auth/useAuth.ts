import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

/**
 * AuthProvider 내에서 인증 상태를 사용하기 위한 커스텀 훅
 * @returns 현재 사용자 정보와 로그인 상태
 * @throws AuthProvider 외부에서 사용 시 에러 발생
 */
export default function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}