import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  Image,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [tipingName, setTipingName] = useState('');
  const [name, setName] = useState('');
  const [selectAvatar, setSelectAvatar] = useState();
  console.log('selectAvatar==>', selectAvatar);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [selectAvatar, name]);

  const setData = async () => {
    try {
      const data = {
        selectAvatar,
        name,
      };

      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(`ProfileScreen`, jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem(`ProfileScreen`);
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setSelectAvatar(parsedData.selectAvatar);
        setName(parsedData.name);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  const AvatarPicer = () => {
    let options = {
      storageOptios: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        //console.log('response==>', response.assets[0].uri);
        setSelectAvatar(response.assets[0].uri);
      } else {
        console.log('Вибір скасовано');
      }
    });
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/updDiz/backgr_2.jpg')}>
        <View
          style={{
            flex: 1,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 60,
            //marginBottom: 10,
          }}>
          <View style={{marginBottom: 30}}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{alignItems: 'center'}}>
                {selectAvatar ? (
                  <TouchableOpacity
                    onPress={() => {
                      AvatarPicer();
                    }}
                    style={{
                      width: width * 0.8,
                      height: width * 0.8,
                      borderWidth: 3,
                      borderColor: 'gold',
                      borderRadius: 150,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    }}>
                    <Image
                      source={{uri: selectAvatar}}
                      style={{
                        width: width * 0.7,
                        height: width * 0.7,
                        borderWidth: 3,
                        borderColor: 'gold',
                        borderRadius: 150,
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      AvatarPicer();
                    }}
                    style={{
                      width: width * 0.8,
                      height: width * 0.8,
                      borderWidth: 3,
                      borderColor: 'gold',
                      borderRadius: 150,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                    }}>
                    <Image
                      source={require('../assets/user.png')}
                      style={{
                        width: width * 0.7,
                        height: width * 0.7,
                        borderWidth: 3,
                        borderColor: 'gold',
                        borderRadius: 150,
                      }}
                    />
                  </TouchableOpacity>
                )}

                {name ? (
                  <View
                    style={{
                      marginTop: 40,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{fontSize: 40, color: 'gold', fontWeight: 'bold'}}>
                      {name}
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: 40,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <TextInput
                      placeholder="Name..."
                      placeholderTextColor="gold"
                      onChangeText={setTipingName}
                      value={tipingName}
                      style={{
                        height: 80,
                        width: width * 0.6,
                        borderColor: 'gold',
                        borderWidth: 2,
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        marginTop: 10,
                        marginBottom: 20,
                        fontSize: 30,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'gold',
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setName(tipingName);
                        setTipingName('');
                      }}
                      style={{
                        marginBottom: 10,
                        marginLeft: 5,
                      }}>
                      <Image
                        source={require('../assets/free-icon-check-12259430.png')}
                        style={{
                          width: 80,
                          height: 80,
                          borderWidth: 3,
                          borderColor: 'gold',
                          borderRadius: 150,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>

          {/**BTN back */}
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: '#ffcd00',
              width: 60,
              height: 60,
              borderRadius: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: '#ffcd00'}}>GO</Text>
            <Text style={{color: '#ffcd00'}}>BACK</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;
