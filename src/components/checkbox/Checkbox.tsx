import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


interface CheckboxProps {
    label?: string;
    checked: boolean;
    onPress: () => void;
    style?: object;
}

export default function Checkbox({
    label,
    checked,
    onPress,
    style
}: CheckboxProps) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 8 }}
                onPress={onPress}
            >
                <View
                    style={{
                        width: 22,
                        height: 22,
                        borderWidth: 2,
                        borderColor: checked ? '#AABC99' : '#999',
                        borderRadius: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: checked ? '#AABC99' : 'transparent',
                        ...style,
                    }}
                >
                    {checked && (
                        <Icon name="check" size={16} color="white" />
                    )}
                </View>

            </TouchableOpacity>
            {label && (
                <Text style={{ marginLeft: 8, fontSize: 16 }}>{label}</Text>
            )}
        </View>
    );
};