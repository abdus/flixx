import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text } from '@ui-kitten/components';
import { GridItem } from '../components/grid-item.component';

import STYLES from '../style-constants';

export function MovieGrid(props: { moviesArr: any[]; title?: string }) {
  const numColumnsRef = React.useRef(2);

  return (
    <>
      {props.title && (
        <Text style={styles.header} category="h5">
          {props.title?.toUpperCase()}
        </Text>
      )}

      <View style={styles.wrapper}>
        <FlatList
          data={props.moviesArr}
          showsVerticalScrollIndicator={false}
          numColumns={numColumnsRef.current}
          renderItem={({ item }) => (
            <GridItem
              key={item.id}
              movieId={item.id}
              imagePath={item.backdrop_path}
              title={item.title || item.name}
              tagline={item.tagline}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: STYLES.gutter / 3,
    fontWeight: 'bold',
    marginTop: STYLES.gutter * 3,
  },

  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
