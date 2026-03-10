import React, { useState } from 'react';
import { Platform, KeyboardAvoidingView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../../auth/useAuth';
import RectangleButton from '../../../components/buttons/RectangleButton';
import LabeledCounterInput from '../../../components/inputs/LabeledCounterInput';
import useUpdateNickname from './useUpdateNickname';
import handleError from '../../../error/handleError';
import Toast from 'react-native-toast-message';

const EditNicknameScreen = () => {
    const { user, reloadCureentUser } = useAuth();
    const [nickname, setNickname] = useState(user?.displayName ?? '');
    const { updateNickname, loading, error } = useUpdateNickname();
    const isButtonEnabled = nickname.trim().length > 0 && nickname !== user?.displayName; // 버튼 활성화 조건: 이름이 1글자 이상이고 기존 닉네임과 다를 때

    const handleUpdateNickname = async () => {
        const isSuccess = await updateNickname(nickname);

        if (isSuccess) {
            await reloadCureentUser();
            Toast.show({ text1: '닉네임이 변경되었습니다.' });
        }
    };

    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: '#ffffff' }}
            edges={['bottom']}
        >
            {/* 하단 저장 버튼이 키보드 위로 올라옴 */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'android' ? 90 : 88} // 헤더 높이에 맞게 조정
            >
                <View
                    style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}>
                    <LabeledCounterInput
                        label="닉네임"
                        value={nickname}
                        onChangeText={setNickname}
                        maxLength={20}
                        placeholder="닉네임을 입력해 주세요"

                    />
                    <Text style={{ color: 'red', marginTop: 16 }}>
                        {handleError(error)}
                    </Text>
                </View>

                <RectangleButton
                    title="등록"
                    loading={loading}
                    enabled={isButtonEnabled}
                    onPress={() => {
                        handleUpdateNickname();
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditNicknameScreen;
