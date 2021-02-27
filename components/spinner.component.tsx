import React from 'react';
import { View, Dimensions } from 'react-native';
import { Spinner as UIKittenSpinner } from '@ui-kitten/components';

export function Spinner({
  height,
  status,
}: {
  height?: number;
  status?: string;
}) {
  return (
    <>
      <View
        style={{
          minHeight: height || Dimensions.get('window').height,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <UIKittenSpinner status={status || 'danger'} size="giant" />
      </View>
    </>
  );
}
