/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';

import { firebaseDatabase, firebaseAuth } from './firebase';
import Icon from 'react-native-vector-icons/Ionicons';

import { getArtists } from './api-client'

import ArtistBox from './ArtistBox';
import CommentList from './CommentList';
export default class ArtistDetailView extends Component {

  state = {
    comments : []
  }

  handleSend = () =>{
    const { text } = this.state
    const { uid, photoURL } = firebaseAuth.currentUser

    const artistCommentsRef = this.getArtistCommentsRef()
    var newCommentRef = artistCommentsRef.push()
    newCommentRef.set({
       text,
       userPhoto: photoURL,
       uid
      });
    this.setState({ text: '' })
  }

  componentDidMount() {
    this.getArtistCommentsRef().on('child_added', this.addComment)
  }
  addComment = (data) => {
    const comment = data.val()
    this.setState({
      comments: this.state.comments.concat(comment)
    })
  }

  componentWillUnmount() {
    this.getArtistCommentsRef().off('child_added', this.addComment)
  }


  
  getArtistCommentsRef = () => {
    const { id } = this.props.artist
    return firebaseDatabase.ref(`comments/${id}`)
  }

  handleChangeText = (text) => this.setState({text})

  render() {
    const artist = this.props.artist;
    const { comments}  = this.state
    const textPlaceholder = "Opina sobre el artista"
    return (
      <View style={styles.container}>
        <ArtistBox artist={artist} />
        <Text style={styles.header}>Comentarios</Text>

        <CommentList comments={comments} />
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} 
          onChangeText={this.handleChangeText}
          placeholder ={textPlaceholder}
          value={this.state.text}
          />    
          <TouchableOpacity onPress={this.handleSend} >
            <Icon name="ios-send-outline" size={30} color="#e74c3c" />
          </TouchableOpacity>    
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    paddingTop: Platform.select({
      ios: 70,
      android: 10
    })    
  },
  inputContainer:{
    position:'absolute',
    bottom:0,
    right:0,
    left:0,
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection:'row',
    alignItems:"center",

  },
  input:{
    height:50,
    flex:1
  },
  header:{
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10
  }

});