import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  InputAccessoryView,
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  findNodeHandle,
} from 'react-native';

import * as TextInputState from 'react-native/lib/TextInputState';

export default class AnchorScreen extends React.Component {
  static navigationOptions = {
    header: null,
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
    resultStyle: styles.resultContainerInvalid,
  };

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const inputAccessoryViewID = "prevNextIAView";

    this.anchorRecalculate();

    return (
      <View style={styles.container}>
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
                    onChangeText={(text) => this.setState({draught: Number(text)})}
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
                    onChangeText={(text) => this.setState({topsides: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._lowTideInput)}
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
                  <Text style={styles.formFieldLabel}>Depth at low tide:</Text>
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
                  <Text style={styles.formFieldLabel}>Depth at high tide:</Text>
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
                  <Text style={styles.formFieldLabel}>Current height of tide:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({currentTide: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._safetyMarginInput)}
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
                  <Text style={styles.formFieldLabel}>Safety margin:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({safetyMargin: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._scopeMultiplierInput)}
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
                  <Text style={styles.formFieldLabel}>Scope multiplier:</Text>
                </View>
                <View style={styles.formFieldTextInputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({scopeMultiplier: Number(text)})}
                    onSubmitEditing={() => this.focusTextInput(this._draughtInput)}
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
            </View>
          </View>

          <View style={this.state.resultStyle}>
            <Text style={styles.resultLabelText}>Anchoring Depth (sounder):</Text><Text style={styles.resultValueText}>{this.state.depthToAnchor}</Text>
          </View>
          <View style={this.state.resultStyle}>
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
    let anchorScope = (depthRequired + depthFall + depthRise + this.state.topsides) * this.state.scopeMultiplier;

    this.state.resultStyle = (this.state.draught != null) &&
                             (this.state.topsides != null) &&
                             (this.state.lowTide != null) &&
                             (this.state.highTide != null) &&
                             (this.state.currentTide != null) &&
                             (this.state.safetyMargin != null) &&
                             (this.state.scopeMultiplier != null) &&
                             !isNaN(depthToAnchor) &&
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
    paddingTop: 30,
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
    borderWidth: 1,
    borderColor: 'gray',
    width: 50,
    padding: 5,
    backgroundColor: 'white',
  },
  keyboardCompensationContainer: {
    height: 10
  }
});
