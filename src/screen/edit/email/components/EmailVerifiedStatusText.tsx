import React from 'react';
import { View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface EmailVerifiedStatusTextProps {
    style?: object;
    verified?: boolean;
}

const EmailVerifiedStatusText = ({ style, verified }: EmailVerifiedStatusTextProps) => {
    return verified ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
            <MaterialIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={{ marginLeft: 4, color: '#4CAF50' }}>이메일이 인증되었습니다.</Text>
        </View>
    ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', ...style }}>
            <MaterialIcons name="error" size={20} color="#F44336" />
            <Text style={{ marginLeft: 4, color: '#F44336' }}>이메일이 인증되지 않았습니다.</Text>
        </View>
    );
};

export default EmailVerifiedStatusText;
