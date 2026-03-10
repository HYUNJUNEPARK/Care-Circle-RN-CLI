//import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 앱 스코프 prefix
 * (앱이 여러개거나 환경이 다를 경우 충돌 방지)
 */
// const PREFIX = 'circle:';

// /**
//  * 앱에서 사용하는 storage key 정의
//  * 확장 가능
//  */
// export const StorageKeys = {
//   REMEMBERED_USER_ID: 'remembered_user_id',
// } as const;

// type StorageKey = typeof StorageKeys[keyof typeof StorageKeys];

// const buildKey = (key: StorageKey) => `${PREFIX}${key}`;

// export const storage = {
//   /**
//    * 값 저장 (객체 자동 JSON 처리)
//    */
//   async set<T>(key: StorageKey, value: T): Promise<void> {
//     try {
//       const serialized =
//         typeof value === 'string' ? value : JSON.stringify(value);

//       await AsyncStorage.setItem(buildKey(key), serialized);
//     } catch (error) {
//       console.error('[Storage set error]', error);
//       //throw error;
//     }
//   },

//   /**
//    * 값 조회 (자동 JSON 파싱)
//    */
//   async get<T>(key: StorageKey): Promise<T | null> {
//     try {
//       const value = await AsyncStorage.getItem(buildKey(key));
//       if (value === null) return null;

//       try {
//         return JSON.parse(value) as T;
//       } catch {
//         return value as T;
//       }
//     } catch (error) {
//       console.error('[Storage get error]', error);
//       return null;
//     }
//   },

//   /**
//    * 특정 key 삭제
//    */
//   async remove(key: StorageKey): Promise<void> {
//     try {
//       await AsyncStorage.removeItem(buildKey(key));
//     } catch (error) {
//       console.error('[Storage remove error]', error);
//       //throw error;
//     }
//   },

//   /**
//    * 전체 앱 storage 삭제 (prefix 기반)
//    * 주의: 로그아웃 등 전체 초기화 시에만 사용할 것
//    * getAllKeys()는 앱 전체 키를 조회하므로 빈번한 호출 금지
//    */
//   async clearAll(): Promise<void> {
//     try {
//       const keys = await AsyncStorage.getAllKeys();
//       const appKeys = keys.filter((key) => key.startsWith(PREFIX));
//       if (appKeys.length > 0) {
//         await AsyncStorage.multiRemove(appKeys);
//       }
//     } catch (error) {
//       console.error('[Storage clearAll error]', error);
//       throw error;
//     }
//   },
// };