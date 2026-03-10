
import React from 'react';
import { TouchableOpacity, View, Text, GestureResponderEvent, ViewStyle } from 'react-native';
import CircleSpinner from '../loadings/spinner/CircleSpinner';
import colors from '../../styles/colors';

interface RoundedButtonProps {
  enabled?: boolean;
  loading?: boolean;
  buttonText?: string;
  loadingText?: string;
  style?: ViewStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const RoundedButton = ({
  enabled = true,
  loading = false,
  buttonText,
  loadingText,
  style,
  onPress,
}: RoundedButtonProps) => {
  const isDisabled = loading || !enabled;

  return (
    <TouchableOpacity
      style={{
        width: '100%',
        paddingVertical: 16,
        borderRadius: 136,
        height: 52,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isDisabled ? 0.6 : 1,
        ...(style || {}),
      }}
      activeOpacity={0.8}
      disabled={isDisabled}
      onPress={onPress}
    >
      {loading ? (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}>
          {/* RN ActivityIndicator 또는 커스텀 스피너 */}
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
          color: '#fff',
          fontSize: 16,
          fontWeight: '600',
        }}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
};


export default RoundedButton;

