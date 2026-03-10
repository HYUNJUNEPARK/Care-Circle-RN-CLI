export const axiosErrorMessageMap: Record<string, string> = {
    "ERR_NETWORK": "네트워크 연결을 확인해 주세요.", //네트워크 단계에서 실패, 서버 응답을 받지 못함(CORS 차단 서버 다운 / 도메인 오류 HTTPS / 인증서 문제 VPN / 방화벽)
    "ECONNABORTED": "요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.", //서버 응답 지연
    // 요청 취소
    "ERR_CANCELED": "요청이 취소되었습니다.",
    // 요청 설정
    "ERR_INVALID_URL": "잘못된 요청 주소입니다.", //URL 형식이 잘못됨
    "ERR_BAD_OPTION": "요청 설정에 문제가 발생했습니다.", //지원하지 않는 옵션 키 사용
    "ERR_BAD_OPTION_VALUE": "요청 설정 값이 올바르지 않습니다.", //Axios 옵션 값이 오입력
    "ERR_NOT_SUPPORT": "현재 환경에서 지원되지 않는 요청입니다.", //현재 환경에서 지원하지 않는 기능
    // 요청/응답 처리 단계
    "ERR_BAD_REQUEST": "요청 처리 중 오류가 발생했습니다.", //e.g. 요청 직렬화 실패
    "ERR_BAD_RESPONSE": "서버 응답을 처리할 수 없습니다.", //JSON 파싱 오류, 예상과 다른 응답 포맷
};