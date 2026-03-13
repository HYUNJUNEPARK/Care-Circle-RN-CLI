import axios from "axios";
import { firebaseAuthErrorMessageMap } from "./firebaseAuthErrorMessageMap";
import { axiosErrorMessageMap } from "./axiosErrorMessageMap";

type FirebaseErrorLike = {
    code: string;
    message: string;
    name?: string;
};

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

function isFirebaseError(e: unknown): e is FirebaseErrorLike {
    if (typeof e === "object" && e !== null) {
        const any = e as Record<string, unknown>;
        return (
            typeof any["code"] === "string" &&
            typeof any["message"] === "string" &&
            typeof any["name"] === "string"
        );
    }
    return false;
}