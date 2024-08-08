import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LvlSelectionScreen = ({navigation}) => {
  const [venusAnlock, setVenusAnlock] = useState(false);
  const [earthAnlock, setEarthAnlock] = useState(false);
  const [marsAnlock, setMarsAnlock] = useState(false);
  const [jupiterAnlock, setJupiterAnlock] = useState(false);
  const [saturnAnlock, setSaturnAnlock] = useState(false);
  const [uranAnlock, setUranAnlock] = useState(false);
  const [neptunAnlock, setNeptunAnlock] = useState(false);
  //console.log('venusAnlock===>', venusAnlock);

  // lvl venus
  useEffect(() => {
    getDataAboutVenus();
  }, []);
  const getDataAboutVenus = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlFirstMarcyry');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setVenusAnlock(parsedData.venusAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl earth
  useEffect(() => {
    getDataAboutEarth();
  }, []);
  const getDataAboutEarth = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlSecondVenus');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setEarthAnlock(parsedData.earthAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl mars
  useEffect(() => {
    getDataAboutMars();
  }, []);
  const getDataAboutMars = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlSecondEarth');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setMarsAnlock(parsedData.marsAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl jupiter
  useEffect(() => {
    getDataAboutJupiter();
  }, []);
  const getDataAboutJupiter = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlFourthMars');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setJupiterAnlock(parsedData.jupiterAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  // lvl saturn
  useEffect(() => {
    getDataAboutSaturn();
  }, []);

  const getDataAboutSaturn = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlFifthJupiter');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setSaturnAnlock(parsedData.saturnAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl uran
  useEffect(() => {
    getDataAboutUran();
  }, []);
  const getDataAboutUran = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlSixthSaturn');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setUranAnlock(parsedData.uranAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  // lvl neptun
  useEffect(() => {
    getDataAboutNeptun();
  }, []);
  const getDataAboutNeptun = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('LvlSeventhUran');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setNeptunAnlock(parsedData.neptunAnlock);
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/bgr1.jpeg')}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flex: 1, width: '100%', position: 'relative'}}>
          {/**LVL`s Block */}
          <View style={{marginHorizontal: 10, marginTop: 40, marginBottom: 10}}>
            {/** LOGO 
            <View style={{alignItems: 'center', marginBottom: 10}}>
              <Image
                source={require('../assets/updDiz/MerkurGames.png')}
                style={{width: 200, height: 60}}
              />
            </View>*/}
            <ScrollView>
              {/**MARCYRY Lvl*/}
              <TouchableOpacity
                onPress={() => navigation.navigate('LvlFirstMarcyry')}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: '#ccc',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/planats/mercury.jpeg')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                  Merkur
                </Text>
              </TouchableOpacity>

              {/**VENUS Lvl*/}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('LvlSecondVenus');
                }}
                disabled={venusAnlock ? false : true}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: venusAnlock ? '#ccc' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/planats/Venus.jpeg')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 18,
                  }}>
                  Venus
                </Text>
              </TouchableOpacity>

              {/**EARTH Lvl*/}
              <TouchableOpacity
                disabled={earthAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlSecondEarth');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: earthAnlock ? '#ccc' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/planats/Earth.jpeg')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                  Earth
                </Text>
              </TouchableOpacity>

              {/**MARS Lvl*/}
              <TouchableOpacity
                disabled={marsAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlFourthMars');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: marsAnlock ? '#ccc' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/planats/mars.jpeg')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                  Mars
                </Text>
              </TouchableOpacity>

              {/**Jupiter Lvl*/}
              <TouchableOpacity
                disabled={jupiterAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlFifthJupiter');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: jupiterAnlock ? '#ccc' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/planats/Jupiter.jpeg')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                  Jupiter
                </Text>
              </TouchableOpacity>

              {/**SATURN Lvl*/}
              <TouchableOpacity
                disabled={saturnAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlSixthSaturn');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: saturnAnlock ? '#ccc' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/planats/saturn1.webp')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                  Saturn
                </Text>
              </TouchableOpacity>

              {/**URAN Lvl*/}
              <TouchableOpacity
                disabled={uranAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlSeventhUran');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: uranAnlock ? '#ccc' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/planats/uran1.jpeg')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                  Uran
                </Text>
              </TouchableOpacity>

              {/**NEPTUN Lvl*/}
              <TouchableOpacity
                disabled={neptunAnlock ? false : true}
                onPress={() => {
                  navigation.navigate('LvlEighthNeptun');
                }}
                activeOpacity={0.8}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  width: '100%',
                  height: 230,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: neptunAnlock ? '#ccc' : '#333333',
                  marginBottom: 15,
                }}>
                <Image
                  source={require('../assets/planats/Neptun.jpeg')}
                  style={{
                    width: '100%',
                    height: 200,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                  }}
                />
                <Text style={{color: '#fff', fontWeight: '700', fontSize: 18}}>
                  Neptun
                </Text>
              </TouchableOpacity>
              <View style={{height: 100}}></View>
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

export default LvlSelectionScreen;
