import React, { useState } from 'react';
import { View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../../auth/useAuth';
import RectangleButton from '../../../components/buttons/RectangleButton';
import LabeledCounterInput from '../../../components/inputs/LabeledCounterInput';
import EmailVerifiedStatusText from './components/EmailVerifiedStatusText';

const EditEmailScreen = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState(user?.email ?? '');

    const handleSave = () => {
        console.log('저장된 이메일:', email);
    };

    // 버튼 활성화 조건: 이메일이 1글자 이상일 때
    const isButtonEnabled = email.trim().length > 0;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['bottom']}>
            {/* 하단 저장 버튼이 키보드 위로 올라옴 */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'android' ? 90 : 88}
            >

                <View style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}>
                    <LabeledCounterInput
                        label="이메일"
                        placeholder="이메일을 입력해 주세요"
                        value={email}
                        onChangeText={(inputEmail) => {
                            setEmail(inputEmail);
                        }}
                    />

                    <EmailVerifiedStatusText
                        style={{ marginTop: 12 }}
                        verified={user?.emailVerified}
                    />

                    {/* 안내 텍스트 및 리스트 */}
                    <View style={{ marginTop: 42 }}>
                        <Text style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>
                            등록된 이메일은 다음과 같이 활용됩니다.
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: 4 }}>
                            <Text style={{ color: '#888', fontSize: 13, marginRight: 4 }}>•</Text>
                            <Text style={{ color: '#888', fontSize: 13 }}>
                                비밀번호를 잊어버렸을 때 비밀번호 초기화
                            </Text>
                        </View>
                    </View>
                </View>

                <RectangleButton
                    title="등록"
                    enabled={isButtonEnabled}
                    onPress={() => {
                        handleSave();
                    }}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default EditEmailScreen;