import React from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image, TextInput,
    Key, KeyboardAvoidingView, Button, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity, ToastAndroid } from "react-native";
import AppModel from "./AppModel";
import * as ImagePicker from 'expo-image-picker';
import CommunicationController from "./CommunicationController";
import { useIsFocused } from '@react-navigation/native';

class Profile extends React.Component {

    state = {
        picture: "",
        name: "",
        loading: false,
        textLength: 0,
        flagChanges: false
    }
    hideNavbar = () => {
        Keyboard.dismiss;
    }

    handleChangeImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (result.base64 != undefined) {
            if (this.verifyImage(result.base64)) {
                this.state.picture = result.base64;
                this.state.flagChanges = true;
                this.setState(this.state);
            } else {
                ToastAndroid.show('Immagine troppo grande!', ToastAndroid.SHORT); 
            }
        }
    }

    verifyImage = (base64) => {
        if (base64.length < 137000) return true;
        else return false;
    }

    saveChanges = () => {
        CommunicationController.setProfile(AppModel.instance.getSid(), this.state.name, this.state.picture)
        .then((response) => {
            if (response != false) {
                this.state.flagChanges = false;
                console.log("SET PROFILE --> "+response);
                ToastAndroid.show('Modifiche salvate!', ToastAndroid.SHORT); 
                CommunicationController.getPosts(AppModel.instance.getSid(), AppModel.instance.getDirection())
                .then(data => {
                    AppModel.instance.setPosts(data.posts);
                    this.props.navigation.navigate("Feed della tratta");
                })
                this.setState(this.state);
            }               
        })
    }

    checkFocus() {
        const isFocused = this.props.isFocused;

        console.log("FOCUS = "+isFocused);
    }

    render() {
        this.checkFocus();
        if (this.state.picture == "") {
            CommunicationController.getProfile(AppModel.instance.getSid())
            .then((data) => {
                console.log("log dati profilo --> "+data);
                if (data != false) {
                    if (data.picture != null) this.state.picture = data.picture;
                    else {
                        this.state.picture = "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";
                    }
                    this.state.name = data.name;
                    this.state.textLength = data.name.length;
                    this.state.loading = true;

                    this.setState(this.state);
                }
            })
        }

        if (!this.state.loading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#911a1a"
                        style={{alignContent: "center", marginTop: 150}}
                    ></ActivityIndicator>
                </View>
            )
        } else {
            console.log("name --> "+this.state.name);
            console.log("picture --> "+this.state.picture);
            return (
                
                <ScrollView>
                    <View style={styles.container}>
                        <Image 
                            source={{uri: "data:image/png;base64,"+this.state.picture}}
                            style={styles.image}
                            />
                        <TouchableOpacity
                            onPress={() => {
                                this.handleChangeImage();
                            }}
                        >
                            <Text style={styles.changeImage}>Cambia immagine</Text>
                        </TouchableOpacity>
                        
                        <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        
                        >
                        <TouchableWithoutFeedback onPress={this.hideNavbar()}>
                            <View style={styles.inner}>
                                <TextInput 
                                value={this.state.name} 
                                style={styles.textInput} 
                                maxLength={20}
                                onChangeText={(text) => {
                                    this.calcTextLength(text);
                                }}
                                />
                                <Text style={{textAlign: "right"}}>{this.state.textLength + "/20"}</Text>                                
                                <TouchableOpacity 
                                style={{
                                    width: 200,
                                    alignSelf: "center",
                                }}

                                disabled={!this.state.flagChanges}
                                    onPress={() => {
                                        this.saveChanges();
                                    }}
                                    >
                                    <Text style={this.state.flagChanges ? styles.buttonSend : styles.buttonSendOpacity}> Salva modifiche </Text>
                                </TouchableOpacity>
                                
                            </View>
                        </TouchableWithoutFeedback>
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            )
        }
    }

    calcTextLength = (text) => {
        this.state.textLength = text.length;
        this.state.name = text;
        this.state.flagChanges = true;
        this.setState(this.state);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: 300,
        height: 300,
        borderRadius: 300,
        justifyContent: "center",
        alignSelf: "center",
        marginTop: 20
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "space-around"
      },
      header: {
        fontSize: 36,
      },
      textInput: {
        height: 50,
        borderColor: "#000000",
        borderBottomWidth: 1,
        
      },
      buttonSend: {
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
    buttonSendOpacity: {
        padding: 20,
        width: 200,
        backgroundColor: "#911a1a",
        borderRadius: 50,
        textAlign: "center",
        fontSize: 16,
        color: "white",
        marginTop: 30,
        opacity: 0.5,
        alignSelf: "center"
    },
    changeImage: {
        padding: 10,
        color: "#911a1a",
        alignSelf: "center",
    }

});

export default function(props) {
    const isFocused = useIsFocused();
  
    return <Profile {...props} isFocused={isFocused} />;
}