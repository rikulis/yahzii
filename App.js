import React from 'react';
import { View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import styles from './style/style';
import Gameboard from './components/Gameboard';
import Home from './components/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Scoreboard from './components/Scoreboard';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <View style={styles.container}> 
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'home') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Gameboard') {
              iconName = focused ? 'ios-game-controller' : 'ios-game-controller';
            }
            else if (route.name === 'Scoreboard') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }
            

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <Tab.Screen name="home" component={Home} options={{tabBarStyle: {display:'none'}}} />
      <Tab.Screen name="Gameboard" component={Gameboard} />
      <Tab.Screen name="Scoreboard" component={Scoreboard} />
      
      </Tab.Navigator>
      
      </NavigationContainer>
      
    </View>
  );
}