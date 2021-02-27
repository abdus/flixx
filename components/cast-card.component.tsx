import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

import STYLE from '../style-constants';

export function CastCard() {
  return (
    <View style={{ padding: STYLE.gutter }}>
      <View style={styles.card}>
        <Image
          source={{
            uri:
              'https://image.tmdb.org/t/p/w154/ht1aCYH4q6MB6A12Szf7IfP72Fb.jpg',
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>Actor Name</Text>
      <Text
        style={[styles.text, { color: '#9A9BB2', fontSize: 15, marginTop: 3 }]}
      >
        Role
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 100,
    overflow: 'hidden',
    borderRadius: 10000,
  },

  image: { width: 100, height: 100, resizeMode: 'stretch' },

  text: {
    marginTop: STYLE.gutter / 2,
    textAlign: 'center',
  },
});
