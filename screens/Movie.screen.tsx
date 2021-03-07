import React from 'react';
import { Animated, StyleSheet, View, Easing } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';

import STYLE from '../style-constants';
import { MovieMetaBar } from '../components/movie-meta-bar.component';
import { CastCard } from '../components/cast-card.component';
import { Spinner } from '../components/spinner.component';
import { YTVideoEmbed } from '../components/youtube-video.component';
import { BackButton } from '../components/back-button.component';
import { NetworkRequest } from '../network-requests';

export default function MovieScreen({ route }: any) {
  const MOVIE_ID = route?.params?.movieId;
  const FadeAnime = React.useRef(new Animated.Value(0)).current;
  const [movie, setMovie] = React.useState<any>();
  const [castAndCrew, setCastAndCrew] = React.useState<any>();
  const [video, setVideo] = React.useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      const immediate = setImmediate(async () => {
        const api = new NetworkRequest();

        {
          const { data } = await api.getAmovie(MOVIE_ID);
          data && setMovie(data);
        }

        {
          const { data } = await api.getCredit(MOVIE_ID);
          data && setCastAndCrew(data);
        }

        {
          const { data } = await api.getVideos(MOVIE_ID);
          data && setVideo((data as any).results[0]);
        }
      });

      return () => {
        setMovie(undefined);
        setCastAndCrew(undefined);
        setVideo(undefined);
        clearImmediate(immediate);
      };
    }, [MOVIE_ID])
  );

  React.useEffect(() => {
    Animated.timing(FadeAnime, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 300,
    }).start();
  });

  if (!movie) {
    return (
      <>
        <Spinner />
        <Text>Name</Text>
      </>
    );
  }

  return (
    <Layout>
      <BackButton style={styles.back_button} />
      <Animated.ScrollView>
        <Animated.Image
          style={styles.image}
          source={{
            uri: `https://www.themoviedb.org/t/p/original/${movie.backdrop_path}`,
          }}
        />

        <MovieMetaBar
          movieId={movie.id}
          voteAverage={movie.vote_average}
          voteCount={movie.vote_count}
        />

        <Animated.View style={[styles.section, { marginTop: 20 }]}>
          <Text category="h4">{movie.title || <Spinner height={20} />}</Text>

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
              {movie.release_date?.split('-')[0]}
            </Text>

            <Text style={{ color: '#9A9BB2', fontSize: 14 }}>
              {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`}
            </Text>
          </View>

          {movie.genres?.length > 0 && (
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
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

        {video && video.site === 'YouTube' && (
          <Animated.View style={[styles.section, { opacity: FadeAnime }]}>
            <YTVideoEmbed youtubeKey={video.key} />
          </Animated.View>
        )}

        <Animated.View style={[{ opacity: FadeAnime }]}>
          <Text style={styles.section} category="h6">
            Cast & Crew
          </Text>

          <Animated.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {castAndCrew?.cast.map((person: any) => (
              <CastCard
                key={person.id + Math.random()}
                originalName={person.name}
                role={person.character}
                image={person.profile_path}
                id={person.id}
              />
            ))}

            {castAndCrew?.crew.map((person: any) => (
              <CastCard
                key={person.id + Math.random()}
                originalName={person.name}
                role={person.job}
                image={person.profile_path}
                id={person.id}
              />
            ))}
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

  back_button: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 1000,
    backgroundColor: '#ffffff90',
    borderRadius: 10,
  },
});
