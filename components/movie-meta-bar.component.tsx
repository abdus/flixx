import React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

import STYLES from '../style-constants';

interface IProps {
  voteAverage: number;
  voteCount: number;
}

export function MovieMetaBar(props: IProps) {
  return (
    <>
      <Animated.View style={styles.bar}>
        <View style={styles.bar_child}>
          <Icon name="star" style={STYLES.icon} fill="gold" />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>{props.voteAverage}</Text>
            /10
          </Text>
          <Text style={styles.small_text}>{props.voteCount}</Text>
        </View>

        <View style={styles.bar_child}>
          <Icon name="star-outline" style={STYLES.icon} fill="gray" />
          <Text style={styles.text}>Rate This</Text>
        </View>

        <View style={styles.bar_child}>
          <GreenTextBG rating={props.voteAverage && props.voteAverage * 10} />
          <Text style={styles.text}>Metascore</Text>
        </View>
      </Animated.View>
    </>
  );
}

function GreenTextBG(props: { rating: number }) {
  console.log(props.rating)
  return (
    <View
      style={[
        styles.green_text_bg,
        {
          backgroundColor:
            props.rating > 65
              ? '#51CF66'
              : props.rating < 35
              ? '#CF5151'
              : '#CCCF51',
        },
      ]}
    >
      <Text style={styles.green_text_fg}>{props.rating}</Text>
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
