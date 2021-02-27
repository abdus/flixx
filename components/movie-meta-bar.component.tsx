import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

import STYLES from '../style-constants';

export function MovieMetaBar() {
  return (
    <>
      <View style={styles.bar}>
        <View style={styles.bar_child}>
          <Icon name="star" style={STYLES.icon} fill="gold" />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>8.2</Text>
            /10
          </Text>
          <Text style={styles.small_text}>123,232</Text>
        </View>

        <View style={styles.bar_child}>
          <Icon name="star-outline" style={STYLES.icon} fill="gray" />
          <Text style={styles.text}>Rate This</Text>
        </View>

        <View style={styles.bar_child}>
          <GreenTextBG text="86" />
          <Text style={styles.text}>Metascore</Text>
          <Text style={styles.small_text}>123,232</Text>
        </View>
      </View>
    </>
  );
}

function GreenTextBG(props: { text: string }) {
  return (
    <View style={styles.green_text_bg}>
      <Text style={styles.green_text_fg}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    padding: STYLES.gutter,
    paddingLeft: STYLES.gutter * 1.4,
    width: '90%',
    backgroundColor: '#fff',
    marginLeft: 'auto',
    marginRight: 0,
    marginTop: -50,
    borderTopLeftRadius: 400,
    borderBottomLeftRadius: 400,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  bar_child: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 14,
    marginTop: 4,
  },

  small_text: {
    fontSize: 11,
    color: 'gray',
  },

  green_text_bg: {
    padding: 5,
    backgroundColor: '#51CF66',
    borderRadius: 5,
  },

  green_text_fg: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});
