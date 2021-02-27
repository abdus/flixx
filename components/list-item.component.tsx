import React from 'react';
import { StyleSheet, Image, View, Animated, Easing } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';

import STYLE from '../style-constants';

export interface IListItem {
  image: string;
  name: string;
  currentlyViewable: number;
  index: number;
  flatListRef: any;
}

export function ListItem(props: IListItem) {
  const ANIMATION_DURATION = 300;
  const ScaleAnime = React.useRef(new Animated.Value(1)).current;
  const RotateAnime = React.useRef(new Animated.Value(0)).current;
  const FadeAnime = React.useRef(new Animated.Value(0.3)).current;

  function calculateRotate(currentIndex: number, itemIndex: number): number {
    let returnable = 0;
    if (currentIndex === itemIndex) {
      returnable = 0;
    } else if (currentIndex > itemIndex) {
      returnable = -1;
    } else if (currentIndex < itemIndex) {
      returnable = 1;
    }

    return returnable;
  }

  React.useEffect(() => {
    Animated.timing(ScaleAnime, {
      toValue: props.currentlyViewable !== props.index ? 0.9 : 1,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: ANIMATION_DURATION,
    }).start();
  }, [props.currentlyViewable, ScaleAnime, props.index]);

  React.useEffect(() => {
    Animated.timing(RotateAnime, {
      toValue: calculateRotate(props.currentlyViewable, props.index),
      useNativeDriver: true,
      easing: Easing.linear,
      duration: ANIMATION_DURATION,
    }).start();
  }, [RotateAnime, props.currentlyViewable, ScaleAnime, props.index]);

  React.useEffect(() => {
    Animated.timing(FadeAnime, {
      toValue: props.currentlyViewable !== props.index ? 0.3 : 1,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: ANIMATION_DURATION,
    }).start();
  }, [FadeAnime, props.currentlyViewable, ScaleAnime, props.index]);

  React.useEffect(() => {
    if (props.index === props.currentlyViewable) {
      props.flatListRef?.scrollToIndex({
        index: props.currentlyViewable,
        animated: true,
        viewPosition: 0.5
      });
    }
  }, [props.currentlyViewable, props.flatListRef, props.index]);

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity: FadeAnime,
          transform: [
            { scale: ScaleAnime },
            {
              rotate: RotateAnime.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: ['-7deg', '0deg', '7deg'],
              }),
            },
          ],
        },
      ]}
    >
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
    </Animated.View>
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
    paddingLeft: STYLE.gutter,
    paddingRight: STYLE.gutter,
  },
});
