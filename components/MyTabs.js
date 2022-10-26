
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './SignInScreen';
import HomeScreen from './HomeScreen';
import { StyleSheet } from 'react-native';

function MyTabs() {
   
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            {/* Le sign in sera pris en compte avant, HomeScreen obligatoire pour y accéder après  */}
            <Stack.Screen name="NewHomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default MyTabs