import React, { useCallback, useMemo, useRef } from 'react';
import * as Location from "expo-location"
import { View, StyleSheet, ActivityIndicator, Text, ScrollView, SafeAreaView,StatusBar } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Dimensions } from 'react-native';
import CommunicationController from './CommunicationController';
import AppModel from './AppModel';
import BottomSheet from "reanimated-bottom-sheet";
import Animated from 'react-native-reanimated';
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from '@react-native-community/geolocation';

class Map extends React.Component {

    state = {
        loading: false,
        stations: [],
        sponsors: [],
        location: null
    }

    static async locationPermissionAsync() {
        let locationPermission = false;
        console.log("ciao");

        const grantedPermission = await Location.getForegroundPermissionsAsync();
        if (grantedPermission.status === "granted") {
            locationPermission = true;
            console.log("permessi già accettai!");
        }
        else {
            const permissionResponse = await Location.requestForegroundPermissionsAsync();
            if (permissionResponse.status === "granted") {
                locationPermission = true;
            }
        }

        if (locationPermission) {
            console.log("Permessi accettati!");

            const location = await Location.getCurrentPositionAsync();
            console.log("location --> " + location.coords.latitude + ", " + location.coords.longitude);
        }

        return locationPermission;
    }

    componentDidMount() {

        let permission = Map.locationPermissionAsync();

            // navigator.geolocation.watchPosition(
            //     (position) => {
            //         console.log("new locations --> "+position);
            //     },
            //     (error) => {
            //         console.log("error o request position --> "+error.message);
            //     },
            //     options
            // );
        
        console.log(AppModel.instance.getSid() + " DID = " + AppModel.instance.getDirection());
        CommunicationController.getStations(AppModel.instance.getSid(), AppModel.instance.getDirection())
            .then(data => {
                if (data != false) {
                    AppModel.instance.setStations(data.stations);
                    this.state.stations = data.stations;
                    this.state.sponsors = AppModel.instance.getSponsors();
                    this.state.loading = true;
                    this.setState(this.state);
                }
            })
            .catch((error) => {
                console.log("Api call error");
                alert(error.message);
            });
    }

    renderContent = () => {
        return (
            <View //onLayout={(event) => {
                //  let layout = event.nativeEvent.layout; 
                //  const {x, y, width, height} = layout;
                //  this.state.heightBottomoSheet = height;
                //  console.log("ALTEZZA --> "+this.state.heightBottomoSheet);
                //  this.setState(this.state);
                // }}
                style={{
                    backgroundColor: 'white',
                    padding: 16,
                    elevation: 8,
                    height: 480
                }}
            >
                <View
                    style={{
                        height: 5,
                        width: 50,
                        position: 'absolute',
                        alignSelf: 'center',
                        top: 10,
                        backgroundColor: "#75230c",
                        justifyContent: 'center',
                        borderRadius: 50
                    }}>

                </View>
                <Text style={styles.head}>Stazioni</Text>

                {this.state.stations.map((station, index) => {

                    if (index == 0) {
                        return (
                            <View
                                key={station.sname}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <View style={styles.firstStation}>
                                    <View style={styles.indicator}></View>
                                </View>
                                <Text style={styles.stationName}>{station.sname}</Text>
                            </View>
                        )
                    } else if (index == this.state.stations.length - 1) {
                        return (
                            <View
                                key={station.sname}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                <View style={styles.lastStation}>
                                    <View style={styles.indicator}></View>
                                </View>
                                <Text style={styles.stationName}>{station.sname}</Text>
                            </View>
                        )
                    } else {
                        return (
                            <View
                                key={station.sname}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center' // center vartical text
                                }}>
                                <View style={styles.middleStation}>
                                    <View style={styles.indicator}></View>
                                </View>
                                <Text style={styles.stationName}>{station.sname}</Text>
                            </View>
                        )
                    }

                }
                )}


            </View>
        )
    }

    render() {
        Map.locationPermissionAsync();

        let bs = React.createRef();
        let fall = new Animated.Value(1);


        if (!this.state.loading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#911a1a"
                        style={{ alignContent: "center", marginTop: 350 }}
                    ></ActivityIndicator>
                </View>
            )
        } else {

            //this.renderContent();

            let coordinates = [];
            if (this.state.stations != []) {
                this.state.stations.forEach(station => {
                    let obj = {
                        latitude: parseFloat(station.lat),
                        longitude: parseFloat(station.lon)
                    }
                    coordinates.push(obj);
                });
            }

            console.log("coords --> " + coordinates);

            return (
                <View style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="#911a1a" />
                    <MapView style={styles.map}
                        initialRegion={{
                            latitude: parseFloat(this.state.stations[0].lat),
                            longitude: parseFloat(this.state.stations[0].lon),
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        showsUserLocation={true}
                    >
                        {this.state.stations.map(station => (
                            <Marker
                                key={station.sname}
                                coordinate={{ latitude: parseFloat(station.lat), longitude: parseFloat(station.lon) }}
                                title={station.sname}
                                image={require("../TreEst/img/map_marker.png")}
                            />
                        ))}
                        <Polyline
                            lineDashPattern={[0]}
                            coordinates={coordinates}
                            strokeColor="black"
                            strokeWidth={3}
                        />
                        {this.state.sponsors.map(sponsor => (
                            <Marker 
                                key={sponsor.name}
                                coordinate={{latitude: parseFloat(sponsor.lat), longitude: parseFloat(sponsor.lon)}}
                                title={sponsor.name}
                                image={{uri: "data:image/png;base64,"+sponsor.image}}
                                
                                onPress={() => this.goToSponsor(sponsor.name, sponsor.url, sponsor.text, sponsor.image)}
                            ><Text style={{
                                padding: 5,
                                backgroundColor: "white",
                                fontSize: 10,
                                marginBottom: 50,
                                borderRadius: 5,
                                borderWidth: 1,
                                borderColor: "#911a1a"
                            }}>{sponsor.name}</Text>
                                </Marker>
                        ))}
                    </MapView>

                    <BottomSheet
                        ref={this.bs}
                        renderContent={this.renderContent}
                        initialSnap={1}
                        borderRadius={20}
                        callbackNode={this.fall}
                        enabledGestureInteraction={true}
                        enabledBottomInitialAnimation={true}
                        enabledInnerScrolling={true}
                        snapPoints={[480, 180]}
                    />
                </View>



            );
        }
    }

    goToSponsor = (name, url, adv, image) => {
        AppModel.instance.setPinName(name);
        AppModel.instance.setPinUrl(url);
        AppModel.instance.setPinAdv(adv);
        AppModel.instance.setPinImage(image);

        this.props.navigation.navigate("Sponsor");
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: "100%",
    },
    head: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 5,
        marginBottom: 30
    },
    stationName: {
        fontSize: 18,
        marginLeft: 20
    },
    firstStation: {
        height: 60,
        width: 25,
        backgroundColor: "#db8680",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    lastStation: {
        height: 60,
        width: 25,
        backgroundColor: "#db8680",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    middleStation: {
        height: 60,
        width: 25,
        backgroundColor: "#db8680",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    indicator: {
        width: 18,
        height: 18,
        backgroundColor: "#75230c",
        borderRadius: 50
    }
});

export default Map;