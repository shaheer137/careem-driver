import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { updateDriverLocation } from '../config/firebase';

function Ride({ route }) {
    const [location, setLocation] = useState(null);
    const { id, pickup, destination } = route.params
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 0.5,
                timeInterval: 100
            }, (location) => {
                setLocation(location)
                updateDriverLocation(id, location.coords)
            })

        })();
    }, []);

    return <View>
        <MapView
            style={styles.map}
            region={{
                latitude: pickup.latitude,
                longitude: pickup.longitude,
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005
            }}
        >

            <Marker
                coordinate={{
                    latitude: pickup.latitude,
                    longitude: pickup.longitude,
                }}
                title={pickup.name}
                description={pickup.address}
            />

            <Marker
                coordinate={{
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                }}
                title={destination.name}
                description={destination.address}
            />

            {location && <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                title={'Driver Location'}
            />}

        </MapView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%',
    }

});
export default Ride