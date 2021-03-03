import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import HomeScreen from './screens/Home.screen';
import MovieScreen from './screens/Movie.screen';
import SideMenu from './screens/SideMenu';

// constants
const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <StatusBar animated={true} hidden={true} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" children={(_props) => <HomeScreen />} />
            <Stack.Screen
              name="Movie"
              children={(props) => <MovieScreen {...props} />}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
