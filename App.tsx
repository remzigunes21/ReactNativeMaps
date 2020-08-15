import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MapsScreen from './src/MapsScreen';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <MapsScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
