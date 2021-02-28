import React from 'react';
import { Animated, View, StyleSheet, Linking } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

import STYLES from '../style-constants';
import { Spinner } from './spinner.component';

interface IProps {
  voteAverage: number;
  voteCount: number;
  movieId: string;
}

export function MovieMetaBar(props: IProps) {
  if (!props.voteAverage || !props.voteCount) {
    return (
      <View style={styles.bar}>
        <Spinner height={30} />
      </View>
    );
  }

  return (
    <>
      <Animated.View style={styles.bar}>
        <View style={styles.bar_child}>
          <Icon name="star" style={STYLES.icon} fill="gold" />
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>{props.voteAverage}</Text>
            /10
          </Text>
        </View>

        <View
          style={styles.bar_child}
          onTouchEnd={() =>
            Linking.openURL('https://www.themoviedb.org/movie/' + props.movieId)
          }
        >
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
