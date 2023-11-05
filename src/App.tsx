import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ErrorBoundary } from './ErrorBoundry';
import { RootStackParamList } from './Navigation.d';
import * as Screens from './Screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'UserInfo'} component={Screens.UserInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
