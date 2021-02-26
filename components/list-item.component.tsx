import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

import STYLE from '../style-constants';

interface IProps {
  image: string;
  name: string;
  k: number;
}

export function ListItem(props: IProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.image_container}>
        <Image style={styles.image} source={{ uri: props.image }} />
      </View>

      <View style={styles.movie_info}>
        <Text
          style={{ textAlign: 'center', color: '#12153D' }}
          category="h5"
          allowFontScaling={true}
        >
          {props.name}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Icon name="star" style={STYLE.icon} fill="gold" />
          <Text style={{ marginLeft: 4, fontSize: 18 }}>8.2</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: STYLE.gutter * 1.7,
    maxWidth: 200,
    margin: STYLE.gutter,
  },

  image_container: {
    maxHeight: 300,
    width: 200,
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 50,
    //transform: [{ rotateZ: '10deg' }],
  },

  movie_info: {
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    marginTop: STYLE.gutter * 1.2,
    paddingLeft: STYLE.gutter / 1.5,
    paddingRight: STYLE.gutter / 1.5,
  },
});
