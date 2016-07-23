import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      user: null
    }
  }

  componentDidMount(){
    this._setupGoogleSignin();
  }


  render(){
    if (!this.state.user) {
          return (
            <View style={styles.container}>
              <GoogleSigninButton style={{width: 312, height: 48}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Wide} onPress={() => { this._signIn(); }}/>
            </View>
          );

  }
            var self_photo;
            if (this.state.user.photo !== null)
          {
            self_photo=
              <Image source={{uri: this.state.user.photo}}
                style={styles.thumbnail}/>;

          } else{
            self_photo=<Image source={require('./img/app.png')} 
                style={styles.thumbnail}/> ;

          }
    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Welcome {this.state.user.name}</Text>
          <Text>Your email is: {this.state.user.email}</Text>
          <Text>Your photo is: </Text>
          <View>
        {self_photo}

        </View>

          <TouchableOpacity onPress={() => {this._signOut(); }}>
            <View style={{marginTop: 50}}>
              <Text>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }


  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
        webClientId: '118347608165-acbkf74tatl10rut2lfv9jlckm2dpi8c.apps.googleusercontent.com',
        offlineAccess: true
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Play services error", err.code, err.message);
    }
  }

  _signIn() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  _signOut() {
    GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
      this.setState({user: null});
    })
    .done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 81,
    height: 81,
    marginLeft:10,
    marginBottom:10,
  },
});




module.exports=Profile;