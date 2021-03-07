import React from 'react';
import { View, Animated, Image, Dimensions, StyleSheet } from 'react-native';
import { Easing, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

import STYLES from '../style-constants';

interface IProps {
  movieId: number;
  imagePath: string;
  title?: string;
  tagline: string;
}

export function GridItem(props: IProps) {
  const navigation = useNavigation();
  const paddingRef = React.useRef(STYLES.gutter / 3);
  const IMAGE_BASE = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';
  const [imgDimension, setImgDimension] = React.useState<[number, number]>();
  const windowWidthRef = React.useRef(Dimensions.get('window').width);
  const imageUrlRef = React.useRef(`${IMAGE_BASE}${props.imagePath}`);
  const fadeInAnim = React.useRef(new Animated.Value(0)).current;

  // set width and height of the image accoring to screen size
  React.useEffect(() => {
    const ratio = 900 / 600; // height / width
    const width = (windowWidthRef.current - 4 * paddingRef.current) / 2;
    const height = width * ratio;
    setImgDimension([width, height]);
  }, [props.imagePath]);

  // animation
  React.useEffect(() => {
    Animated.timing(fadeInAnim, {
      useNativeDriver: true,
      toValue: 1,
      easing: Easing.exp,
    }).start();
  }, [fadeInAnim]);

  if (!props.imagePath) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={{ padding: paddingRef.current, opacity: fadeInAnim }}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Movie', { movieId: props.movieId })
          }
        >
          <Image
            style={[
              styles.image,
              imgDimension && {
                width: imgDimension[0],
                height: imgDimension[1],
              },
            ]}
            width={imgDimension?.[0]}
            height={imgDimension?.[1]}
            source={{ uri: imageUrlRef.current }}
          />
          {imgDimension && props.title && (
            <View>
              <Text category="h6" style={styles.text_label}>
                {props.title}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    maxWidth: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },

  text_label: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: STYLES.gutter / 2,
    backgroundColor: '#141414',
    color: '#ffffff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
