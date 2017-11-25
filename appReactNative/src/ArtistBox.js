/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseDatabase, firebaseAuth } from './firebase';
export default class ArtistBox extends Component {
    state = {
        liked:false
    }
    getArtistRef = () =>{
        const { id } = this.props.artist;
        return firebaseDatabase.ref(`artist/${id}`)
    }

  componentWillMount() {
    const { uid } = firebaseAuth.currentUser
    this.getArtistRef().on('value', snapshot => {
      const artist = snapshot.val()
      if (artist) {
        this.setState({
          likeCount: artist.likeCount,
          liked: artist.likes && artist.likes[uid]
        })
      }
    })
  }


    toggleLike = () => {
        const { uid } = firebaseAuth.currentUser;
        this.getArtistRef().transaction(function(artist) {
            if (artist) {
                if (artist.likes && artist.likes[uid]) {
                    artist.likeCount--;
                    artist.likes[uid] = null;
                } else {
                    artist.likeCount++;
                    if (!artist.likes) {
                        artist.likes = {};
                    }
                    artist.likes[uid] = true;
                }
            }
            return artist || {
                likeCount:1,
                likes:{
                    [uid]:true
                }
            };
        });
    }
    handlePress = () => {
        this.toggleLike()
    }
  render() {

      const likeIcon = this.state.liked? <Icon name="ios-heart" size={30} color="red" /> : <Icon name="ios-heart-outline" size={30} color="gray" /> ;
    //console.warn("nombre" ,this.props.artist.name );
    const { image, name, likes, comments} = this.props.artist;
    const { likeCount } =   this.state ;
    return (
        <View style={styles.artistBox}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.info}>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={this.handlePress}>
                            {likeIcon}   
                        </TouchableOpacity>
                        <Text style={styles.count}>{likeCount}</Text>
                    </View>
                    <View style={styles.iconContainer}>     
                        <Icon name="ios-chatboxes-outline" size={30} color="gray" />
                        <Text style={styles.count}>{comments}</Text>
                    </View>
                </View>    
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({


  image: {
    width:150,
    height: 150
  },
  artistBox:{
      flexDirection: "row",
      margin:5,
      shadowColor:'black',
      shadowOpacity: .2,
      shadowOffset:{
          height: 5,
          width: 5
      },
      elevation:5
  },
  info: {
      flex: 1,
      alignItems:"center",
      flexDirection:"column",
      backgroundColor:"white",
      justifyContent:"center"

  },
  name:{
    fontSize:20,
    marginTop: 20,
    color:"#333"
  },
  row:{
     flexDirection:"row", 
     justifyContent:"space-between",
     marginHorizontal: 30,
     marginTop:15,
  },
  iconContainer:{
      flex:1,
      alignItems:"center"

  },
  count: {
      color:"gray"
  }
     
});

