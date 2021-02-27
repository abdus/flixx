import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from './list-item.component';

const images = [
  {
    image:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mMWLGu9pFymqipN8yvISHsAaj72.jpg',
    name: "Dorey's Reef Cam",
  },
  {
    image:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg',
    name: 'Lucifer',
  },
  {
    image:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/c59eplVELdwrUfGBUAZVin3HfaL.jpg',
    name: 'Away',
  },
  {
    image:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3H1WFCuxyNRP35oiL2qqwhAXxc0.jpg',
    name: 'Train to Busan',
  },
  {
    image:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg',
    name: 'Soul',
  },
  {
    image:
      'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gKnhEsjNefpKnUdAkn7INzIFLSu.jpg',
    name: 'I Care a Lot.',
  },
];

function renderItem(
  props: { item: { name: string; image: string }; index: number },
  currentlyViewable: number,
  flatListRef: any
) {
  return (
    <ListItem
      image={props.item.image}
      name={props.item.name}
      currentlyViewable={currentlyViewable}
      index={props.index}
      flatListRef={flatListRef.current}
    />
  );
}

export function MovieSlider() {
  const flatListRef = React.useRef<any>(null);
  const [currentlyViewable, setCurrentlyViewable] = React.useState<number>(0);
  const viewabilityConfig = React.useRef({ itemVisiblePercentThreshold: 90 });

  const onViewableItemsChanged = React.useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      const vi = viewableItems;
      if (vi && Array.isArray(vi) && vi.length > 0) {
        setCurrentlyViewable(viewableItems[viewableItems.length - 1].index);
      }
    }
  );

  React.useEffect(() => {
    //console.log(`currentlyViewable is ${currentlyViewable}`);
  }, [currentlyViewable]);

  return (
    <FlatList
      horizontal
      data={images}
      renderItem={(props) => {
        return renderItem(props, currentlyViewable, flatListRef);
      }}
      keyExtractor={(item) => item.image}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      ref={(list) => {
        flatListRef.current = list;
      }}
    />
  );
}
