import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View, Animated, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LvlSelectionScreen from './screens/LvlSelectionScreen';
import RulseScreen from './screens/RulseScreen';

// Planets route
import LvlFirstMarcyry from './screens/LvlFirstMarcyry';
import LvlSecondVenus from './screens/LvlSecondVenus';
import LvlSecondEarth from './screens/LvlThirdEarth';
import LvlFourthMars from './screens/LvlFourthMars';
import LvlFifthJupiter from './screens/LvlFifthJupiter';
import LvlSixthSaturn from './screens/LvlSixthSaturn';
import LvlSeventhUran from './screens/LvlSeventhUran';
import LvlEighthNeptun from './screens/LvlEighthNeptun';

const Stack = createNativeStackNavigator();

const App = () => {
  const [route, setRoute] = useState(false);

  ///////// Loader
  const [loaderIsLoaded, setLoaderIsLoaded] = useState(false);
  const ChangeInView = props => {
    const appearingAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 1 to 0
    useEffect(() => {
      Animated.timing(appearingAnim, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        setLoaderIsLoaded(true);
      }, 8000);
    }, []);

    return (
      <View style={{position: 'relative', flex: 1}}>
        <Animated.Image
          source={require('./assets/bgr1.jpeg')} // Special animatable View
          style={{
            ...props.style,
            opacity: appearingAnim,
            height: '100%',
            position: 'absolute', // Bind opacity to animated value
          }}
        />
      </View>
    );
  };

  return (
    <NavigationContainer>
      {!loaderIsLoaded ? (
        <ChangeInView
          style={{
            width: '100%',
            //height: 50,
            backgroundColor: 'powderblue',
          }}></ChangeInView>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlSelection"
            component={LvlSelectionScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="Rulse"
            component={RulseScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlFirstMarcyry"
            component={LvlFirstMarcyry}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlSecondVenus"
            component={LvlSecondVenus}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlSecondEarth"
            component={LvlSecondEarth}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlFourthMars"
            component={LvlFourthMars}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlFifthJupiter"
            component={LvlFifthJupiter}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlSixthSaturn"
            component={LvlSixthSaturn}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlSeventhUran"
            component={LvlSeventhUran}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="LvlEighthNeptun"
            component={LvlEighthNeptun}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
