// import { View, Text, } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Search from "./Search"
import ChosenPage from "./ChosenPage"
import { StyleSheet } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";


function HomeScreen() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator 
    screenOptions=
    {({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name == "Search") {
          iconName = "barcode-outline";


        } else if (route.name == "ChosenPage") {
          iconName = "settings-outline";
         }

        // if 
        //   (route.name == "Previous") {
        //     iconName = "scan-circle-outline";
        //   }


        return <Ionicons name={iconName} size={25} color="green" />;
      },

      tabBarActiveTintColor: 'green',
      
        headerShown: false
          
    })}>
      
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="ChosenPage" component={ChosenPage} />
      
      
      
      </Tab.Navigator>
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
    
    
    export default HomeScreen
    // screenOptions={{
    //   tabBarActiveTintColor: 'green',
    // }}>