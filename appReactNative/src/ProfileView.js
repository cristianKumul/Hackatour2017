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
  Platform,
  Image,
} from 'react-native';
import { CheckBox } from 'react-native-elements';

export default class ArtistDetailView extends Component {

  state = {
    comments : [],
    checked : false,
  }
  constructor() {
    super();

    this.state = {
      checked: false
    };
  }
  componentDidMount() {
      
  }

  componentWillUnmount() {
    
  }
  
  render() {
    const { tag } = this.props;
    const { checked } = this.state;
    return (
        <Image source={require('./image/background.jpeg')} style={styles.container}>
            <Image source={require('./image/logo.png')} style={styles.logo} />
            <Text style={styles.textContainer}>Crea una ruta</Text>
            <View style={styles.boxContainer}>
                
                <View>
                <CheckBox
                    center
                    title='Musica'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.checked}
                    checked={checked}
                    onPress={() => this.setState({checked: !checked})}
                />
                <CheckBox
                    center
                    title='Creatividad'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.checked}
                    checked={checked}
                    onPress={() => this.setState({checked: !checked})}
                />
                <CheckBox
                    center
                    title='Deportes'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.checked}
                    checked={checked}
                    onPress={() => this.setState({checked: !checked})}
                />
                <CheckBox
                    center
                    title='Amigos'
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    checked={this.state.checked}
                    checked={checked}
                    onPress={() => this.setState({checked: !checked})}
                />
            </View>
            </View>
                        
        </Image>

        
        
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
  textContainer:{
    fontSize:24,
    color: 'black',
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 0,
    top: -50,
  },
  boxContainer: {
    backgroundColor: 'white',
    width: 370,
    height: 250,
    top: -50,
    flexDirection: 'row',
    justifyContent: 'center',
    
  }
});