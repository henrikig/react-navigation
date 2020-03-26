import React, {Component} from 'react';

import AppContainer from './src/components/screens/MainTabNavigator';

export default class App extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      places: [],
    }
  }

  placeAddedHandler = placeName => {
    this.setState(prevState => {
      return {
        places: prevState.places.concat({
          key: Math.random(),
          name: placeName,
          image: {
            uri:
              "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg"
          }
        })
      };
    });
  };

  placeDeletedHandler = key => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter(place => {
          return place.key !== key;
        }),
      };
    });
  };

  tryAuth = (authData) => {
    return;
  }

  render() {
    return <AppContainer
      screenProps = {{
        ...this.state,
        onAddPlace: this.placeAddedHandler,
        onPlaceDeleted: this.placeDeletedHandler,
        onLogin: this.tryAuth,
      }}/>;
  }
}
