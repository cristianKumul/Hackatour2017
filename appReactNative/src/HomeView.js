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
    let list_promises = [];
    const userId = '5a19b09d708ec220e5d763f7';
    addonisClient.getExperienceProfile(userId).then(function(response) {
      const experienceIds = response.data.experiences;
      console.log(experienceIds);
      experienceIds.forEach(function(id) {
          list_promises.push(addonisClient.getExperience(id));
      });
      Promise.all(list_promises).then(function(list_experiencies){
        console.log(list_experiencies);
        this.setState({experiences: list_experiencies})
      });      
    }).catch(function(err){
        console.log(err);
    });
  }
  render() {
    const experiences = this.state.experiences;
    console.log(experiences);
    return (
      <View style={styles.container}>
        { !experiences && <ActivityIndicator size="large" /> }
        { experiences && <ArtistList artists={experiences} /> }
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