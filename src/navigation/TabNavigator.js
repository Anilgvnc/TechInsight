import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NotificationScreen from '../screens/NotificationScreen';
import AccountScreen from '../screens/AccountScreen';
import { Colors } from '../constants/styles';

import DrawerNavigator from './DrawerNavigator';


const Tab = createBottomTabNavigator();

// Tab Navigator ----------------------------------------------------------

function TabNavigator() {
  const { t } = useTranslation();
  const [notificationNum, setNotificationNum] = useState(0);

  return (
    <Tab.Navigator
      screenOptions={

        ({ route }) => ({
          tabBarIcon: ({ color, size }) => {

            let iconName;

            if (route.name === 'Main Page') {
              iconName = 'home'
            } else if (route.name === 'Notifications') {
              iconName = 'notifications'
            }
            else if (route.name === 'Account') {
              iconName = 'person-circle'
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })
      }
    >
      <Tab.Screen name="Main Page" component={DrawerNavigator}
        options={{ title: t('mainPage') }}
      />

      <Tab.Screen name="Notifications" component={NotificationScreen}
        options={{
          title: t('notifications'),
          tabBarBadge: notificationNum,
          tabBarBadgeStyle: {
            backgroundColor: Colors.primary, // Customize the badge background color
            borderColor: '#fff',
            fontSize: 14, // Customize the badge font size
            borderWidth: 1,
            // You can also add more styles here
          },
        }}
      />
      <Tab.Screen name="Account" component={AccountScreen}
        options={{ title: t('account') }}
      />

    </Tab.Navigator>
  )
};


export default TabNavigator;
