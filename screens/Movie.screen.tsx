import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';

import STYLE from '../style-constants';
import { MovieMetaBar } from '../components/movie-meta-bar.component';

const genreArr = ['Crime', 'Drama'];

export default function MovieScreen() {
  return (
    <Layout>
      <Animated.Image
        style={styles.image}
        source={{
          uri:
            'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/mn9k8zapebAbCqsiKf24juhXjjx.jpg',
        }}
      />
      <MovieMetaBar />
      <Animated.View style={styles.section}>
        <Text category="h4">Ford v Ferrari</Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 10,
          }}
        >
          <Text style={{ marginRight: 20, color: '#9A9BB2', fontSize: 13 }}>
            2019
          </Text>
          <Text style={{ marginRight: 20, color: '#9A9BB2', fontSize: 13 }}>
            PG-13
          </Text>
          <Text style={{ color: '#9A9BB2', fontSize: 14 }}>2h 13min</Text>
        </View>

        <Animated.ScrollView horizontal style={{ marginTop: 20 }}>
          {genreArr.map((a) => (
            <View style={styles.genre}>
              <Text style={{ fontSize: 13 }}>{a}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <Animated.View style={styles.section}>
        <Text category="h6">Plot Summary</Text>
        <Text style={styles.section_text}>
          American car designer Carroll Shelby and driver Kn Miles battle
          corporate interference and the laws of physics to build a
          revolutionary race car for Ford in order.
        </Text>
      </Animated.View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
    borderBottomLeftRadius: 50,
  },

  section: {
    padding: STYLE.gutter,
    marginTop: 20,
  },

  section_text: {
    color: '#737599',
    fontSize: 13,
    marginTop: 6,
    lineHeight: 22,
  },

  genre: {
    padding: STYLE.gutter / 2,
    paddingLeft: STYLE.gutter,
    paddingRight: STYLE.gutter,
    marginRight: 20,
    ...STYLE.border,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 100,
  },
});
