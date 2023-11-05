import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Pages from '@Pages';

import { ErrorBoundary } from './ErrorBoundry';
import { RootStackParamList } from './Navigation.d';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function App() {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'CityInfo'} component={Pages.CityInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </ErrorBoundary>
  );
}
