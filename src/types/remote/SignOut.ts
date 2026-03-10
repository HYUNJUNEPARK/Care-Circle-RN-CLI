export interface SignOutData {
    uid: string;
    logoutAt: string,
    updateAt: string,
}

export interface SignOutResponse {
    success: boolean;
    data: SignOutData;
}