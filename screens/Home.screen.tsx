import React from 'react';
import { ScrollView } from 'react-native';
import { Layout } from '@ui-kitten/components';

// components
import Header from '../components/header.component';
import { NetworkRequest } from '../network-requests';
import { Spinner } from '../components/spinner.component';
import { MovieCategories } from '../components/movie-categories.component';
import { MovieSlider } from '../components/movie-slider.component';

function HomeScreen() {
  const [movies, setMovies] = React.useState<any>(null);
  const [genre, setGenre] = React.useState<number>();

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
    <ScrollView>
      <Layout>
        <Header />
        <MovieCategories
          selectedGenre={genre || -Infinity}
          setSelectedGenre={setGenre}
        />
        {movies ? <MovieSlider movies={movies} /> : <Spinner height={400} />}
      </Layout>
    </ScrollView>
  );
}

export default HomeScreen;
