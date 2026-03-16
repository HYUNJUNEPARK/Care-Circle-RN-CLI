import { ApiResponse } from "./ApiResponse";

export interface FcmToken {
    fcmToken: string;
    platform: string;
};

export type FcmTokenResponse = ApiResponse<FcmToken>;