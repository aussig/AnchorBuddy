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


export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
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
});
