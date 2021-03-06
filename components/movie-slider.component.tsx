import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from './slider-item.component';
import {
  FlingGestureHandler,
  Directions as RNGHDirections,
} from 'react-native-gesture-handler';

export function MovieSlider(props: { movies: any }) {
  const flatListRef = React.useRef<any>(null);
  const [currentlyViewable, setCurrentlyViewable] = React.useState<number>(0);
  const viewabilityConfig = React.useRef({ itemVisiblePercentThreshold: 100 });

  const onViewableItemsChanged = React.useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      const vi = viewableItems;
      if (vi && Array.isArray(vi) && vi.length > 0) {
        setCurrentlyViewable(viewableItems[0].index);
      }
    }
  );

  React.useEffect(() => {
    //console.log(`currentlyViewable is ${currentlyViewable}`);
  }, [currentlyViewable]);

  return (
    <FlingGestureHandler direction={RNGHDirections.LEFT | RNGHDirections.RIGHT}>
      <FlatList
        onMomentumScrollEnd={() => {
          flatListRef.current.scrollToIndex({
            index: currentlyViewable,
            viewPosition: 0.5,
          });
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={props.movies}
        renderItem={(props) => {
          return renderItem(props, currentlyViewable);
        }}
        keyExtractor={(item) => item?.id?.toString()}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        ref={(list) => {
          flatListRef.current = list;
        }}
      />
    </FlingGestureHandler>
  );
}

function renderItem(
  props: { item: any; index: number },
  currentlyViewable: number
) {
  return (
    <ListItem
      movieId={props.item?.id}
      image={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${props.item.backdrop_path}`}
      name={props.item.title}
      currentlyViewable={currentlyViewable}
      index={props.index}
    />
  );
}
