import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../store/auth-context';
import ThemeContextProvider from '../store/ThemeContext';
import LoginScreen from '../screens/authScreens/LoginScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import { Colors, HeaderOptions } from '../constants/styles';
import DrawerNavigator from './DrawerNavigator';
import ProductsContextProvider from '../store/products-context';
import TabNavigator from './TabNavigator';
import AboutProduct from '../screens/productScreens/AboutProduct';
import { IconButton } from 'react-native-paper';
import AddReview from '../screens/productScreens/AddReview';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();



function MainStack() {
    const { t } = useTranslation();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={TabNavigator} />
            {/* Add more screens if needed */}
            <Stack.Group screenOptions={{ headerShown: true }}>
                <Stack.Screen options={{
                    title: t('aboutProduct')
                }} name="AboutProduct" component={AboutProduct} />
                <Stack.Screen options={{
                    title: t('addReview')
                }} name="AddReview" component={AddReview} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

function AuthNavigation() {
    const authCtx = useContext(AuthContext);

    return (
        <>
            {!authCtx.isAuthenticated && <AuthStack />}
            {authCtx.isAuthenticated && <MainStack />}
        </>
    );
}

function AuthStack() {
    const { t } = useTranslation();

    return (
        <Stack.Navigator screenOptions={HeaderOptions}>
            <Stack.Screen name="Login" component={LoginScreen}
                options={{
                    headerShown: false,
                    title: t('login')
                }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} options={{
                title: t('register'),
                headerRight: () => { }
            }} />
            {/* Add more screens if needed */}
        </Stack.Navigator>
    );
}

export { MainStack, AuthNavigation, AuthStack };