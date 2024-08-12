import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Linking,
  ActivityIndicator,
  Button,
  Image,
} from 'react-native';
import {WebView} from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
//import AsyncStorage from '@react-native-async-storage/async-storage';

const MercyrPuzzleGameAndroidProdactScreen = () => {
  const refWebview = useRef(null);

  const customUserAgent = `Mozilla/5.0 (Linux; Android 10; Pixel 3 XL Build/QQ3A.200805.001) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Mobile Safari/537.36`;
  console.log(customUserAgent);

  useEffect(() => {
    WebView.userAgent = customUserAgent;
  }, []);

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
        source={{uri: 'https://football.ua/'}}
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 5,
          paddingTop: 10,
        }}>
        {/**Btn back */}
        <TouchableOpacity
          style={{marginLeft: 40}}
          onPress={() => {
            goBackBtn();
          }}>
          <Image
            style={{width: 30, height: 33}}
            source={require('../assets/arrow77.png')}
          />
        </TouchableOpacity>

        {/**Btn reload */}
        <TouchableOpacity
          style={{marginRight: 40}}
          onPress={() => {
            reloadPageBtn();
          }}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/redo77.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MercyrPuzzleGameAndroidProdactScreen;
