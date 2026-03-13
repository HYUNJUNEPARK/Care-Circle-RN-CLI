import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';

let app;
try {
    app = getApp();
} catch (e) {
    console.warn('Firebase app already initialized, using existing instance.', e);
}

const auth = getAuth(app);

export default auth;