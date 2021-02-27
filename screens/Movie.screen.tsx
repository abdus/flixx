import React from 'react';
import { Animated, StyleSheet, View, Easing, Dimensions } from 'react-native';
import { Layout, Text, Spinner } from '@ui-kitten/components';

import STYLE from '../style-constants';
import { MovieMetaBar } from '../components/movie-meta-bar.component';
import { CastCard } from '../components/cast-card.component';

const genreArr = ['Crime', 'Drama'];

export default function MovieScreen() {
  const FadeAnime = React.useRef(new Animated.Value(0)).current;
  const [movie, setMovie] = React.useState<any>(null);

  React.useEffect(() => {
    Animated.timing(FadeAnime, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 300,
    }).start();
  }, [FadeAnime]);

  React.useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/550?api_key='
    )
      .then((data) => data.json())
      .then(setMovie)
      .catch(console.error);
  }, []);

  if (!movie) {
    return (
      <Layout
        style={{
          minHeight: Dimensions.get('window').height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spinner size="giant" status="basic" />
      </Layout>
    );
  }

  return (
    <Layout>
      <Animated.ScrollView>
        <Animated.Image
          style={styles.image}
          source={{
            uri: `https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${movie?.backdrop_path}`,
          }}
        />
        <MovieMetaBar
          voteAverage={movie?.vote_average}
          voteCount={movie?.vote_count}
        />
        <Animated.View style={[styles.section, { marginTop: 20 }]}>
          <Text category="h4">{movie?.title}</Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 10,
            }}
          >
            <Text
              style={{
                marginRight: 20,
                color: '#9A9BB2',
                fontSize: 14,
              }}
            >
              {movie?.release_date?.split('-')[0]}
            </Text>
            <Text
              style={{
                marginRight: 20,
                color: '#9A9BB2',
                fontSize: 14,
              }}
            >
              PG-13
            </Text>
            <Text style={{ color: '#9A9BB2', fontSize: 14 }}>2h 13min</Text>
          </View>

          {movie.genres.length > 0 && (
            <Animated.ScrollView
              horizontal
              style={{ marginTop: 20, opacity: FadeAnime }}
            >
              {movie.genres.map((item: { id: number; name: string }) => (
                <View key={item.id} style={styles.genre}>
                  <Text style={{ fontSize: 12 }}>{item.name}</Text>
                </View>
              ))}
            </Animated.ScrollView>
          )}
        </Animated.View>

        <Animated.View style={[styles.section, { opacity: FadeAnime }]}>
          <Text category="h6">Plot Summary</Text>
          <Text style={styles.section_text}>{movie?.overview}</Text>
        </Animated.View>

        <Animated.View style={[styles.section, { opacity: FadeAnime }]}>
          <Text category="h6">Cast & Crew</Text>

          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <CastCard />
            <CastCard />
            <CastCard />
            <CastCard />
            <CastCard />
            <CastCard />
          </Animated.ScrollView>
        </Animated.View>
      </Animated.ScrollView>
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
    marginTop: 5,
  },

  section_text: {
    color: '#737599',
    fontSize: 16,
    marginTop: 6,
    lineHeight: 24,
  },

  genre: {
    padding: STYLE.gutter / 2,
    paddingLeft: STYLE.gutter,
    paddingRight: STYLE.gutter,
    marginRight: 10,
    ...STYLE.border,
    borderColor: 'lightgray',
    borderStyle: 'solid',
    borderRadius: 100,
  },
});
