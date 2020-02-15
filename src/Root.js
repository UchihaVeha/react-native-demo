import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Provider as PaperProvider,
  ActivityIndicator
} from 'react-native-paper';
import HomeScreen from './Screens/HomeScreen';
import AddCompanyScreen from './Screens/AddCompanyScreen';
import useAuth from './Hooks/useAuth';

const Stack = createStackNavigator();

export default function App() {
  const { isLoading, isLoggedIn, error } = useAuth();
  // TODO handle error
  return (
    <PaperProvider testID="paperProvider">
      <NavigationContainer>
        {isLoading && (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        )}
        {!isLoading && isLoggedIn && (
          <Stack.Navigator>
            <Stack.Screen name="Companies" component={HomeScreen} />
            <Stack.Screen name="AddCompany" component={AddCompanyScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
