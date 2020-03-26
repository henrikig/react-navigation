import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

export default class LogoTitle extends Component {
  render() {
    return (
      <Image
        source={require('../../assets/images/spiro.png')}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}
