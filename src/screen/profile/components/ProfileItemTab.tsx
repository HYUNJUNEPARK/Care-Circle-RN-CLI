import React from 'react';
import { View, Text, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ProfileItemTabProps {
    label: string;
    value?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    showArrow?: boolean;
    showVerifiedIcon?: boolean | null;
}

/**
 * 프로필 화면의 항목(닉네임, 이메일 등) 탭 컴포넌트
 */
function ProfileItemTab({
    label,
    value,
    onPress,
    style,
    showArrow = true,
    showVerifiedIcon = null,
}: ProfileItemTabProps) {
    const Container = onPress ? TouchableOpacity : View;
    return (
        <Container
            style={[{ width: '100%', overflow: 'hidden' }, style]}
            {...(onPress ? { activeOpacity: 0.7, onPress } : {})}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#888' }}>{label}</Text>
                    {showVerifiedIcon === true && (
                        <MaterialIcons name="verified" size={16} color="#4caf50" style={{ marginLeft: 4 }} />
                    )}
                    {showVerifiedIcon === false && (
                        <Ionicons name="alert-circle" size={16} color="#ff2600" style={{ marginLeft: 4 }} />
                    )}
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Text style={{ fontSize: 18, color: '#4f4f4f', fontWeight: '500', flex: 1 }}>{value}</Text>
                {showArrow && <MaterialIcons name="chevron-right" size={18} color="#bbb" />}
            </View>

            <View style={{ width: '100%', height: 1, backgroundColor: '#eee', marginVertical: 20 }} />
        </Container>
    );
}

export default ProfileItemTab;
