import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import QRScanner from '../screens/QRScanner';
import {ListPromo} from '../screens/ListPromo'
import {Profile} from '../screens/Profile';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Promotions"
        component={ListPromo}
        options={{
          title: 'Promotions',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="format-list-bulleted" />,
        }}
      />
      <BottomTab.Screen
        name="QRScanner"
        component={QRScanner}
        options={{
          title: 'Scanner QR',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="qrcode-scan" />,
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="account" />,
        }}
      />

    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Profile':
      return 'How to get started';
    case 'Promotions':
      return 'Liste des coupons';
    case 'QRScanner':
      return 'Détails du coupon';
  }
}
