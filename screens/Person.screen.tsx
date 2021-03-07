import React from 'react';
import { Animated, StyleSheet, View, Easing, SafeAreaView } from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { useFocusEffect } from '@react-navigation/native';

import STYLE from '../style-constants';
import { Spinner } from '../components/spinner.component';
import { BackButton } from '../components/back-button.component';
import { MovieGrid } from '../components/grid.component';
import { Footer } from '../components/footer.component';
import { NetworkRequest } from '../network-requests';

import { beautifyDate } from '../utils';

export default function MovieScreen({ route }: any) {
  const CAST_ID = route?.params?.personId;
  const FadeAnime = React.useRef(new Animated.Value(0)).current;
  const [person, setPerson] = React.useState<any>();
  const [personMovie, setPersonMovie] = React.useState<any>();

  useFocusEffect(
    React.useCallback(() => {
      const immediate = setImmediate(async () => {
        const api = new NetworkRequest();
        {
          const { data } = await api.getPersonInfo(CAST_ID);
          setPerson(data);
        }

        {
          const { data } = await api.getPersonsMovieCredit(CAST_ID);
          setPersonMovie([
            ...((data as any)?.cast || []),
            ...((data as any)?.crew || []),
          ]);
        }
      });

      return () => {
        setPerson(undefined);
        FadeAnime.setValue(0);
        clearImmediate(immediate);
      };
    }, [CAST_ID])
  );

  React.useEffect(() => {
    Animated.timing(FadeAnime, {
      toValue: 1,
      useNativeDriver: true,
      easing: Easing.linear,
      duration: 300,
    }).start();
  });

  if (!person) {
    return (
      <>
        <Spinner />
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
            uri: `https://www.themoviedb.org/t/p/original/${person.profile_path}`,
          }}
        />

        {/* popularity */}
        <View
          style={{
            width: 100,
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            marginTop: -55,
            marginLeft: 20,
            borderRadius: 100,
            elevation: 10,
          }}
        >
          {console.log(person)}
          <Icon name="star" style={{ width: 40, height: 40 }} fill="gold" />
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
            {person?.popularity?.toFixed(0)}
          </Text>
        </View>

        <Animated.View style={[styles.section, { marginTop: 20 }]}>
          <Text category="h4">{person.name || <Spinner height={20} />}</Text>

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
              {beautifyDate(new Date(person.birthday))}
            </Text>

            <Text style={{ color: '#9A9BB2', fontSize: 14, marginRight: 20 }}>
              {person.gender === 1
                ? 'Female'
                : person.gender === 2
                ? 'Male'
                : ''}
            </Text>

            <Text style={{ color: '#9A9BB2', fontSize: 14 }}>
              {person.place_of_birth}
            </Text>
          </View>

          {person.also_known_as?.length > 0 && (
            <Animated.ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 20, opacity: FadeAnime }}
            >
              <View style={[styles.genre, { borderWidth: 0, paddingLeft: 0 }]}>
                <Text style={{ fontSize: 12 }}>Also Known As</Text>
              </View>

              {person.also_known_as.map((item: string, i: number) => (
                <View key={i} style={styles.genre}>
                  <Text style={{ fontSize: 12 }}>{item}</Text>
                </View>
              ))}
            </Animated.ScrollView>
          )}
        </Animated.View>

        <Animated.View style={[styles.section, { opacity: FadeAnime }]}>
          <Text style={styles.section_text}>{person?.biography}</Text>
        </Animated.View>

        <View>
          <MovieGrid moviesArr={personMovie} />
        </View>
        <Footer />
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
