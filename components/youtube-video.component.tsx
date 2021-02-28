import React from 'react';
import { Dimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Spinner } from '../components/spinner.component';

export function YTVideoEmbed(props: { youtubeKey: string }) {
  const videoHeight = Dimensions.get('window').width * (2 / 4);
  const [showSpinner, setShowSpinner] = React.useState(true);

  return (
    <View
      style={{
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      {showSpinner && (
        <View
          style={{
            height: videoHeight,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 10000,
          }}
        >
          <Spinner height={videoHeight}  />
        </View>
      )}

      <WebView
        source={{
          uri: `https://www.youtube.com/embed/${props.youtubeKey}`,
        }}
        onLoadEnd={() => setShowSpinner(false)}
        style={{
          minHeight: videoHeight,
        }}
      />
    </View>
  );
}
