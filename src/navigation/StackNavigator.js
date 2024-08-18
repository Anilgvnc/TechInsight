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
import ForumScreen from '../screens/forumScreens/ForumScreen';
import UpdateForum from '../screens/forumScreens/UpdateForum';
import AddForum from '../screens/forumScreens/AddForum';
import AboutForum from '../screens/forumScreens/AboutForum';
import AddReply from '../screens/forumScreens/AddReply';
import UpdateReply from '../screens/forumScreens/UpdateReply';

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

function ForumStack() {
    const { t } = useTranslation();
    return (
        <Stack.Navigator screenOptions={HeaderOptions}>
            <Stack.Screen name='ForumScreen' component={ForumScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name='AboutForum' component={AboutForum} options={{
                title: t('aboutForum')
            }} />
            <Stack.Screen name='AddForum' component={AddForum} options={{
                presentation: "transparentModal",
                headerShown: false,
                animation: "slide_from_bottom"
            }} />
            <Stack.Screen name='UpdateForum' component={UpdateForum} options={{
                presentation: "transparentModal",
                headerShown: false,
                animation: "slide_from_bottom"
            }} />
            <Stack.Screen name='AddReply' component={AddReply} options={{
                presentation: "transparentModal",
                headerShown: false,
                animation: "slide_from_bottom"
            }} />
            <Stack.Screen name='UpdateReply' component={UpdateReply} options={{
                presentation: "transparentModal",
                headerShown: false,
                animation: "slide_from_bottom"
            }} />
        </Stack.Navigator>
    );
}

export { MainStack, AuthNavigation, AuthStack, ForumStack };