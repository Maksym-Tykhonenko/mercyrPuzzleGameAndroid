import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/bgr1.jpeg')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderWidth: 3,
            borderColor: '#ccc',
            width: 280,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            marginTop: -50,
            marginBottom: 20,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onPress={() => {
            navigation.navigate('LvlSelection');
          }}>
          <Text style={{color: '#ccc', fontSize: 30}}>Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderWidth: 3,
            borderColor: '#ccc',
            width: 280,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            //marginTop: -50,
            marginBottom: 20,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onPress={() => {
            navigation.navigate('Rulse');
          }}>
          <Text style={{color: '#ccc', fontSize: 30}}>Rulse</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
