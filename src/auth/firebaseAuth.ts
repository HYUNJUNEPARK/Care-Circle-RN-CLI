import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../config/firebaseConfig';

// Firebase 앱이 이미 초기화되어 있으면 재초기화하지 않음
let app;
try {
    app = initializeApp(firebaseConfig);
} catch (e) {
    // 이미 초기화된 경우 에러 무시
    // @ts-ignore
    app = initializeApp.getApps ? initializeApp.getApps()[0] : null;
    console.warn('Firebase app already initialized, using existing instance.', e);
}

//export const firebaseApp = app;
export const auth = getAuth(app);
