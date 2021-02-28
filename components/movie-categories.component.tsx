import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

import STYLE from '../style-constants';
import { NetworkRequest } from '../network-requests';
import { Spinner } from '../components/spinner.component';

interface IMovieCategories {
  setSelectedGenre: (id: number) => void;
  selectedGenre: number;
}

export function MovieCategories(props: IMovieCategories) {
  const [categories, setCategories] = React.useState<
    { id: number; name: string }[]
  >();

  React.useEffect(() => {
    const immediate = setImmediate(async () => {
      const api = new NetworkRequest();
      const { data } = await api.movieCategoris();
      const data__any = data as any;

      data &&
        setCategories(
          (data__any.genres as unknown) as { id: number; name: string }[]
        );
    });

    return () => clearImmediate(immediate);
  }, []);

  if (!categories) {
    return <Spinner height={100} status="basic" />;
  }

  return (
    <ScrollView horizontal style={styles.wrapper}>
      {Array.isArray(categories) &&
        categories.map((genre) => (
          <Category
            onPress={() => props.setSelectedGenre(genre.id)}
            isSelected={props.selectedGenre === genre.id}
            name={genre.name}
            key={genre.id}
          />
        ))}
    </ScrollView>
  );
}

interface ICategory {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

function Category(props: ICategory) {
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={[
        styles.category_item,
        props.isSelected && { backgroundColor: '#FE6D8E' },
      ]}
    >
      <Text style={props.isSelected && { color: '#fff' }}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: STYLE.gutter,
    flexWrap: 'nowrap',
    alignSelf: 'flex-start',
  },

  category_item: {
    padding: 17,
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 30,
    borderRadius: 40,
    ...STYLE.border,
    borderStyle: 'solid',
    borderColor: '#12153D20',
  },
});
