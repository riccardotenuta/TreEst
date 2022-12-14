import React from "react";
import { 
View,
StatusBar,
TouchableHighlight,
Text,
StyleSheet
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

const SetupWelcome = ({ navigation }) => {
    
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#75230c" />
            <View>
                <Text style={styles.welcomeText}>
                    Benvenuto nell'app 
                <Text
                    style={{fontStyle:"italic", textDecorationLine:"underline"}}> TreEst </Text>
                </Text>
            </View>

            <TouchableHighlight 
                onPress={() => navigation.navigate("Setup")}
                underlayColor="white" 
                activeOpacity={0.7}
                style={{width: 200}}>
                <View
                    style={styles.welcomeButton}>

                    <Text style={styles.welcome}>
                        INIZIA ORA
                    </Text>

                </View>
            </TouchableHighlight>

            <View>
                <Text
                    style={{fontStyle:"normal", fontSize: 16, fontWeight: "bold", marginTop: 80, width:300}}>
                    Visualizza tutti gli aggiornamenti sulle tratte delle nostre linee!
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        backgroundColor: "#FFFF"
    },
    welcomeText: {
        fontFamily: "Roboto",
        fontSize: 65,
        fontWeight: "bold",
        marginTop: 60
    },
    welcome: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        color: "#FFFF"
    },
    welcomeButton: {
        width: 200,
        elevation: 20,
        marginTop: 50,
        backgroundColor: '#75230c',
        borderRadius: 50,
        padding: 30,
        textAlign: "center"
    }
})

export default SetupWelcome;