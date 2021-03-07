import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import STYLE from '../style-constants';

export function CastCard(props: {
  originalName: string;
  role: string;
  image: string;
  id: number;
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ margin: STYLE.gutter, marginTop: 0, maxWidth: 100 }}
      onPress={() => {
        navigation.navigate('Person', { personId: props.id });
      }}
    >
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/w154' + props.image,
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>{props.originalName}</Text>
      <Text
        style={[styles.text, { color: '#9A9BB2', fontSize: 15, marginTop: 3 }]}
      >
        {props.role}
      </Text>
    </TouchableOpacity>
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
