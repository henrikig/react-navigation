import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import PlaceList from '../build/PlaceList';

class FindPlaceScreen extends Component {

  static navigationOptions = {
    title: "Find Place",
  }

  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1),
    insertPlacesAnim: new Animated.Value(0),
  }

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        placesLoaded: true,
      });
      this.placesLoadedHandler();
    });
  }

  placesLoadedHandler = () => {
    Animated.timing(this.state.insertPlacesAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  itemSelectedHandler = key => {
    const selPlace = this.props.screenProps.places.find(place => {
      return place.key === key;
    });
    this.props.navigation.push("PlaceDetails", {
      selectedPlace: selPlace,
      title: selPlace.name,
    });
  }

  render() {
    let content = (
      <Animated.View
        style={{
          opacity: this.state.removeAnim,
          transform: [
            {
              scale: this.state.removeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 1],
              }),
            },
          ]
        }}>
        <TouchableOpacity onPress={this.placesSearchHandler}>
          <View style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search Places</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
    if (this.state.placesLoaded === true) {
      content = (
        <Animated.View
          style={{
            opacity: this.state.insertPlacesAnim,
            transform: [
              {
                scale: this.state.insertPlacesAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}>
          <PlaceList
            places={this.props.screenProps.places}
            onItemSelected={this.itemSelectedHandler}
          />
    </Animated.View>
      );
    }
    return (
      <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
        {content}
      </View>);
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    borderColor: '#7a9d96',
    borderWidth: 5,
    borderRadius: 40,
    padding: 20,
  },
  searchButtonText: {
    fontWeight: 'bold',
    color: '#7a9d96',
    fontSize: 25
  },
});

export default FindPlaceScreen;
