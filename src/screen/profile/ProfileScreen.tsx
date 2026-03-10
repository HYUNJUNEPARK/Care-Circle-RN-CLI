import { View, ScrollView } from 'react-native';
import ProfileItemTab from './components/ProfileItemTab';
import PlainTab from './components/PlainTab';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuth from '../../auth/useAuth';
import useTextModal from '../../components/modals/useTextModal';
import CircleProfileImage from '../../components/images/CircleProfileImage';

interface ProfileScreenProps {
  navigation: any;
}

/**
 * 로그인 사용자 프로필 화면 컴포넌트
 * 로그인한 사용자가 프로필 화면에 접근했을 때 보여지는 화면
 */
const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user, logOut } = useAuth();
  const { showAlert } = useTextModal();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1 }}>

          <CircleProfileImage
            style={{ marginBottom: 24 }}
            imgUrl={user?.photoURL}
            size={62}
          />

          <ProfileItemTab
            label="아이디"
            value={user?.email ?? ''}
            showArrow={false}
          />

          <ProfileItemTab
            label="이메일"
            value={user?.email ?? ''}
            showVerifiedIcon={user?.emailVerified}
            onPress={() => {
              navigation.navigate('EditEmailScreen');
            }}
          />

          <ProfileItemTab
            label="닉네임"
            value={user?.displayName ?? '등록 안함'}
            onPress={() => {
              navigation.navigate('EditNicknameScreen')
            }}
          />
        </View>

        {/* 하단 영역 */}
        <View style={{ marginTop: 'auto', alignItems: 'center' }}>
          <PlainTab
            label="로그아웃"
            onPress={() => {
              showAlert({
                title: '로그아웃',
                message: '정말 로그아웃 하시겠습니까?',
                onConfirmAction: async () => {
                  await logOut();
                  navigation.goBack();
                },
              });
            }}
          />
          <PlainTab
            label="Care Circle 탈퇴"
            textColor='#fa1717'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;