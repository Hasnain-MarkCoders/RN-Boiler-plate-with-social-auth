import React from 'react';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import GetStarted from '../GetStarted/GetStarted';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SocialSignIn from '../SocialSignIn/SocialSignIn';

const Stack = createNativeStackNavigator();

const PublicStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade'
            }}
        >
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="SocialSignIn" component={SocialSignIn} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            
        </Stack.Navigator>
    );
}

export default PublicStack;
