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
      <View style={styles.container}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={Platform.OS === 'ios' ? 'ca-app-pub-5631233433203577/9620250368' : 'ca-app-pub-5631233433203577/8878014333'}
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
        />
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/anchor.png')}
              style={styles.headerImage}
            />
          </View>
          <View style={styles.introTextContainer}>
            <Text style={styles.introHeading}>Units</Text>
            <Text style={styles.introText}>No units are specified by this app - providing you use the same units for all your entries, the results will be in the same units.  i.e. If you use metres the results will be in metres, if you use feet the results will be in feet.  Don't mix your units!</Text>
            <Text style={styles.introHeading}>Fields</Text>
            <Text style={styles.introText}>The diagram below explains the meaning of almost all the fields - the only field not shown here is Scope Multiplier.</Text>
          </View>
          <View style={styles.diagramContainer}>
            <Image
              source={require('../assets/images/diagram.jpg')}
              style={styles.diagramImage}
            />
          </View>
          <View style={styles.introTextContainer}>
            <Text style={styles.introText}>In the Scope Multiplier field, enter the ratio of depth to rode you would like to use.  For example, in light conditions with chain you might choose to use 4:1 (enter '4' in the field), while in heavy conditions you might want much more, for example 8:1 or 10:1 (enter '8' or '10' in the field).</Text>
            <Text style={styles.introText}>The multiplier is your decision and should be based on many factors including the weather, the seabed type, the nature of your boat, your ground tackle and your experience.</Text>
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
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  introTextContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 50,
  },
  introHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'rgba(96,100,109, 1)',
    marginTop: 20,
    lineHeight: 24,
    textAlign: 'left',
  },
  introText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    marginTop: 10,
    lineHeight: 24,
    textAlign: 'left',
  },
  introWarning: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  diagramContainer: {
    paddingRight: 20,
  },
  headerImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
  },
  diagramImage: {
    flex: 1,
    resizeMode: 'contain',
    width: null,
    height: null,
    aspectRatio: 926/606
  },
  helpTextContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 50,
  },
});
