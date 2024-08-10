import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../store/auth-context';
import LoginScreen from '../screens/authScreens/LoginScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import { HeaderOptions } from '../constants/styles';
import TabNavigator from './TabNavigator';
import AboutProduct from '../screens/productScreens/AboutProduct';
import AddReview from '../screens/productScreens/AddReview';
import UpdateReview from '../screens/productScreens/UpdateReview';

const Stack = createStackNavigator();



function MainStack() {
    const { t } = useTranslation();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Group screenOptions={HeaderOptions}>
                <Stack.Screen options={{
                    title: t('aboutProduct')
                }} name="AboutProduct" component={AboutProduct} />
                <Stack.Screen options={{
                    presentation: "transparentModal",
                    headerShown: false,
                    animationTypeForReplace: "slide_from_bottom"
                }} name="AddReview" component={AddReview} />
                <Stack.Screen options={{
                    presentation: "transparentModal",
                    headerShown: false,
                    animation: "slide_from_bottom"
                }} name="UpdateReview" component={UpdateReview} />
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