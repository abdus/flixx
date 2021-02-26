import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';

import STYLE from '../style-constants';

interface IMovieCategories {
  categories: string[];
}

export function MovieCategories(props: IMovieCategories) {
  return (
    <ScrollView horizontal style={styles.wrapper}>
      {Array.isArray(props.categories) &&
        props.categories.map((cat, i) => <Category name={cat} key={i} />)}
    </ScrollView>
  );
}

interface ICategory {
  name: string;
}

function Category(props: ICategory) {
  return (
    <TouchableOpacity style={styles.category_item}>
      <Text>{props.name}</Text>
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
