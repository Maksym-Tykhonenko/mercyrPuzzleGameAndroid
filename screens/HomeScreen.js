import React from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, position: 'relative'}}>
      <ImageBackground
        source={require('../assets/updDiz/backgr_1.jpg')}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderWidth: 3,
            borderColor: '#ffcd00',
            width: 280,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            marginTop: -50,
            marginBottom: 20,
            backgroundColor: 'rgba(0,32,73,100)',
          }}
          onPress={() => {
            navigation.navigate('LvlSelection');
          }}>
          <Text style={{color: '#ffcd00', fontSize: 30}}>Game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            borderWidth: 3,
            borderColor: '#ffcd00',
            width: 280,
            height: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            //marginTop: -50,
            marginBottom: 20,
            backgroundColor: 'rgba(0,32,73,100)',
          }}
          onPress={() => {
            navigation.navigate('Rulse');
          }}>
          <Text style={{color: '#ffcd00', fontSize: 30}}>Rulse</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            position: 'absolute',
            top: 20,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            backgroundColor: 'rgba(0,32,73,100)',
          }}
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}>
          <Image
            style={{width: 80, height: 80}}
            source={require('../assets/user.png')}
          />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
