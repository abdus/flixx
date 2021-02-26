import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';

import STYLE from '../style-constants';
import { MovieCategories } from './movie-categories.component';
import { ListItem } from './list-item.component';

const categories = ['Action', 'Crime', 'Comedy', 'Thriller', 'Horror'];
const images = [
  [
    'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mMWLGu9pFymqipN8yvISHsAaj72.jpg',
    "Dorey's Reef Cam",
  ],
  [
    'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg',
    'Lucifer',
  ],
  [
    'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/c59eplVELdwrUfGBUAZVin3HfaL.jpg',
    'Away',
  ],
];

export default function Header() {
  return (
    <>
      <Layout style={styles.header}>
        <Hamburger />
        <Icon style={STYLE.icon} fill={STYLE.iconFill} name="search-outline" />
      </Layout>
      <MovieCategories categories={categories} />
      <Animated.ScrollView horizontal>
        {images.map((d, i) => (
          <ListItem key={i} k={i} image={d[0]} name={d[1]} />
        ))}
      </Animated.ScrollView>
    </>
  );
}

function Hamburger() {
  return (
    <>
      <Layout style={styles.bar_wrapper}>
        <Animated.View style={[styles.bars]} />
        <Animated.View style={[styles.bars, { maxWidth: '70%' }]} />
        <Animated.View style={[styles.bars, { marginBottom: 0 }]} />
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: STYLE.gutter,
    padding: STYLE.gutter,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bar_wrapper: {
    maxWidth: 30,
    width: 30,
  },

  bars: {
    height: 3,
    backgroundColor: STYLE.iconFill,
    borderRadius: 10,
    marginBottom: 7,
  },
});
