import { useFocusEffect } from '@react-navigation/native';
import { BackHandler, Platform } from 'react-native';
import { useCallback } from 'react';

interface UseBackHandlerOptions {
  onBackPress: () => boolean;
}

/**
 * 안드로이드 디바이스 백버튼을 스크린 포커스 시에만 커스텀 핸들링하는 훅
 */
export default function useBackHandler({ onBackPress }: UseBackHandlerOptions) {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS == 'android') {
        const handler = () => onBackPress();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handler);
        return () => backHandler.remove();
      }
    }, [onBackPress])
  );
}
