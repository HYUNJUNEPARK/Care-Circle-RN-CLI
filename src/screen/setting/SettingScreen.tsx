import { BackHandler, TouchableOpacity, View, ScrollView } from 'react-native';
import useBackHandler from '../../hooks/useBackHandler';
import useTextModal from '../../components/modals/useTextModal';
import useAuth from '../../auth/useAuth';
import { Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PRIVACY_URL, TERMS_URL } from '../../consts/url';
import CircleProfileImage from '../../components/images/CircleProfileImage';
import RoundedButton from '../../components/buttons/RoundedButton';

enum SettingType {
    WEBVIEW,
    ANNOUNCEMENT,
}

type SettingItem = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    type?: SettingType;
    path?: string;
    url?: string;
};

type SettingSection = {
    title?: string;
    items: SettingItem[];
};

const SETTING_ITEM_LIST: SettingSection[] = [
    {
        title: '앱 정보',
        items: [
            { icon: 'megaphone-outline', label: '공지사항', type: SettingType.ANNOUNCEMENT, path: 'Announcement' },
            { icon: 'shield-checkmark-outline', label: '개인 정보 처리 방침', type: SettingType.WEBVIEW, path: 'WebviewViewer', url: PRIVACY_URL },
            { icon: 'document-text-outline', label: '이용 약관', type: SettingType.WEBVIEW, path: 'WebviewViewer', url: TERMS_URL },
        ],
    },
];

export default function SettingsScreen({ navigation }: any) {
    const state = navigation.getState();
    const routes = state.routes;
    const { showAlert } = useTextModal();
    const { userInfo, user } = useAuth();

    useBackHandler({
        onBackPress: () => {
            // 네비게이션 스택에 뒤로 갈 화면이 없거나, 루트 스택이 바로 아래에 있을 때
            if (!navigation.canGoBack() || routes.length === 2) {
                showAlert({
                    title: '앱을 종료하시겠습니까?',
                    message: '앱을 종료하려면 확인을 눌러주세요.',
                    onConfirmAction: () => {
                        BackHandler.exitApp();
                    }
                });
                return true;
            }
            navigation.goBack();
            return true;
        }
    });

    return (
        <ScrollView>
            <View style={{ paddingVertical: 16, paddingHorizontal: 12 }}>
                {userInfo ? (
                    //로그인 상태 사용자 프로필 화면
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Profile');
                        }}
                        activeOpacity={0.6}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingVertical: 16,
                            paddingHorizontal: 12,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 12,
                            borderBottomColor: '#E8E8E8',
                        }}
                    >
                        <CircleProfileImage
                            imgUrl={user?.photoURL}
                            size={26}
                        />
                        <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: '#191919', marginLeft: 12 }}>
                            {user?.displayName ?? user?.email}
                        </Text>
                        <Text style={{ fontSize: 22, color: '#C4C4C4' }}>›</Text>
                    </TouchableOpacity>
                ) : (
                    //미로그인 시 로그인 화면
                    <View
                        style={{
                            flexDirection: 'column',
                            paddingVertical: 16,
                            paddingHorizontal: 12,
                            backgroundColor: '#FFFFFF',
                            borderRadius: 12,
                            borderBottomColor: '#E8E8E8',
                        }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#191919', marginBottom: 24 }}>
                            로그인하고 더 많은 기능을 이용해보세요.
                        </Text>

                        <RoundedButton
                            buttonText='로그인 하기'
                            style={{ borderRadius: 6 }}
                            onPress={() => {
                                navigation.navigate('SignIn');
                            }} />
                    </View>
                )}

                {/* 공통화면 */}
                {SETTING_ITEM_LIST.map((section, idx) => (
                    <View key={idx}>
                        {section.title && (
                            <Text style={{
                                fontSize: 13,
                                fontWeight: '500',
                                color: '#8C8C8C',
                                marginTop: 20,
                                marginBottom: 6,
                                marginLeft: 4,
                            }}>
                                {section.title}
                            </Text>
                        )}
                        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden' }}>
                            {section.items.map((item, itemIdx) => {
                                const isFirst = itemIdx === 0;
                                const isLast = itemIdx === section.items.length - 1;
                                return (
                                    <TouchableOpacity
                                        key={item.label}
                                        onPress={() => {
                                            switch (item.type) {
                                                case SettingType.WEBVIEW:
                                                    if (item.url) {
                                                        navigation.navigate(item.path, { uri: item.url });
                                                    }
                                                    break;
                                                default:
                                                    navigation.navigate(item.path);
                                                    break;
                                            }
                                        }}
                                        activeOpacity={0.6}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingVertical: 16,
                                            paddingHorizontal: 12,
                                            backgroundColor: '#FFFFFF',
                                            borderTopLeftRadius: isFirst ? 12 : 0,
                                            borderTopRightRadius: isFirst ? 12 : 0,
                                            borderBottomLeftRadius: isLast ? 12 : 0,
                                            borderBottomRightRadius: isLast ? 12 : 0,
                                            borderBottomColor: '#E8E8E8',
                                        }}
                                    >
                                        <Ionicons
                                            name={item.icon}
                                            size={24}
                                            color="#191919"
                                            style={{ width: 32, textAlign: 'center', marginRight: 12 }}
                                        />
                                        <Text style={{ flex: 1, fontSize: 16, fontWeight: '500', color: '#191919' }}>
                                            {item.label}
                                        </Text>
                                        <Text style={{ fontSize: 22, color: '#C4C4C4' }}>›</Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}