import React from 'react';
import { ScrollView } from 'react-native';
import { Text, Layout } from '@ui-kitten/components';

// components
import Header from '../components/header.component';
import { NetworkRequest } from '../network-requests';
import { Spinner } from '../components/spinner.component';
import { MovieCategories } from '../components/movie-categories.component';
import { MovieSlider } from '../components/movie-slider.component';

function HomeScreen() {
  const [movies, setMovies] = React.useState<any>(null);

  React.useEffect(() => {
    const immediate = setImmediate(async () => {
      const api = new NetworkRequest();
      const { data } = await api.discoverMovies();

      data && setMovies((data as any).results);
    });

    return () => clearImmediate(immediate);
  }, []);

  return (
    <ScrollView>
      <Layout>
        <Header />
        <MovieCategories />
        {movies ? <MovieSlider movies={movies} /> : <Spinner height={400} />}
      </Layout>
    </ScrollView>
  );
}

export default HomeScreen;
