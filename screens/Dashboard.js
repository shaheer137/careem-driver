import { useEffect,useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import {collection,query,where,onSnapshot,db,updateStatus} from '../config/firebase'

export default function Dashboard({navigation}) {
  const [rides,setRides] = useState([])

  useEffect(()=>{
    renderRides()
  },[])

  const renderRides = async () =>{
    const q = query(collection(db, "rides"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempRides = [];
      querySnapshot.forEach((doc) => {
          tempRides.push({id:doc.id,...doc.data()});
      });
      setRides(tempRides)
    });
  }
  console.log('rides',rides)

  return <View style={styles.container}>
    <Text style={styles.title}>Driver</Text>
    {rides.map(item=>{
      return <View style={styles.rides}>
        <Text>Pickup Location:{item.pickup.name}</Text>
        <Text>Destination Location:{item.destination.name}</Text>
        <Text>Car:{item.carType}</Text>
        <Text>Fare: Rs.{Math.round(item.fare)}</Text>
        <Button color='green' title='Accept' onPress={()=>{
          updateStatus(item.id,'accepted')
          navigation.navigate('Ride',item)
        }}/>
        <Text style={{textAlign:'center'}}>OR</Text>
        <Button color='green' title='Reject'onPress={()=>{
          updateStatus(item.id,'rejected')
        }}/>
      </View>
    })}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  title: {
    fontSize: 25,
    padding: 2,
    textAlign:'center',
    margin:1
  },
  rides: {
    border:'1px solid white',
    backgroundColor: 'lightgreen',
    margin: 3,
    padding: 5,
    height:'31%'
  }
 })