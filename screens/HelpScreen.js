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
  Button,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  AdMobBanner,
  Constants
} from 'expo';


export default class HelpScreen extends React.Component {
  static navigationOptions = {
    title: 'Help',
  };

  render() {
    const { manifest } = Constants;

    return (
      <ScrollView style={styles.container}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={Platform.OS === 'ios' ? 'ca-app-pub-5631233433203577/9620250368' : 'ca-app-pub-5631233433203577/8878014333'}
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
        />

        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/images/anchor.png')}
            style={styles.headerImage}
          />
        </View>

        <View style={styles.diagramContainer}>
          <Image
              source={require('../assets/images/diagram.jpg')}
              style={styles.diagramImage}
          />
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  diagramContainer: {
    alignItems: 'center',
  },
  headerImage : {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
  },
  diagramImage : {
    resizeMode: 'contain',
  },
  helpTextContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 50,
  },
});
