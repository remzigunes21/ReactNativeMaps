import React, {PureComponent} from 'react';
import {Text, View, Image, Alert, Platform} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';

export class MapsScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        {name: '1', latitude: 37.8025259, longitude: -122.4351431},
        {name: '2', latitude: 37.7896386, longitude: -122.421646},
        {name: '3', latitude: 37.7665248, longitude: -122.4161628},
        {name: '4', latitude: 37.7734153, longitude: -122.4577787},
        {name: '5', latitude: 37.7948605, longitude: -122.4596065},
        {name: '6', latitude: 37.8025259, longitude: -122.4351431},
      ],
      initialPosition: null,
    };
  }

  componentDidMount() {
    this.requestLocationPermissions();
  }

  showMessage = () => {
    Alert.alert('Welcom to san francisco', 'The food is amazing', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'ok'},
    ]);
  };

  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(JSON.stringify(position));

        let initialPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };

        this.setState({initialPosition});
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
  };

  requestLocationPermissions = async () => {
    if (Platform.OS === 'ios') {
      var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('MapsScreen -> requestLocationPermissions -> ios', response);

      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    } else {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log(
        'MapsScreen -> requestLocationPermissions -> Android',
        response,
      );
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };

  render() {
    const {coordinates} = this.state;
    return (
      <MapView
        ref={(map) => (this._map = map)}
        provider={PROVIDER_GOOGLE}
        style={{flex: 1, height: '100%'}}
        initialRegion={this.state.initialPosition}>
        <Polygon
          coordinates={coordinates}
          strokeWidth={4}
          fillColor={'rgba(100,100,200,0.3)'}
        />
        <Circle
          center={{latitude: 37.8025259, longitude: -122.4351431}}
          radius={1000}
          fillColor={'rgba(200,300,200,0.5)'}
        />
        <Marker
          draggable
          coordinate={{latitude: 37.7825259, longitude: -122.4351431}}
          title="San Francisco">
          <Callout onPress={this.showMessage}>
            <Image
              source={require('./detailProgram.png')}
              style={{width: 80, height: 80}}
              resizeMode="contain"
            />
            <Text>interesting city</Text>
          </Callout>
        </Marker>

        {this.state.coordinates.map((marker) => (
          <Marker
            key={marker.name}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}>
            <Callout>
              <Text>{marker.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    );
  }
}

export default MapsScreen;
