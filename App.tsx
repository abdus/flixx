import React from 'react';
import 'react-native-gesture-handler';
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
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={() => <SideMenu />}
          >
            <Drawer.Screen name="Home" children={() => <HomeScreen />} />
            <Drawer.Screen name="Movie" children={() => <MovieScreen />} />
          </Drawer.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};

export default App;
