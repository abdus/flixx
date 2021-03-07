import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import STYLE from '../style-constants';

export function BackButton(props: { style: ViewStyle }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={props.style} onPress={() => navigation.goBack()}>
      <Icon name="arrow-ios-back-outline" style={STYLE.icon} fill="#141414" />
    </TouchableOpacity>
  );
}
