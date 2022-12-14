import React from "react";
import { View, Text, StatusBar, TextInput, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import AppModel from "./AppModel";
import CommunicationController from "./CommunicationController";
import { Picker } from "@react-native-picker/picker";

class addPost extends React.Component {

    state = {
        selectedDelay: -1,
        selectedStatus: -1,
        textLength: 0,
        text: ""
    }

    render() {

        let terminus = AppModel.instance.getTerminusFromDirection();
        return(
            <View>
                
                <StatusBar barStyle="light-content" backgroundColor="#911a1a" />
                <Text style={styles.header}>Crea un post</Text>
                <Text style={{marginLeft: 20, marginTop: 20}}>Da {terminus[0]} a {terminus[1]}</Text>

                <Picker
                    selectedValue={this.state.selectedDelay}
                    style={{ height: 50, width: 250 , alignSelf: "center", marginTop: 40}}
                    onValueChange={(itemValue, itemIndex) => {
                        this.state.selectedDelay = itemValue;
                        this.setState(this.state);
                        console.log("item = "+itemValue);
                    }
                    }
                >
                    <Picker.Item label="Seleziona un delay" value="-1" />
                    <Picker.Item label="In orario" value="0" />
                    <Picker.Item label="Ritardo di pochi minuti" value="1" />
                    <Picker.Item label="Ritardo oltre i 15min" value="2" />
                    <Picker.Item label="Treni soppressi" value="3" />
                </Picker>

                <Picker
                    selectedValue={this.state.selectedStatus}
                    style={{ height: 50, width: 250, alignSelf: "center", marginTop: 20 }}
                    onValueChange={(itemValue, itemIndex) => {
                        this.state.selectedStatus = itemValue;
                        this.setState(this.state);
                    }}
                >
                    <Picker.Item label="Seleziona uno stato" value="-1" />
                    <Picker.Item label="Situazione ideale" value="0" />
                    <Picker.Item label="Accettabile" value="1" />
                    <Picker.Item label="Gravi problemi" value="2" />
                    
                </Picker>

                <TextInput 
                style={styles.comment}
                editable
                maxLength={100}
                multiline
                numberOfLines={4}
                placeholder="Scrivi un commento..."
                onChangeText={(text) => {
                    this.calcTextLength(text);
                }}
                    />
                    <Text style={{
                        marginLeft: 70,
                        marginTop: 20
                    }}>{this.state.textLength + "/100"}</Text>

                    <TouchableOpacity style={{width: 100, alignSelf: "center", marginTop: 50}}
                    onPress={() => {
                        CommunicationController.addPost(AppModel.instance.getSid(), AppModel.instance.getDirection(), 
                        this.state.selectedDelay, this.state.selectedStatus, this.state.text)
                        .then((check) => {

                            if (check != false) {
                                CommunicationController.getPosts(AppModel.instance.getSid(), AppModel.instance.getDirection())
                                .then(data => {
                                    AppModel.instance.setPosts(data.posts);

                                    ToastAndroid.show('Post inviato!', ToastAndroid.SHORT);
                                    this.props.navigation.navigate("Feed della tratta");
                                })
                            } 
                        })
                        .catch(error => {
                            console.log(error+ " error on send post");
                        })
                    }}
                    >
                        <Text style={styles.buttonSend}> Invia </Text>
                    </TouchableOpacity>
                    
            </View>
        )
    }

    calcTextLength = (text) => {
        this.state.textLength = text.length;
        this.state.text = text;
        this.setState(this.state);
    }
}

const styles = StyleSheet.create({
    comment: {
        width: 250,
        height: 70,
        borderBottomWidth: 1,
        borderColor: "black",
        alignSelf: "center",
        marginTop: 50
    },
    buttonSend: {
        padding: 20,
        width: 100,
        backgroundColor: "#911a1a",
        borderRadius: 50,
        textAlign: "center",
        fontSize: 16,
        color: "white"
    },
    header: {
        fontSize: 30,
        marginLeft: 20,
        marginTop: 50
    }
});

export default addPost;