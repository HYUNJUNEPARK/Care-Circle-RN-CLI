import { useContext } from 'react';
import { AlertContext } from './TextModalProvider';

/**
 * 텍스트 모달을 제어하기 위한 커스텀 훅
 */

function useTextModal() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useTextModal must be used within a TextModalProvider');
    }
    return context;
}

export default useTextModal;