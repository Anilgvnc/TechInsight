import React from 'react';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import NewProductScreen from '../screens/NewProductScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
import { HeaderOptions } from '../constants/styles';
import MainScreen from '../screens/MainScreen';
import ProductControl from '../screens/ProductControlScreen';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const { t } = useTranslation();

  return (
    <Drawer.Navigator screenOptions={HeaderOptions} drawerContent={
      (props) => {
        return (
          <SafeAreaView>
            <View style={styles.logoContainer}>
              <Image style={styles.avatar} source={require('../../assets/logo.png')} />
            </View>
            <DrawerItemList{...props} />
          </SafeAreaView>
        );
      }
    }>
      <Drawer.Screen name="MyHome" component={MainScreen}
        options={{
          title: t('myHome'),
          drawerIcon: () => (
            <Ionicons name="home-outline" size={24} />
          )
        }}
      />
      <Drawer.Screen name="Product control" component={ProductControl}
        options={{
          title: t('prodControl'),
          drawerIcon: () => (
            <Ionicons name="barcode-outline" size={24} />
          )
        }}
      />
      <Drawer.Screen name="New review" component={NewProductScreen}
        options={{
          title: t('newProduct'),
          drawerIcon: () => (
            <Ionicons name="add-circle-outline" size={24} />
          )
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{
        title: t('settings'),
        drawerIcon: () => (
          <Ionicons name="settings-outline" size={24} />
        )
      }}
      />
      {/* Add more screens if needed */}
    </Drawer.Navigator>
  )
};


export default DrawerNavigator;

const styles = StyleSheet.create({
  logoContainer: {
    height: 32,
    width: '100%',
    marginBottom: 32,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  avatar: {
    flex: 1,
    padding: 42,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.50,
  },
})