import axios from "axios";
import { FirebaseError } from "firebase/app";
import { firebaseAuthErrorMessageMap } from "./firebaseAuthErrorMessageMap";
import { axiosErrorMessageMap } from "./axiosErrorMessageMap";

export interface ApiErrorResponse {
    success: boolean;
    code: string;
    message: string;
    userMessage: string;
}

/**
 * 에러 처리 함수
 */
export default function handleError(error?: Error | unknown): string {
    try {
        if (!error) return "";

        if (axios.isAxiosError(error)) {
            //API 서버 에러 처리

            //서버 에러 포맷
            const data = error.response?.data;

            let errorMessage;
            if (isApiErrorResponse(data)) {
                const ec = data?.code ?? 'UK';
                const errorMsg = data?.userMessage ?? data?.message ?? `알 수 없는 오류가 발생했습니다.\n(code: ax-${ec})`;
                errorMessage = errorMsg;
            } else {
                const errorMsg = axiosErrorMessageMap[error.code ?? ''] ?? `알 수 없는 오류가 발생했습니다.\n(code: ax-${error.code})`;
                errorMessage = errorMsg;
            }
            return errorMessage;
        } else if (isFirebaseError(error)) {
            //Auth 서버 에러 처리
            console.info('handleError firebaseError', error);
            return firebaseAuthErrorMessageMap[error.code] ?? `알 수 없는 오류가 발생했습니다.\n(code: fb-${error.code})`;
        } else {
            const e = error as Error
            console.info('handleError else error', e);
            return e.message;
        }
    } catch (error) {
        console.info('handleError try-catch', error);
        return `알 수 없는 오류가 발생했습니다.\n(code: unk-he)`
    }

}

export function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
    if (typeof data !== "object" || data === null) {
        return false;
    }

    const record = data as Record<string, unknown>;

    return (
        typeof record.success === "boolean" &&
        typeof record.code === "string" &&
        typeof record.message === "string"
    );
}

function isFirebaseError(e: unknown): e is FirebaseError {
    // 웹 SDK에서는 보통 `instanceof FirebaseError`가 동작하지만,
    // 번들/중복 의존성 상황에서 깨질 수 있어 shape-check를 같이 둡니다. (확실하지 않음)
    if (e instanceof FirebaseError) return true;

    if (typeof e === "object" && e !== null) {
        const any = e as Record<string, unknown>;
        return (
            typeof any["code"] === "string" &&
            typeof any["message"] === "string" &&
            // FirebaseError는 name이 "FirebaseError"인 경우가 흔함 (SDK/환경에 따라 다를 수 있음)
            (any["name"] === "FirebaseError" || typeof any["name"] === "string")
        );
    }
    return false;
}