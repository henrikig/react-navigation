import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title="Go to Home"
          color="darkblue"
        />
      </View>
    );
  }
}
