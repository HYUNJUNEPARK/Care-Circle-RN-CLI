import { TouchableOpacity, Text, View, ViewStyle } from 'react-native';
import CircleSpinner from '../loadings/spinner/CircleSpinner';
import colors from '../../styles/colors';

interface RectangleButtonProps {
    title: string;
    onPress?: () => void;
    enabled?: boolean;
    style?: ViewStyle;
    loading?: boolean;
    loadingText?: string;
}

function RectangleButton({
    title,
    onPress,
    enabled = true,
    style,
    loading = false,
    loadingText,
}: RectangleButtonProps) {
    const isDisabled = loading || !enabled;
    return (
        <TouchableOpacity
            onPress={isDisabled ? undefined : onPress}
            style={{
                paddingVertical: 18,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: enabled ? colors.primary : '#e8e8e8',
                opacity: isDisabled ? 0.6 : 1,
                ...(style || {}),
            }}
            disabled={isDisabled}
        >
            {loading ? (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12,
                }}>
                    <CircleSpinner />
                    {loadingText ? (
                        <Text style={{
                            color: '#fff',
                            fontSize: 16,
                            marginLeft: 8,
                        }}>{loadingText}</Text>
                    ) : null}
                </View>
            ) : (
                <Text style={{
                    fontSize: 16,
                    color: enabled ? '#ffffff' : '#555555',
                    fontWeight: '600',
                }}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

export default RectangleButton;
