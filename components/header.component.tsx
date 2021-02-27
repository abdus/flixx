import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';

import STYLE from '../style-constants';

export default function Header() {
  return (
    <>
      <Layout style={styles.header}>
        <Hamburger />
        <Icon style={STYLE.icon} fill={STYLE.iconFill} name="search-outline" />
      </Layout>
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
