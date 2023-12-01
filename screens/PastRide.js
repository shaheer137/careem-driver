import { View, Text, Button } from 'react-native'

export default function PastRide({ navigation }) {
  return <View>
    <Text>PastRide</Text>
    <Button title='Ride Details' onPress={() => navigation.navigate('PastRideDetails')} />
  </View>
}