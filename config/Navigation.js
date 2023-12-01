import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import Dashboard from '../screens/Dashboard';
import Pickup from '../screens/Pickup';
import Destination from '../screens/Destination';
import CarSelection from '../screens/CarSelection'
import SignIn from '../screens/SignIn';
import PastRide from '../screens/PastRide';
import PastRideDetails from '../screens/PastRideDetails';
import Ride from '../screens/Ride';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// export default function Main() {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator initialRouteName='Signup'>
//                 <Stack.Screen name="Signup" component={Signup} />
//                 <Stack.Screen name="Dashboard" component={Dashboard} />
//                 <Stack.Screen name="Pickup" component={Pickup} />
//                 <Stack.Screen name="Destination" component={Destination} />
//                 <Stack.Screen name="CarSelection" component={CarSelection} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     )
// }

export default function Main() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Dashboard" component={DashboardStack} />
                <Drawer.Screen name="Past Rides" component={PastRideStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

function DashboardStack() {
    return (
        <Stack.Navigator initialRouteName='Dashboard'>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Ride" component={Ride} />
            <Stack.Screen name="Pickup" component={Pickup} />
            <Stack.Screen name="Destination" component={Destination} />
            <Stack.Screen name="CarSelection" component={CarSelection} />
        </Stack.Navigator>
    );
}

function PastRideStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="PastRide" component={PastRide} />
        <Stack.Screen name="PastRideDetails" component={PastRideDetails} />
      </Stack.Navigator>
    );
  }