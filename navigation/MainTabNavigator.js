/**
 * AnchorBuddy.  A mobile app to help with anchor calculations.
 * Copyright (C) 2018  Austin Goudge and Stephen Gorst
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import AnchorScreen from '../screens/AnchorScreen';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';

export default TabNavigator(
  {
    Anchor: {
      screen: AnchorScreen,
    },
    Help: {
      screen: HelpScreen,
    },
    About: {
      screen: AboutScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Anchor':
            iconName =
              Platform.OS === 'ios'
                ? `ios-boat`
                /*? `ios-boat${focused ? '' : '-outline'}`*/
                : 'md-boat';
            break;
          case 'Help':
            iconName =
              Platform.OS === 'ios'
                ? `ios-help-circle`
                /*? `ios-help-circle${focused ? '' : '-outline'}`*/
                : 'md-help-circle';
            break;
          case 'About':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle`
                /*? `ios-information-circle${focused ? '' : '-outline'}`*/
                : 'md-information-circle';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
