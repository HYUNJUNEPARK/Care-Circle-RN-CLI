import { useState } from 'react';
import { updateNickname as updateNicknameApi } from '../../../network/apis/userApis';

/**
 * 닉네임 변경 훅
 */
export default function useUpdateNickname() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const updateNickname = async (nickname: string) => {
        console.info('updateNickname called with nickname:', nickname);
        
        setLoading(true);
        setError(null);
        try {
            const success = await updateNicknameApi(nickname);
            return success;
        } catch (error) {
            console.error('닉네임 변경 실패:', error);
            setError(error as Error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { updateNickname, loading, error };
}
