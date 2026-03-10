import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../../components/inputs/Input';
import RoundedButton from '../../components/buttons/RoundedButton';
import colors from '../../styles/colors';

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 이메일 형식 간단 체크
    const emailCheckResult = useMemo(() => {
        if (!email) return { result: false, message: '' };
        const re = /\S+@\S+\.\S+/;
        if (re.test(email)) return { result: true, message: '올바른 이메일 형식입니다.' };
        return { result: false, message: '이메일 형식이 올바르지 않습니다.' };
    }, [email]);

    // 비밀번호 일치 여부
    const passwordMatchingStatus = useMemo(() => {
        if (!passwordConfirm) {
            return { result: false, show: false, text: '' };
        }
        if (password.length < 6) {
            return { result: false, show: true, text: '비밀번호는 최소 6자리 이상으로 설정해 주세요.' };
        }
        const result = password === passwordConfirm;
        return {
            result,
            show: true,
            text: result ? '비밀번호가 일치합니다.' : '비밀번호가 일치하지 않습니다.',
        };
    }, [password, passwordConfirm]);

    // 회원가입 버튼 클릭 (비즈니스 로직 없음)
    const handleSignUp = () => {
        // UI용: 버튼 로딩만 예시
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1200);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: '#fff',
                    padding: 12,
                }}
                keyboardShouldPersistTaps="handled" //입력창 외의 버튼 등을 눌러도 키보드가 바로 내려가지 않음
            >
                <View
                    style={{
                        marginBottom: 32,
                    }}
                >
                    <Input
                        inputType="plaintext"
                        label="이메일"
                        placeholder="your@email.com"
                        value={email}
                        onChange={setEmail}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            minHeight: 22,
                            marginLeft: 4,
                            marginBottom: 12,
                            marginTop: 4,
                            textAlign: 'left',
                            color: emailCheckResult.result ? colors.primary : '#e30d0d',
                        }}
                    >
                        {emailCheckResult.message}
                    </Text>
                    <Input
                        inputType="password"
                        label="비밀번호"
                        placeholder="••••••••"
                        value={password}
                        onChange={setPassword}
                        show={showPassword}
                        setShow={setShowPassword}
                    />
                    <Input
                        inputType="password"
                        label="비밀번호 확인"
                        placeholder="••••••••"
                        value={passwordConfirm}
                        onChange={setPasswordConfirm}
                        show={showPasswordConfirm}
                        setShow={setShowPasswordConfirm}
                    />
                    {passwordMatchingStatus.show && (
                        <Text
                            style={{
                                fontSize: 12,
                                minHeight: 22,
                                marginLeft: 4,
                                marginBottom: 12,
                                marginTop: 4,
                                textAlign: 'left',
                                color: passwordMatchingStatus.result ? colors.primary : '#e30d0d',
                            }}
                        >
                            {passwordMatchingStatus.text}
                        </Text>
                    )}
                </View>

                <View
                    style={{
                        marginTop: 'auto',
                    }}
                >
                    <RoundedButton
                        onPress={handleSignUp}
                        loading={isLoading}
                        buttonText="회원가입"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

