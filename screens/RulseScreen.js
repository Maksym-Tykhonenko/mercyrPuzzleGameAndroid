import React from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const RulseScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/bgr1.jpeg')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1, width: '100%', position: 'relative'}}>
          <SafeAreaView>
            <ScrollView>
              <View
                style={{
                  borderRadius: 10,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 30,
                  //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  {' '}
                  The game is based on the five-of-a-kind puzzle, but with a
                  representation of the planets of the solar system and a time
                  limit on each level.
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '400',
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>
                    Objective of the game:{' '}
                  </Text>
                  Collect pictures of the planets of the solar system, placing
                  them in the correct order from Mercury to Neptune.
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '400',
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Levels: </Text>
                  The game consists of 8 levels corresponding to the planets of
                  the solar system. Levels are unlocked one at a time, starting
                  with Mercury and ending with Neptune. Each next level opens
                  after the successful completion of the previous one.
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '400',
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Timer: </Text>
                  To start the game in a certain level, the user must press the
                  "Play" button, which starts a timer for 10 minutes. The user
                  has only 10 minutes to complete the game on each level.
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '400',
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Movements: </Text>
                  The user can move the planet images by clicking on them and
                  moving them to an empty space. Movements can be performed only
                  horizontally or vertically.
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '400',
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Win: </Text>
                  The player wins each level when they successfully place the
                  images of the planets of the solar system in the correct order
                  within a 10-minute timer.
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '400',
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Completing levels: </Text>
                  After successfully completing each level, the player advances
                  to the next level. If the player does not complete the level
                  within 10 minutes, he must try again.
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '400',
                    fontSize: 18,
                    marginBottom: 10,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Progress Display: </Text>
                  The game displays the player's progress by showing which
                  levels they have successfully completed and the time left to
                  complete the current level.
                </Text>
                <View style={{height: 150}}></View>
              </View>
            </ScrollView>
          </SafeAreaView>

          {/**BTN back */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: '#ccc',
              width: 60,
              height: 60,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={{color: '#ccc'}}>GO</Text>
            <Text style={{color: '#ccc'}}>BACK</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RulseScreen;
