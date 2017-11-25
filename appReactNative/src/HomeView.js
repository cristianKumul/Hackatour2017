/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Platform
} from 'react-native';
import ArtistList from './ArtistList';

const addonisClient = require('./api-client');

export default class HomeView extends Component {
state = {
  experiences: []
}

componentDidMount(){
  // .then(data => this.setState({artists: data}))
  let experiences = [ ...this.state.experiences ];
  
  const userId = '5a1970ea05a2f501b529061d';
  addonisClient.getExperienceProfile(userId).then(function(response) {
    const experienceIds = response.data.experiences;
    experienceIds.forEach(function(id) {
      addonisClient.getExperience(id).then(function(response) {
        console.log(response)
        const experience = response.data;
        experiences.push({experience});
      });
    });
  }).catch(function(err){
      console.log(err);
  });

}
  render() {
    const artists = this.state.artists;
    return (
      <View style={styles.container}>
        { !artists && <ActivityIndicator size="large" /> }
        { artists && <ArtistList artists={artists} /> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: Platform.select({
      ios: 30,
      android: 10
    }),    
  },

});