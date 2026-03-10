import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface PlainTabProps {
  onPress?: () => void;
  label: string;
  textColor?: string;
}

function PlainTab({
  onPress,
  label,
  textColor = '#2b2b2b'
}: PlainTabProps) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'column', width: '100%' }}
      {...(onPress ? { activeOpacity: 0.7, onPress } : {})}
      onPress={onPress}
    >
      <View style={{ width: '100%', height: 1, backgroundColor: '#eee' }} />
      <Text
        style={{ color: textColor, fontSize: 16, fontWeight: '500', marginVertical: 18 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}


export default PlainTab;
