// 이미지 파일 타입 선언
// TypeScript에서 png, jpg, jpeg, svg 등 이미지 파일을 import할 때 컴파일 에러를 방지합니다.
// 프로젝트 내에서 이미지 파일을 모듈처럼 사용할 수 있도록 해줍니다.
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module 'react-native-vector-icons/*';