import React, { createContext, useEffect, useMemo, useState, useCallback } from "react";
import { onAuthStateChanged, type User, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseAuth";
import { getLoginUserInfo, signOut } from '../network/apis/userApis';
import type { UserInfo } from '../types/local/UserInfo';
import { getCustomToken } from "../network/apis/tokenApis";

/**
 * 인증 관련 상태를 제공하는 Context의 값 타입
 */
type AuthContextValue = {
    userInfo: UserInfo | null; // 서버에서 가져온 로그인 사용자 정보 (로그아웃 시 null)
    user: User | null; // Firebase에서 가져온 사용자 정보 (로그아웃 시 null)
    isLoading: boolean;     // 로그인 처리 중 여부
    isLoggedIn: boolean;    // 로그인 여부
    error: Error | null;   // 인증 관련 에러 메시지
    customToken: string | null; // 서버에서 발급받은 커스텀 토큰 (로그아웃 시 null)
    reloadCureentUser: () => Promise<void>; // 현재 사용자 정보 새로고침 함수
    logInWithEmail: (email: string, password: string) => Promise<boolean>; // 로그인 함수
    logOut: () => void; // 로그아웃 함수
};

/**
 * 인증 상태를 전역으로 관리하기 위한 Context
 */
export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Firebase 인증 상태를 React Context로 관리하는 Provider 컴포넌트
 * 
 * 주요 기능:
 * - Firebase Auth 상태 변화 실시간 감지
 * - 애플리케이션 전역에서 사용자 인증 정보 제공
 * - 로그인/로그아웃 상태 자동 동기화
 * 
 * @param children 하위 컴포넌트들
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [customToken, setCustomToken] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

    // Firebase 인증 상태 변화를 감지하고 React 상태와 동기화
    useEffect(() => {
        // Firebase Auth 상태 변화 리스너 등록
        // 사용자 로그인/로그아웃 시 자동으로 user 상태 업데이트
        const unsub = onAuthStateChanged(auth, (user) => {
            console.log('AuthProvider - onAuthStateChanged', user?.email);
            setUser(user);
        });
        // 컴포넌트 언마운트 시 리스너 정리 (메모리 누수 방지)
        return () => unsub();
    }, []);

    const reloadCureentUser = useCallback(async () => {
        if (auth.currentUser) {
            console.info('called AuthProvider - reloadCurrentUser');
            await auth.currentUser.reload();
            setUser({ ...auth.currentUser });
        }
    }, []);

    /**
     * 로그인 처리:
     * - Firebase 인증 처리 (signInWithEmailAndPassword)
     * - 로그인 성공 시 서버에서 사용자 정보 동기화 (getLoginUserInfo)
     */
    const logInWithEmail = useCallback(async (email: string, password: string): Promise<boolean> => {
        console.info('called AuthProvider - loginWithEmail');

        setIsLoading(true);
        setError(null);
        try {
            // 1. Firebase 인증
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // 2. Custom Token 발급 (Firebase ID Token)
            const idToken = await userCredential.user.getIdToken();
            const customToken = await getCustomToken(idToken);

            // 3. 서버 사용자 정보
            const userInfo = await getLoginUserInfo();
            setUserInfo(userInfo);
            setCustomToken(customToken);
            setIsLoading(false);
            return true;
        } catch (error) {
            console.error('login error:', error);
            auth.signOut(); // 로그인 실패 시 Firebase 로그아웃 처리 (세션 초기화)
            setCustomToken(null);
            setUserInfo(null);
            setError(error as Error);
            setIsLoading(false);
            return false;
        }
    }, []);

    /**
     * 로그아웃 처리:
     * - 서버 로그아웃 처리 (signOut)
     * - Firebase에서 로그아웃 처리
     */
    const logOut = useCallback(async () => {
        console.info('called AuthProvider - logout');

        try {
            // 1. 서버 로그아웃 처리: Firebase 로그아웃 처리를 뒤에 해야 헤더에 토큰이 들어감
            await signOut();
        } catch (error) {
            console.error('logout error:', error);
        } finally {
            // 2. Firebase 로그아웃 처리(네트워크 통신 안해서 finally에서 처리)
            await auth.signOut();
            setUserInfo(null);
            setCustomToken(null);
        }
    }, []);

    // user 상태가 변경될 때마다 새로운 context 값 생성 (성능 최적화)
    const value = useMemo<AuthContextValue>(
        () => ({
            userInfo,
            user,
            isLoading,
            isLoggedIn: !!user,
            error,
            customToken,
            reloadCureentUser,
            logInWithEmail,
            logOut
        }),
        [userInfo, user, isLoading, error, customToken, reloadCureentUser, logInWithEmail, logOut]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}