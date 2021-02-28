import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import HomeScreen from './screens/Home.screen';
import MovieScreen from './screens/Movie.screen';
import SideMenu from './screens/SideMenu';

// constants
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <StatusBar animated={true} hidden={true} />
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" children={(_props) => <HomeScreen />} />
            <Drawer.Screen
              name="Movie"
              children={(props) => <MovieScreen {...props} />}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
