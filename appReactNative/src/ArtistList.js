/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableOpacity
} from 'react-native';
import ArtistBox from './ArtistBox';
import {Actions} from 'react-native-router-flux'

export default class ArtistList extends Component {

  constructor(props) {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds
    };
    
  }

  updateDataSource(data){
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
      })
  }

  componentDidMount(){
    this.updateDataSource(this.props.artists)
  }
  componentWillReceiveProps(newProps){
    if(newProps.artists!= this.props.artists){
      this.updateDataSource(newProps.artists)
    }
  }
handlePress(artist){
Actions.artistDetail({artist})
}
  render() {
    return (
      <ListView
      enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(artist) => {
          return (
          <TouchableOpacity onPress={()=>this.handlePress(artist)}>
            <ArtistBox artist={artist} />
          </TouchableOpacity>
          )
          }
        }
      />
    );
  }
}

const styles = StyleSheet.create({


});

