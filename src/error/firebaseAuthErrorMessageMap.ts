export const firebaseAuthErrorMessageMap: Record<string, string> = {
    //로그인
    "auth/invalid-credential": "이메일 또는 비밀번호가 올바르지 않습니다.",
    "auth/invalid-login-credentials": "이메일 또는 비밀번호가 올바르지 않습니다.",
    "auth/user-not-found": "등록되지 않은 이메일입니다.",
    "auth/wrong-password": "이메일 또는 비밀번호가 올바르지 않습니다.",
    "auth/user-disabled": "비활성화된 계정입니다. 관리자에게 문의해주세요.",
    //회원가입
    "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
    "auth/weak-password": "비밀번호는 6자 이상이어야 합니다.",
    "auth/invalid-password": "비밀번호 형식이 올바르지 않습니다.",
    "auth/missing-email": "이메일을 입력해주세요.",
    "auth/missing-password": "비밀번호를 입력해주세요.",
    //
    "auth/network-request-failed": "네트워크 연결을 확인해주세요.",
    "auth/invalid-email": "이메일 형식이 올바르지 않습니다.",
    "auth/operation-not-allowed": "현재 회원가입을 사용할 수 없습니다.",
    "auth/too-many-requests": "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
    "auth/internal-error": "일시적인 오류가 발생했습니다. 다시 시도해주세요.",
    "auth/user-token-expired": "토큰이 만료되었습니다."
};