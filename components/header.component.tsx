import React from 'react';
import { StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Layout, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import STYLE from '../style-constants';

export default function Header(props: { scrollToSearchBox: () => void }) {
  return (
    <>
      <Layout style={styles.header}>
        <Hamburger />
        <TouchableOpacity onPress={() => props.scrollToSearchBox()}>
          <Icon
            style={STYLE.icon}
            fill={STYLE.iconFill}
            name="search-outline"
          />
        </TouchableOpacity>
      </Layout>
    </>
  );
}

function Hamburger() {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.bar_wrapper}
        onPress={() => navigation.toggleDrawer()}
      >
        <Animated.View style={[styles.bars]} />
        <Animated.View style={[styles.bars, { maxWidth: '70%' }]} />
        <Animated.View style={[styles.bars, { marginBottom: 0 }]} />
      </TouchableOpacity>
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
