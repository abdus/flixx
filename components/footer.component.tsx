import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

export function Footer() {
  return (
    <>
      <View style={styles.footer}>
        <Text style={styles.text}>
          Flixx App. Data provided by The Movie Database
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    marginTop: 30,
    backgroundColor: '#e6dbff'
  },
  text: {
    color: '#7d7c9e',
    fontSize: 13
  },
});
