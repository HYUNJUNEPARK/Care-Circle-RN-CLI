import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/home/HomeScreen';
import SettingsScreen from '../screen/setting/SettingScreen';
import colors from '../styles/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';
const Tab = createBottomTabNavigator();


/**
 * 커스텀 탭 버튼 컴포넌트
 * Android에서는 ripple 효과를 제거하기 위해 android_ripple을 null로 설정하고,
 * iOS에서는 눌림 효과를 제거하기 위해 opacity 변화를 1로 고정.
 */
function CustomTabButton(props: any) {
  return (
    <Pressable
      {...props}
      android_ripple={null}
      style={() => [
        props.style,
        { opacity: 1 }, // iOS 눌림 opacity 변화도 제거
      ]}
    />
  );
}


export default function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                animation: 'shift',
                tabBarButton: (props) => <CustomTabButton {...props} />,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: 'gray',

            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name={"home-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }} />
            <Tab.Screen
                name="Setting"
                component={SettingsScreen}
                options={{
                    title: '설정',
                    headerTitleAlign: 'center',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name={"settings-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }} />
        </Tab.Navigator>
    );
}
