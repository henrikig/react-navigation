import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import Icon from "react-native-vector-icons/Ionicons";

export default class PlaceDetailScreen extends Component {
  state = {
    viewMode: 'portrait',
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.goBack()}
          title="Close"
          color="#fff"
        />
      ),
      title: params ? params.title : "An Awesome Place",
    };
  };

  onPlaceDeleted = key => {
    this.props.screenProps.onPlaceDeleted(key);
    this.props.navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    const selectedPlace = navigation.getParam("selectedPlace");

    return (
      <View
        style={[
          styles.container,
          this.state.viewMode === "portrait"
            ? styles.portraitContainer
            : styles.landscapeContainer
        ]}
      >
        <View style={styles.subContainer}>
          <Image source={selectedPlace.image} style={styles.placeImage} />
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeName}>{selectedPlace.name}</Text>
          </View>
          <TouchableOpacity onPress={() => this.onPlaceDeleted(selectedPlace.key)}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
          <Button
            title="Close"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
  },
  subContainer: {
    flex: 1,
  },
  portraitContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  landscapeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeImage: {
    width: "100%",
    height: 250
  },
  placeName: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    marginTop: 7
  },
  deleteButton: {
    alignItems: "center",
    marginTop: 10
  }
})
