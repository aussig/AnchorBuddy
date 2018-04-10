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
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Constants } from 'expo';


export default class HelpScreen extends React.Component {
  static navigationOptions = {
    title: 'Help',
  };

  render() {
    const { manifest } = Constants;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../assets/images/anchor.png')}
            style={styles.headerImage}
          />
        </View>

        <View style={styles.helpTextContainer}  marginBottom={10}>
          <Text>Version: {manifest.version}</Text>
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
  headerImage : {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
  },
  helpTextContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginBottom: 50,
  },
});
