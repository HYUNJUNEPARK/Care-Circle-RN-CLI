import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import RoundedButton from '../../components/buttons/RoundedButton';
import Input from '../../components/inputs/Input';
import colors from '../../styles/colors';
import { useEffect, useState } from 'react';
import { appIcon, appText } from '../../../assets';
// import { storage, StorageKeys } from '../../utils/storage';
import useAuth from '../../auth/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from '../../components/checkbox/Checkbox';
import useRegisterFcmToken from '../../hooks/useRegisterFcmToken';
interface SignInScreenProps {
  navigation: any;
}

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [id, setId] = useState('');
  const [rememberId, setRememberId] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { logInWithEmail, isLoading } = useAuth();
  const { registerToken } = useRegisterFcmToken();

  //최초 진입 시 저장된 아이디 불러오기
  useEffect(() => {
    // //저장된 아이디 불러오기
    // const loadSavedId = async () => {
    //   try {
    //     const savedId = await storage.get<string>(StorageKeys.REMEMBERED_USER_ID);
    //     if (savedId) {
    //       setId(savedId);
    //       setRememberId(true);
    //     }
    //   } catch (e) {
    //     console.log('아이디 불러오기 실패', e);
    //   }
    // };
    // loadSavedId();
  }, []);

  //아이디 기억하기
  useEffect(() => {
    // const updateRememberedId = async () => {
    //   // 체크 해제 시 즉시 삭제
    //   if (!rememberId) {
    //     await storage.remove(StorageKeys.REMEMBERED_USER_ID);
    //   } else {
    //     // 체크를 켰는데 id가 이미 있으면 즉시 저장
    //     if (id.trim()) await storage.set<string>(StorageKeys.REMEMBERED_USER_ID, id.trim());
    //   }
    // };
    // updateRememberedId();
  }, [rememberId]);

  //로그인 처리
  const handleLogin = async () => {
    try {
      if (!id.trim() || !password) return;

      const isSucess = await logInWithEmail(id.trim(), password);
      if (isSucess) {
        // 로그인 성공 시 FCM 토큰 등록
        await registerToken();

        navigation.goBack();
      }

    } catch (e) {
      console.log('로그인 실패', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }} edges={['bottom']}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: colors.background,
          padding: 12,
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 18,
            padding: 22,
            marginBottom: 24,
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Image
              source={appIcon}
              style={{
                width: 60,
                height: 60,
                resizeMode: 'contain',
              }}
            />
            <Image
              source={appText}
              style={{
                width: 100,
                height: 32,
                resizeMode: 'contain',
              }}
            />
          </View>
          <Input
            inputType="plaintext"
            label=""
            placeholder="아이디"
            value={id}
            onChange={setId}
          />
          <Input
            inputType="password"
            label=""
            placeholder="비밀번호"
            value={password}
            onChange={setPassword}
            show={showPassword}
            setShow={setShowPassword}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 8,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Checkbox
                label="아이디 기억하기"
                checked={rememberId}
                onPress={() => setRememberId(!rememberId)}
              />
            </View>
          </View>
          <RoundedButton
            style={{
              marginTop: 52,
            }}
            buttonText='로그인'
            loading={isLoading}
            onPress={handleLogin}
          />
        </View>

        {/* 하단 영역 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 24,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#4b5563',
              marginRight: 8,
            }}
          >
            계정이 없으신가요?
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: colors.primary,
              }}
            >
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
