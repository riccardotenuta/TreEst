import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import AppModel from "./AppModel";

class Sponsor extends React.Component {

    componentDidMount() {
        console.log("esamefebbraio: tap su pin: "+AppModel.instance.getPinName()+" con messaggio pubblicitario: "+AppModel.instance.getPinAdv());
        console.log("SPONSOR IMAGE --> "+AppModel.instance.getPinImage());
        console.log("SPONSOR NAME --> "+AppModel.instance.getPinName());
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <View style={{
                        height: 40,
                        padding: 5,
                        flexDirection: "row"
                    }}>
                        <Image 
                            source={{uri: "data:image/png;base64,"+AppModel.instance.getPinImage()}}
                            style={styles.image}
                        />
                        <Text style={styles.authorName}>{AppModel.instance.getPinName()}</Text>
                    </View>

                    <View style={styles.content}>
                        <Text style={{
                            fontSize: 20
                        }}>{AppModel.instance.getPinAdv()}</Text>
                        <Text style={{
                            color: "grey",
                            marginTop: 10
                        }}>#adv #visitailsito</Text>
                    </View>

                    <View style={styles.footer}>
                        <Text style={{
                            position: "absolute",
                            right: 20,
                            bottom: 10,
                            color: "grey"
                        }}>{AppModel.instance.getPinUrl()}</Text>
                    </View>
                    
                </View>

                <View>
                    <TouchableOpacity 
                            style={{
                                width: 200,
                                alignSelf: "center",
                            }}
                            onPress={() => this.props.navigation.navigate("Map")}

                        >
                        <Text style={styles.buttonBack}> Indietro </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: "auto",
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        marginTop: 200,
        width: "auto",
        backgroundColor: "white",
        elevation: 8,
        borderRadius: 20,
        borderTopLeftRadius: 20
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 20
    },
    header: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#911a1a",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 40,
        paddingTop: 5,
        paddingLeft: 5
    },
    content: {
        padding: 20
    },
    footer: {
        flexDirection: "row",
        padding: 5,
        marginLeft: 10,
        marginTop: 50
    },
    authorName: {
        marginTop: 5,
        marginLeft: 10
    },
    buttonBack: {
        padding: 20,
        width: 200,
        backgroundColor: "#911a1a",
        borderRadius: 50,
        textAlign: "center",
        fontSize: 16,
        color: "white",
        marginTop: 30,
        alignSelf: "center"
    },
});

export default Sponsor;