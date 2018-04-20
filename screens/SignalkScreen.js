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
  AlertIOS,
  Button,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
import {
  AdMobBanner,
  Constants
} from 'expo';


export default class SignalkScreen extends React.Component {
  static navigationOptions = {
    title: 'SignalK',
  };

  state = {signalKDepth: 0}

  componentDidMount() {
    setInterval(() => {
      this._fetchSignalKDepth()
    }, 1000)
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

          <View style={styles.versionTextContainer}  marginBottom={10}>
            <Text>Current Depth:</Text>
            <Text>{this.state.signalKDepth}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  _fetchSignalKDepth = () => {
    fetch("http://localhost:3000/signalk/v1/api/", {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
        this.setState({signalKDepth: responseData.vessels[responseData.self.split('.')[1]].environment.depth.belowTransducer.value})
    })
    .catch((error) => {
      console.error(error);
    });
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
