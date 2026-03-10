import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import SignInScreen from '../screen/signin/SignInScreen';
import WebviewViewer from '../screen/viewer/WebviewViewer';
import AnnouncementScreen from '../screen/announcement/AnnouncementScreen';
import SignUpScreen from '../screen/signup/SignUpScreen';
import EditEmailScreen from '../screen/edit/email/EditEmailScreen';
import EditNicknameScreen from '../screen/edit/nickname/EditNicknameScreen';
import ProfileScreen from '../screen/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
                options={{
                    title: '로그인',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="Announcement"
                component={AnnouncementScreen}
                options={{
                    title: '공지사항',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{
                    title: '회원가입',
                    headerTitleAlign: 'center',
                }}
            />
                        <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: '프로필',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="EditNicknameScreen"
                component={EditNicknameScreen}
                options={{
                    title: '닉네임',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="EditEmailScreen"
                component={EditEmailScreen}
                options={{
                    title: '이메일',
                    headerTitleAlign: 'center',
                }}
            />
            <Stack.Screen
                name="WebviewViewer"
                component={WebviewViewer}
                options={{
                    title: "",
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
}
