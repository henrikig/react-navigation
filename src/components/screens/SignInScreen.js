import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Text,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import validate from '../Utility/validations';
import DefaultInput from '../build/DefaultInput';
import PasswordInput from '../build/PasswordInput';
import HeadingText from '../build/HeadingText';
import MainText from '../build/MainText';
import backgroundImage from '../../assets/images/background.jpg';
import ButtonWithBackground from '../build/Buttons/ButtonWithBackground';

export default class SignInScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    authMode: "login",
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true,
        },
        touched: false,
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6,
        },
        touched: false,
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: 'password',
        },
        touched: false,
      },
    }
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue,
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value,
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === 'password'
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true,
          },
        },
      };
    });
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles)
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles)
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login' ? 'signup' : 'login'
      };
    });
  };

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  };

  static navigationOptions = {
    drawerLabel: 'Sign Out',
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-log-out" size={20} color={"black"} />
    ),
  }

  loginHandler = () => {
    const authData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };
    this.props.screenProps.onLogin(authData);
    this.props.navigation.navigate('MainApp');
  }


  render() {
    let headingText = null;
    let confirmPasswordControl = null;
    if (this.state.authMode === 'signup') {
      confirmPasswordControl = (
        <View style={
          this.state.viewMode === 'portrait'
          ? styles.portraitPasswordWrapper
          : styles.landscapePasswordWrapper
        }>
          <DefaultInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={(val) => this.updateInputState('confirmPassword', val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }

    if (Dimensions.get('window').height > 500) {
      headingText = (
        <MainText>
          <HeadingText>{this.state.authMode === 'login' ? 'Log In Here' : 'Sign Up Here'}</HeadingText>
        </MainText>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {headingText}
          <ButtonWithBackground
            color="#7a9d96"
            onPress={this.switchAuthModeHandler}
          >
            Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
          </ButtonWithBackground>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={styles.inputContainer}>
              <DefaultInput
                placeholder="Your E-Mail Address"
                style={styles.input}
                value={this.state.controls.email.value}
                onChangeText={(val) => this.updateInputState('email', val)}
                autoCapitalize={"none"}
                autoCorrect={false}
                keyboardType="email-address"
                valid={this.state.controls.email.valid}
                touched={this.state.controls.email.touched}
              />
              <View style={
                this.state.viewMode === 'portrait'
                ? styles.portraitPasswordContainer
                : styles.landscapePasswordContainer
              }>
                <View style={
                  this.state.viewMode === 'portrait'
                  || this.state.authMode === 'login'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
                }>
                  <DefaultInput
                    placeholder="Your Password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={(val) => this.updateInputState('password', val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <ButtonWithBackground
            color="#7a9d96"
            onPress={this.loginHandler}
            disabled={
              !this.state.controls.email.valid ||
              !this.state.controls.password.valid ||
              !this.state.controls.confirmPassword.valid && this.state.authMode === 'signup'
            }
          >
            Submit
          </ButtonWithBackground>
        </KeyboardAvoidingView>
      </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    borderColor: "#bbb",
    backgroundColor: "#eee",
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordWrapper: {
    width: '100%'
  },
  landscapePasswordWrapper: {
    width: '48%',
  },
});
