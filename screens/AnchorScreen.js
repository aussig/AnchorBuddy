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
  Dimensions,
  Image,
  InputAccessoryView,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TextInputState,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';
import Constants from 'expo-constants';
import { AdMobBanner } from 'expo-ads-admob';

export default class AnchorScreen extends React.Component {
  static navigationOptions = {
    title: 'Anchoring',
  };

   state = {
    draught: null,
    topsides: null,
    lowTide: null,
    highTide: null,
    currentTide: null,
    safetyMargin: null,
    scopeMultiplier: null,
    anchorScope: null,
    depthToAnchor: null,
    keyboardHeightStyle: {height: 10},
    specifyDepth: false,
    anchoredDepth: null,
    anchoringDepthResultStyle: styles.resultContainerInvalid,
    scopeResultStyle: styles.resultContainerInvalid
  };

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  componentDidMount = () => {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    AsyncStorage.getItem('draught').then((value) => this.setState({ 'draught': Number(value) }));
    AsyncStorage.getItem('topsides').then((value) => this.setState({ 'topsides': Number(value) }));
    AsyncStorage.getItem('safetyMargin').then((value) => this.setState({ 'safetyMargin': Number(value) }));
  }

  storeDraught = (value) => {
    AsyncStorage.setItem('draught', value);
    this.setState({'draught': Number(value)});
  }

  storeTopsides = (value) => {
    AsyncStorage.setItem('topsides', value);
    this.setState({'topsides': Number(value)});
  }

  storeSafetyMargin = (value) => {
    AsyncStorage.setItem('safetyMargin', value);
    this.setState({'safetyMargin': Number(value)});
  }

  render() {
    const inputAccessoryViewID = "prevNextIAView";

    this.anchorRecalculate();

    return (
      <View style={styles.container}>
        <AdMobBanner
          bannerSize="fullBanner"
          adUnitID={Platform.OS === 'ios' ? 'ca-app-pub-5631233433203577/9620250368' : 'ca-app-pub-5631233433203577/8878014333'}
          testDeviceID="EMULATOR"
          onDidFailToReceiveAdWithError={this.bannerError}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps={Platform.OS === 'ios' ? "handled" : "handled"}>

          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/images/anchor.png')}
              style={styles.headerImage}
            />
          </View>

          <View style={styles.introTextContainer}>
            <Text style={styles.introText}>Enter the details below to calculate depth to anchor and scope</Text>
            <Text style={styles.introWarning}>NOT TO BE USED FOR NAVIGATION - YOU ACCEPT ALL RISKS</Text>
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.formContainer}>
              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={styles.formFieldLabel}>Boat draught:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    defaultValue={this.state.draught != null ? this.state.draught.toString() : ''}
                    onChangeText={(text) => this.storeDraught(text)}
                    onSubmitEditing={() => this.focusTextInput(this._topsidesInput)}
                    ref={ref => {this._draughtInput = ref}}
                    placeholder="…"
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"}
                    returnKeyType={Platform.OS === 'ios' ? "next" : "none"}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                    maxLength={4}
                    inputAccessoryViewID={inputAccessoryViewID}
                  />
                </View>
              </View>

              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={styles.formFieldLabel}>Height of bow roller:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    defaultValue={this.state.topsides != null ? this.state.topsides.toString() : ''}
                    onChangeText={(text) => this.storeTopsides(text)}
                    onSubmitEditing={() => this.focusTextInput(this._safetyMarginInput)}
                    ref={ref => {this._topsidesInput = ref}}
                    placeholder="…"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"}
                    returnKeyType={Platform.OS === 'ios' ? "next" : "none"}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                    maxLength={4}
                  />
                </View>
              </View>

              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={styles.formFieldLabel}>Safety margin:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.storeSafetyMargin(text)}
                    onSubmitEditing={() => this.focusTextInput(this._lowTideInput)}
                    defaultValue={this.state.safetyMargin != null ? this.state.safetyMargin.toString() : ''}
                    ref={ref => {this._safetyMarginInput = ref}}
                    placeholder="…"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"}
                    returnKeyType={Platform.OS === 'ios' ? "next" : "none"}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                    maxLength={4}
                  />
                </View>
              </View>

              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={styles.formFieldLabel}>Low tide height:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({lowTide: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._highTideInput)}
                    ref={ref => {this._lowTideInput = ref}}
                    placeholder="…"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"}
                    returnKeyType={Platform.OS === 'ios' ? "next" : "none"}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                    maxLength={4}
                  />
                </View>
              </View>

              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={styles.formFieldLabel}>High tide height:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({highTide: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._currentTideInput)}
                    ref={ref => {this._highTideInput = ref}}
                    placeholder="…"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"}
                    returnKeyType={Platform.OS === 'ios' ? "next" : "none"}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                    maxLength={4}
                  />
                </View>
              </View>

              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={styles.formFieldLabel}>Current tide height:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({currentTide: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._scopeMultiplierInput)}
                    ref={ref => {this._currentTideInput = ref}}
                    placeholder="…"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"}
                    returnKeyType={Platform.OS === 'ios' ? "next" : "none"}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                    maxLength={4}
                  />
                </View>
              </View>

              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={styles.formFieldLabel}>Scope multiplier:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({scopeMultiplier: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._anchoredDepthInput)}
                    ref={ref => {this._scopeMultiplierInput = ref}}
                    placeholder="…"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"}
                    returnKeyType={Platform.OS === 'ios' ? "next" : "none"}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                    maxLength={4}
                  />
                </View>
              </View>

              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={styles.formFieldLabel}>Specify actual anchored depth:</Text>
                </View>
                <View>
                  <Switch
                    onValueChange={(value) => this.setState({specifyDepth: value})}
                    value={this.state.specifyDepth}
                  />
                </View>
              </View>

              <View style={styles.formRowContainer}>
                <View style={styles.formFieldLabelContainer}>
                  <Text style={[styles.formFieldLabel, this.state.specifyDepth ? styles.labelTextEnabled : styles.labelTextDisabled]}>Actual depth:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={[styles.input, this.state.specifyDepth ? styles.inputEnabled : styles.inputDisabled]}
                    onChangeText={(text) => this.setState({anchoredDepth: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._draughtInput)}
                    editable={this.state.specifyDepth}
                    ref={ref => {this._anchoredDepthInput = ref}}
                    placeholder="…"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? "numbers-and-punctuation" : "numeric"}
                    returnKeyType={Platform.OS === 'ios' ? "next" : "none"}
                    blurOnSubmit={false}
                    selectTextOnFocus={true}
                    maxLength={4}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={this.state.anchoringDepthResultStyle}>
            <Text style={styles.resultLabelText}>Minimum depth to anchor (sounder):</Text><Text style={styles.resultValueText}>{this.state.depthToAnchor}</Text>
          </View>
          <View style={this.state.scopeResultStyle}>
            <Text style={styles.resultLabelText}>Scope (from bow roller):</Text><Text style={styles.resultValueText}>{this.state.anchorScope}</Text>
          </View>

          <View style={styles.outroTextContainer}>
            <Text style={styles.introText}>If the results are red, you have missed a field or entered an invalid value - check all your inputs</Text>
            <Text style={styles.introWarning}>NOT TO BE USED FOR NAVIGATION - YOU ACCEPT ALL RISKS</Text>
          </View>

          <View style={this.state.keyboardHeightStyle}>
          </View>
        </ScrollView>

        {/*<InputAccessoryView nativeID={inputAccessoryViewID}>
          <Button
            onPress={() => this.setState({scopeMultiplier: 'Placeholder Text'})}
            title="Reset Text"
          />
    </InputAccessoryView>*/}
      </View>
    );
  }

  _keyboardDidShow = (e) => {
    let newSize = e.endCoordinates.height;
    this.setState({keyboardHeightStyle: {height: newSize}});
  }

  _keyboardDidHide = (e) => {
    let newSize = 10;
    this.setState({keyboardHeightStyle: {height: newSize}});
  }

  focusTextInput(node) {
    try {
      // Only want to move on to next field on iOS because on Android this hides the keyboard and you have to touch again
      // to make it reappear.  There doesn't seem to be a way to stop this.
      if (Platform.OS === 'ios') {
        TextInputState.focusTextInput(findNodeHandle(node))
      }
    } catch(e) {
      console.log("Couldn't focus text input: ", e.message)
    }
  }

  anchorRecalculate = () => {
    let depthFall = this.state.currentTide - this.state.lowTide;
    let depthRise = this.state.highTide - this.state.currentTide;
    let depthRequired = this.state.safetyMargin + this.state.draught;

    let depthToAnchor = depthRequired + depthFall;
    let anchorScope = this.state.specifyDepth ?
                      (this.state.anchoredDepth + depthRise + this.state.topsides) * this.state.scopeMultiplier :
                      (depthRequired + depthFall + depthRise + this.state.topsides) * this.state.scopeMultiplier;

    let commonFieldsValid = this.state.draught != null &&
                            this.state.topsides != null &&
                            this.state.lowTide != null &&
                            this.state.highTide != null &&
                            this.state.currentTide != null &&
                            this.state.safetyMargin != null &&
                            this.state.scopeMultiplier != null;

    this.state.anchoringDepthResultStyle = this.state.specifyDepth ? styles.resultContainerHidden :
                                  commonFieldsValid &&
                                  !isNaN(depthToAnchor) &&
                                  !isNaN(anchorScope) ? styles.resultContainerValid : styles.resultContainerInvalid;

    this.state.scopeResultStyle = commonFieldsValid &&
                                  ((this.state.specifyDepth && this.state.anchoredDepth != null && this.state.anchoredDepth >= depthToAnchor) ||
                                  (!this.state.specifyDepth && !isNaN(depthToAnchor))) &&
                                  !isNaN(anchorScope) ? styles.resultContainerValid : styles.resultContainerInvalid;

    depthToAnchor = isNaN(depthToAnchor) ? 0 : depthToAnchor;
    anchorScope = isNaN(anchorScope) ? 0 : anchorScope;

    this.state.depthToAnchor = depthToAnchor.toFixed(1);
    this.state.anchorScope = anchorScope.toFixed(1);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  headerImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
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
  formContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formRowContainer: {
    backgroundColor: '#f0f0ff',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    marginTop: 5,
  },
  formFieldLabelContainer: {
    width: 170,
    justifyContent: 'center',
  },
  formFieldTextInputContainer: {
  },
  resultContainerInvalid: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    backgroundColor: 'red',
  },
  resultContainerValid: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    backgroundColor: 'green',
  },
  resultContainerHidden: {
    display: 'none'
  },
  resultLabelText: {
    fontSize: 17,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
  resultValueText: {
    fontSize: 21,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
  outroTextContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: 15,
  },
  input: {
    color: 'black',
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    width: 50,
    padding: 5,
  },
  inputEnabled: {
  },
  inputDisabled: {
    color: 'blue',
    borderColor: 'darkgray',
    backgroundColor: 'lightgray',
  },
  labelTextEnabled: {
  },
  labelTextDisabled: {
    color: 'gray'
  },
  keyboardCompensationContainer: {
    height: 10
  }
});
