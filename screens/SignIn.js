// import { View, Button } from 'react-native'

// export default function Signup({navigation}) {
//   return <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
//     {/* <Text>Signup</Text> */}
//     <Button title='Signup' onPress={()=>navigation.navigate('Dashboard')} />
//   </View>
// }

import { View, Button, Image } from 'react-native'

export default function SignIn({navigation}) {
  return <View style={{flex:1,justifyContent:'space-evenly',alignItems:'center',backgroundColor:'lightgreen'}}>
    <Image source={{uri: 'https://insights.datadarbar.io/wp-content/uploads/2022/05/Careem-1.jpeg'}} style={{width:390,height:200}}/>
    <Button title='Sign In With Facebook' color='green' onPress={()=>navigation.navigate('Dashboard')} />
  </View>
}