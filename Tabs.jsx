import React from 'react';
import { View } from 'react-native';
import Home from './Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lines from './Lines';
import Profile from './Profile';
import { Icon } from 'react-native-elements';
import AppModel from './AppModel';
import SetupSelectionLine from './SetupSelectionLine';
import StorageManager from './StorageManager';

const Tab = createBottomTabNavigator();

class Tabs extends React.Component {

  render() {
    return (
      <Tab.Navigator initialRouteName="Feed della tratta"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 80,
            elevation: 8
          },
          tabBarHideOnKeyboard: true
        }}
      >
        <Tab.Screen 
          name="Linee" 
          component={Lines}
          options= {{
            tabBarIcon: ({focused}) => (<Icon name="train" size={35} 
            color={focused ? "#75230c" : "#a2a4a8"}
            ></Icon>)
          }}
        />
        <Tab.Screen 
          name="Feed della tratta" 
          component={Home}
          navigation={this.props.navigation}
          options= {{
            tabBarIcon: ({focused}) => (<Icon name="home" size={35} type="foundation"
            color={focused ? "#75230c" : "#a2a4a8"}
            ></Icon>)
          }}
        />
        <Tab.Screen 
          name="Profilo" 
          component={Profile}
          options= {{
            tabBarIcon: ({focused}) => (<Icon name="user" size={35} type="font-awesome"
            color={focused ? "#75230c" : "#a2a4a8"}
            ></Icon>),
            
          }}
        />
      </Tab.Navigator>
    )
  }
}

export default Tabs;
  