/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


var OutlineNav = require('./OutlineNav');
var FrontNav = require('./FrontNav');
var SearchNav = require('./SearchNav');
var Profile = require('./Profile');


var ScrollableTabView = require('react-native-scrollable-tab-view');

class Good extends Component {
  render(){
    return (
      <ScrollableTabView tabBarPosition='bottom'
            initialPage={0}>
        <FrontNav tabLabel="Featured" />
        <OutlineNav tabLabel="Popular" />
        <SearchNav tabLabel="Search" />
        <Profile tabLabel="Profile" />

      </ScrollableTabView>

    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    backgroundColor: '#a9a9a9',
    height: 56,
  },
});


AppRegistry.registerComponent('Good', () => Good);
