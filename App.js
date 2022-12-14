import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import AppModel from './AppModel';
import SetupSelectionLine from './SetupSelectionLine';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetupWelcome from './SetupWelcome';
import Tabs from './Tabs';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import StorageManager from './StorageManager';
import CommunicationController from './CommunicationController';
import Map from './Map';
import addPost from './addPost';
import Sponsor from './Sponsor';

const Stack = createNativeStackNavigator();

function welcome({navigation}) {
  return ( 
      <SetupWelcome navigation={navigation}></SetupWelcome>
  )
}

export default class App extends React.Component {

  state = {
    loading: false,
    initialPage: ""
  }

  componentDidMount() {
    //StorageManager.instance.clearStorage();
    StorageManager.instance.checkFirstRun()
    .then((value) => {
      this.state.initialPage = value;
      console.log("initial page is "+this.state.initialPage);
      this.state.loading = true;      
    })
    .then(() => {
      StorageManager.instance.loadDataStorage();
    })
    .then(() => this.setState(this.state))
    .catch(err => console.log(err));
  }

  render() {

    if (!this.state.loading) {
      return (
          <View>
              <ActivityIndicator size="large" color="#911a1a"
              style={{alignContent: "center", marginTop: 300}}
              ></ActivityIndicator>
          </View>
      )
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={this.state.initialPage}>
            <Stack.Screen 
            name="Welcome" 
            component={welcome}
            options={
              {
                title: "Welcome",
                headerStyle: {
                  backgroundColor: "#75230c"
                },
                headerTintColor: "#FFFF",
                headerTitleAlign: 'center',
                
              }
            }
            />
            <Stack.Screen name="Setup" component={SetupSelectionLine}
            options={
              {
                title: "Scegli una direzione",
                headerStyle: {
                  backgroundColor: "#75230c"
                },
                headerTintColor: "#FFFF",
                headerTitleAlign: 'center',
                
              }
            }
            />
            <Stack.Screen name="Tabs" component={Tabs}
              options={
                {
                  title: "Home",
                  headerStyle: {
                    backgroundColor: "#75230c"
                  },
                  headerTintColor: "#FFFF",
                  headerTitleAlign: 'center',
                  headerLeft: null,
                  gestureEnabled: false,
                  headerShown: false,
                  
                }
              }
              />
              <Stack.Screen name="Map" component={Map}
                options={{
                  title: "Mappa",
                  headerStyle: {
                    backgroundColor: "#75230c"
                  },
                  headerTintColor: "#FFFF",
                  headerTitleAlign: 'center',
                  headerLeft: null,
                  gestureEnabled: false,
                  headerShown: false
                }}
              />
              <Stack.Screen name="addPost" component={addPost}
                options={{
                  title: "addPost",
                  headerStyle: {
                    backgroundColor: "#75230c"
                  },
                  headerTintColor: "#FFFF",
                  headerTitleAlign: 'center',
                  headerLeft: null,
                  gestureEnabled: false,
                  headerShown: false
                }}
              />
              <Stack.Screen name="Sponsor" component={Sponsor}
                options={{
                  title: "Sponsor",
                  headerStyle: {
                    backgroundColor: "#75230c"
                  },
                  headerTintColor: "#FFFF",
                  headerTitleAlign: 'center',
                  headerLeft: null,
                  gestureEnabled: false,
                  headerShown: false
                }}
              />
            </Stack.Navigator>
        </NavigationContainer>
      );
    
    }
  
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
