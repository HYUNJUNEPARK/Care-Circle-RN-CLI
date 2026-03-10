import React from 'react';
import { View, Text, TextInput } from 'react-native';

interface LabeledCounterInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    maxLength?: number | null;
    placeholder?: string;
    autoFocus?: boolean;
    style?: object;
}

function LabeledCounterInput({
    label,
    value,
    onChangeText,
    maxLength = null,
    placeholder,
    autoFocus,
    style
}: LabeledCounterInputProps) {
    return (
        <View
            style={{ ...style }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 8,
                }}
            >
                {/* 라벨 */}
                <Text style={{ fontSize: 14, color: '#888888' }}>{label}</Text>
                {/* 글자 수 카운터 */}
                {maxLength != null && (
                    <Text style={{ fontSize: 14, color: '#888888' }}>
                        {value.length}/{maxLength}
                    </Text>
                )}
            </View>
            <TextInput
                value={value}
                onChangeText={(text) => {
                    if (maxLength != null) {
                        if (text.length <= maxLength) {
                            onChangeText(text);
                        }
                    } else {
                        onChangeText(text);
                    }
                }}
                {...(maxLength != null ? { maxLength } : {})} // maxLength가 null이 아닐 때만 TextInput에 maxLength 속성을 동적으로 추가
                style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#111111',
                    paddingVertical: 8,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                }}
                placeholder={placeholder}
                placeholderTextColor={"#cccccc"}
                autoFocus={autoFocus}
            />
        </View>
    );
}

export default LabeledCounterInput;
