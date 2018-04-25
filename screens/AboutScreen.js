/**
 * AnchorBuddy.  A mobile app to help with anchor calculations.
 * Copyright (C) 2018  Austin Goudge and Stephen Gorst
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import {
  AsyncStorage,
  Button,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import {
  AdMobBanner,
  Constants
} from 'expo';


export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  };

  state = {
    signalKServer: 'http://127.0.0.1:3000'
  };

  componentDidMount = () => {
    AsyncStorage.getItem('signalKServer').then((value) => value && this.setState({ 'signalKServer': value }));
  }

  storeSignalKServer = (value) => {
    AsyncStorage.setItem('signalKServer', value);
    this.setState({'signalKServer': value});
  }


  render() {
    const { manifest } = Constants;

    return (
      <View style={styles.container}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={Platform.OS === 'ios' ? 'ca-app-pub-5631233433203577/9620250368' : 'ca-app-pub-5631233433203577/8878014333'}
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
        />
        <ScrollView style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/anchor.png')}
              style={styles.headerImage}
            />
          </View>

          <View style={styles.introTextContainer}>
            <Text>SignalK Server: </Text>
            <TextInput
              style={styles.input}
              defaultValue={this.state.signalKServer}
              onChangeText={(text) => this.storeSignalKServer(text)}
              ref={ref => {this._signalKServerInput = ref}}
              placeholder="http://127.0.0.1:3000"
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType={"default"}
              returnKeyType={"done"}
              blurOnSubmit={false}
              selectTextOnFocus={true}
              maxLength={25}
            />
          </View>

          <View style={styles.versionTextContainer}  marginBottom={10}>
            <Text>Version: {manifest.version}</Text>
          </View>
          <View style={styles.versionTextContainer}>
            <Text>©2018</Text>
            <Text>Austin Goudge and Stephen Gorst</Text>
          </View>

          <View style={styles.introTextContainer}>
            <Text style={styles.introText}>Sponsored By:</Text>
          </View>

          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/nwcc.png')}
              style={styles.nwccImage}
            />
            <Button title="nwcc.info" onPress={ ()=>{ Linking.openURL('http://nwcc.info')}} />
          </View>
          <View style={styles.introTextContainer}>
            <Text style={styles.introWarning}>NOT TO BE USED FOR NAVIGATION - YOU ACCEPT ALL RISKS</Text>
          </View>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  headerImage : {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
  },
  nwccImage : {
    width: 250,
    height: 70,
    resizeMode: 'contain',
    marginTop: 10,
    marginBottom: 0,
  },
  versionTextContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 50,
  },
  introTextContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  introText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  introWarning: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },

});
