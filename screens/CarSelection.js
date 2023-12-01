import { useEffect, useState } from 'react'
import { View, Text, StyleSheet,Image ,Button } from 'react-native'
import { addARide } from '../config/firebase'

export default function CarSelection({route}) {
  const {pickupLocation,destinationLocation} = route.params
  const [distance,setDistance] = useState(0)
  const [fare,setFare] = useState(0)
  const [carType,setCarType]= useState()

  useEffect(()=>{
    const {latitude:pickupLatitude,longitude:pickupLongitude} = pickupLocation.geocodes.main
    const {latitude:destinationLatitude,longitude:destinationLongitude} = destinationLocation.coords
    const distance = calcCrow(pickupLatitude,pickupLongitude,destinationLatitude,destinationLongitude)
    setDistance(distance)
  },[])

  function calcCrow(lat1, lon1, lat2, lon2) 
  {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) 
  {
      return Value * Math.PI / 180;
  }

   async function requestRide(){
    const {latitude:pickupLatitude,longitude:pickupLongitude} = pickupLocation.geocodes.main
    const {latitude:destinationLatitude,longitude:destinationLongitude} = destinationLocation.coords

    const request = {
      pickup: {
        latitude : pickupLatitude,
        longitude : pickupLongitude,
        name:pickupLocation.name,
        address: pickupLocation.location.address
      },
      destination:{
        latitude : destinationLatitude,
        longitude : destinationLongitude,
        name: destinationLocation.coords.location.name,
        address: destinationLocation.coords.location.location.address
      },
      carType,
      fare,
      status:'pending'
    }

   await addARide(request)

   alert('Ride requested successfully')

  }
 
  return <View style={styles.container}>
    <Text style={styles.title}>CarSelection</Text>
    <Text style={styles.title}> Pickup Location: {pickupLocation.name}</Text>
    <Text style={styles.title}> Destination Location: {destinationLocation.coords.location.name}</Text>
    <Text style={styles.title}>Distance: {distance.toFixed(2)} KM</Text>
    <Text style={styles.title}>Fare: Rs {Math.round(fare)}</Text>
    <View style={{flexDirection:'row'}} >
    <Text onPress={()=>{setCarType('Bike')
       setFare(distance * 70) }} style={styles.rides}>Bike<Image source={{uri: 'https://imgd.aeplcdn.com/370x208/n/cw/ec/43482/sp-125-right-front-three-quarter-2.jpeg?isig=0&q=80'}} style={{width:30,height:30}}/></Text>
      <Text onPress={()=>{setCarType('Rickshaw')
       setFare(distance * 150) }} style={styles.rides}>Rickshaw<Image source={{uri: 'https://i.tribune.com.pk/media/images/1671727-m-1522296266/1671727-m-1522296266.jpg'}} style={{width:30,height:30}}/></Text>
      <Text onPress={()=>{setCarType('Car Mini')
       setFare(distance * 200) }} style={styles.rides}>Economy<Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCOWAs52sBj48QFhCt2t6HJKxxNJ29d28sdg&usqp=CAU'}} style={{width:30,height:30}}/></Text>
      <Text onPress={()=>{setCarType('Car AC')
       setFare(distance * 350) }} style={styles.rides}>Comfort  <Image source={{uri: 'https://cache1.pakwheels.com/system/car_generation_pictures/6425/original/Honda_City_Front.jpg?1651424945'}} style={{width:30,height:30}}/></Text>
    </View>
    <Button color='lightgreen' title="LET'S GO!" onPress={()=>requestRide()}/>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
   justifyContent:'center',
    backgroundColor:'green'
  },
  title:{
    fontSize:15,
    backgroundColor:'white',
    padding:10,
    borderBottomWidth:2,
    borderBottomColor:'grey'
  },
  rides:{
    fontSize:14,
    backgroundColor:'white',
    margin:3,
    padding:1,
    height:65,
  }
})
 