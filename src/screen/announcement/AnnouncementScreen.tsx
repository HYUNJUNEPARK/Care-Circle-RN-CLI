import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnnouncementScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>공지사항</Text>
      {/* 공지사항 내용 또는 컴포넌트 추가 */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default AnnouncementScreen;
