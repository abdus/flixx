import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Input } from '@ui-kitten/components';

// components
import Header from '../components/header.component';
import STYLE from '../style-constants';
import { NetworkRequest } from '../network-requests';
import { Spinner } from '../components/spinner.component';
import { MovieCategories } from '../components/movie-categories.component';
import { MovieSlider } from '../components/movie-slider.component';

function HomeScreen() {
  const [movies, setMovies] = React.useState<any>(null);
  const [genre, setGenre] = React.useState<number>();
  const [searchBoxPos, setSearchBoxPos] = React.useState<number>();
  const inputRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    const immediate = setImmediate(async () => {
      setMovies(undefined);

      const api = new NetworkRequest();
      const { data } = await api.discoverMovies({
        genres: genre?.toString() || '',
      });

      data && setMovies((data as any).results);
    });

    return () => clearImmediate(immediate);
  }, [genre]);

  return (
    <ScrollView ref={(ref) => (inputRef.current = ref)}>
      <Layout>
        <Header
          scrollToSearchBox={() =>
            inputRef.current?.scrollTo({ y: searchBoxPos })
          }
        />
        <MovieCategories
          selectedGenre={genre || -Infinity}
          setSelectedGenre={setGenre}
        />
        {movies ? <MovieSlider movies={movies} /> : <Spinner height={400} />}

        {/* search bar */}
        <View
          style={styles.search_box}
          onLayout={(e) => setSearchBoxPos(e.nativeEvent.layout.y)}
        >
          <Input placeholder="search something" style={{ borderRadius: 10 }} />
        </View>
      </Layout>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  search_box: {
    margin: STYLE.gutter,
    marginTop: STYLE.gutter * 1.5,
    marginBottom: STYLE.gutter + 1.5,
  },
});

export default HomeScreen;
