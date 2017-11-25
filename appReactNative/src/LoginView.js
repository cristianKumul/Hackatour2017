/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
} from 'react-native';

import FBSDK, { LoginButton, AccessToken }  from 'react-native-fbsdk';
import {Actions} from 'react-native-router-flux';
import firebase, { firebaseAuth, firebaseDatabase } from './firebase';

const addonisClient = require('./api-client');

const { FacebookAuthProvider } = firebase.auth;

export default class LoginView extends Component {
  state = {
    credentials : null
  }

  componentWillMount(){
    this.authenticateUSer();
  }

  authenticateUSer = () => {
      AccessToken.getCurrentAccessToken().then((data) => {
        const { accessToken } = data;
        const credential = FacebookAuthProvider.credential(accessToken);
        firebaseAuth.signInWithCredential(credential).then((credentials) =>{
          const email =  credentials.email;
          const uid = credentials.uid;
          var uid10 = uid.slice(0,10);
          const user = {
            fbId: uid10,
            nationality: "mexicana",
            tripMode: "family",
            age: 2,
            email: email,
          };
          addonisClient.createUser(user).then(function(response) {
            if(response.status == 200 && response.data.accessToken != null){
              const accessToken = response.data.accessToken;
              const userId = response.data.userId;
            }

          }).catch(function(err){
              console.log(err);
          });
          //this.setState({credentials});
         Actions.root(); 
        }, function(error) {
          console.log("Sign In Error", error);
        });
    })
  }

  handleLoginFinished = (error, result) => {
    if (error) {
      //alert("login has error: " + result.error);
      console.error(error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
          this.authenticateUSer();
          
    }
  }  

  render() {
    return (
      <Image source={require('./image/background.jpeg')} style={styles.container}>
        <Image source={require('./image/logo.png')} style={styles.logo} />
        <Text style={styles.welcome}>{this.state.credentials && this.state.credentials.displayName}</Text>
        <LoginButton
          readPermissions={["public_profile","email"]}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </Image>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,    
  },
  welcome:{
    fontSize:24,
    fontWeight:"bold",
    marginBottom:10,
    backgroundColor: 'transparent',
    color: 'white',

  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15
  }

});