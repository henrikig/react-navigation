import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Image } from 'react-native';

import MainText from '../build/MainText';
import HeadingText from '../build/HeadingText';
import PickImage from '../build/PickImage';
import PickLocation from '../build/PickLocation';
import PlaceInput from '../build/PlaceInput';
import validate from '../Utility/validations';

class SharePlaceScreen extends Component {

  state = {
    controls: {
      placeName: {
        value: "",
        valid: false,
        touched: false,
        validationRules: {
          isString: true,
        },
      },
    },
  };

  static navigationOptions = {
      title: "Share Place",
  }

  placeAddedHandler = () => {
    if (this.state.controls.placeName.value.trim() !== "") {
      this.props.screenProps.onAddPlace(this.state.controls.placeName.value);
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            placeName: {
              ...prevState.controls.placeName,
              value: "",
            },
          },
        };
      })
    }
  }

  placeNameChangedHandler = val => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          placeName: {
            ...prevState.controls.placeName,
            value: val,
            touched: true,
            valid: validate(
              val, prevState.controls.placeName.validationRules
            ),
          },
        },
      };
    });
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share A Place</HeadingText>
          </MainText>
          <PickImage />
          <PickLocation />
          <PlaceInput
            placeName={this.state.controls.placeName.value}
            onChangeText={this.placeNameChangedHandler}
            valid={this.state.controls.placeName.valid}
            touched={this.state.controls.placeName.touched}
          />
          <View style={styles.button}>
            <Button
              title="Share Place"
              onPress={this.placeAddedHandler}
              disabled={!this.state.controls.placeName.valid}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  placeHolder: {
    borderWidth: 1,
    borderColor: "#777",
    width: "80%",
    height: 150,
    backgroundColor: "rgba(122, 157, 150, 0.5)",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
  },
  button: {
    margin: 8,
  },
});

export default SharePlaceScreen;
