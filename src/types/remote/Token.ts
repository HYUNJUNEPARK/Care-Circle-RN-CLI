import { ApiResponse } from "./ApiResponse";

export interface CustomToken {
    customToken: string;
};

export type CustomTokenResponse = ApiResponse<CustomToken>;