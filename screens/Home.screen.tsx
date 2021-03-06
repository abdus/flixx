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
import { MovieGrid } from '../components/movie-grid.component';

// util
import { debounce } from '../utils';

function HomeScreen() {
  const [movies, setMovies] = React.useState<any>(null);
  const [genre, setGenre] = React.useState<number>();
  const [searchBoxPos, setSearchBoxPos] = React.useState<number>();
  const [searchQuery, setSearchQuery] = React.useState<string>();
  const [searchResult, setSearchResult] = React.useState<any[]>([]);
  const [topRatedMovies, setTopRatedMovies] = React.useState<any[]>([]);
  const [popularMovies, setPopularMovies] = React.useState<any[]>([]);
  const [popularTvShows, setPopularTvShows] = React.useState<any[]>([]);

  // refs
  const inputRef = React.useRef<ScrollView>(null);

  React.useEffect(() => {
    const immediate = setImmediate(async () => {
      setMovies(undefined);

      const api = new NetworkRequest();
      const { data } = await api.discoverMovies('movie', {
        genres: genre?.toString() || '',
      });

      data && setMovies((data as any).results);
    });

    return () => clearImmediate(immediate);
  }, [genre]);

  // get movies based on the query provided by user
  React.useEffect(() => {
    let timeoutHandler: ReturnType<typeof setTimeout>;
    const api = new NetworkRequest();

    if (searchQuery) {
      timeoutHandler = debounce(async () => {
        const { data } = await api.searchMovies(searchQuery);
        (data as any)?.results && setSearchResult((data as any).results);
      });
    } else {
      // when there is no `searchQuery`, call discoverMovies endpoint
      timeoutHandler = debounce(async () => {
        const { data } = await api.discoverMovies('movie', {
          sort_by: 'revenue.desc',
        });

        (data as any)?.results && setSearchResult((data as any).results);
      });
    }

    // cancel all timeouts before unmounting
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [searchQuery]);

  React.useEffect(() => {
    const api = new NetworkRequest();

    (async () => {
      {
        const { data } = await api.discoverMovies('movie', {
          sort_by: 'vote_count.desc',
        });
        (data as any)?.results && setTopRatedMovies((data as any).results);
      }

      {
        const { data } = await api.discoverMovies('movie', {
          sort_by: 'popularity.desc',
        });
        (data as any)?.results && setPopularMovies((data as any).results);
      }

      {
        const { data } = await api.discoverMovies('tv', {
          sort_by: 'popularity.desc',
        });
        (data as any)?.results && setPopularTvShows((data as any).results);
      }
    })();
  }, []);

  // return the component
  return (
    <ScrollView ref={(ref) => ((inputRef as any).current = ref)}>
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
          <Input
            onChangeText={(text) => setSearchQuery(text)}
            placeholder="search something"
            style={{ borderRadius: 10 }}
          />
        </View>

        <View>
          <MovieGrid moviesArr={searchResult} />
          <MovieGrid moviesArr={topRatedMovies} />
          <MovieGrid moviesArr={popularMovies} />
          {/*<MovieGrid moviesArr={popularTvShows} />*/}
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
