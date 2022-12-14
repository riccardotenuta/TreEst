import React from "react";
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableHighlight, ScrollView, Alert } from "react-native";
import AppModel from "./AppModel";
import CommunicationController from "./CommunicationController";
import Line from "./Line";
import StorageManager from "./StorageManager";

export default class SetupSelectionLine extends React.Component {

    state = {
        loading: false,
        selectedDirection: null,
    }

    componentDidMount() {
        CommunicationController.register()
        .then(data => {
            if (data != false) {
                AppModel.instance.setSid(data.sid);
                console.log("DOPO SET SID --> "+AppModel.instance.getSid());
            }
        })
        .then(() => this.setLinesState())
        .catch(error => console.error(error));
    }

    setLinesState = () => {
        CommunicationController.getLines(AppModel.instance.getSid())
        .then(data => {
            if (data != false) AppModel.instance.setLines(data.lines);
        })
        .then(() => {
            this.state.loading = true;
            this.setState(this.state);
        })
        
    }

    renderLine = ({ item }) => {
        return (
          <Line item={item} setDirection={this.setDirection} getSelections={this.getSelections}/>
        );
    }

    setDirection = (direction) => {
        this.state.selectedDirection = direction;
        AppModel.instance.setDirection(direction);

        this.setState(this.state);

        console.log("direction ----> "+this.state.selectedDirection);
    }

    getSelections = () => {
        return this.state.selectedDirection;
    }

    checkSelection = () => {
        if (this.state.selectedDirection != null) {
            AppModel.instance.setDirection(this.state.selectedDirection);

            CommunicationController.getProfile(AppModel.instance.getSid())
            .then((data) => {
                if (data != false) {
                    AppModel.instance.setUid(data.uid);
                    console.log("questo è il sid "+AppModel.instance.getSid());
                    StorageManager.instance.setupCompleted();

                    console.log(StorageManager.instance.checkFirstRun());

                    this.props.navigation.navigate("Tabs");
                }
            })
        } else {
            Alert.alert("Scegli una direzione!")
        }
    }
    
    render() { 
        if (!this.state.loading) {
            return (
                <View>
                    <ActivityIndicator size="large" color="#911a1a"
                    style={{alignContent: "center", marginTop: 300}}
                    ></ActivityIndicator>
                </View>
            )
        } else {
            return (
                
                    <View>
                        <FlatList 
                            style={{height: 550}} 
                            data={AppModel.instance.getLines()}
                            renderItem={this.renderLine}
                            keyExtractor={item => item.terminus1.did}
                        />
                        <TouchableHighlight 
                            onPress={() => this.checkSelection()}
                            underlayColor="#F2F2F2" 
                            activeOpacity={0.7}
                            >
                            <View style={styles.welcomeButton}>

                                <Text style={styles.welcome}>
                                    Avanti
                                </Text>

                            </View>
                        </TouchableHighlight>
                       {/* <FAB
                        title="Avanti"
                        color="#911a1a"
                        size="large"
                        placement="right"
                        
                        /> */}
                    </View>
                
            )
        }
    }

}

const styles = StyleSheet.create({
    welcome: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        color: "#FFFF",
    },
    welcomeButton: {
        width: 200,
        marginLeft: 180,
        marginTop: 20,
        elevation: 8,
        textAlign: "center",
        backgroundColor: '#911a1a',
        borderRadius: 50,
        padding: 20,
        position: "relative",
       
    },
    prova: {
        color: '#911a1a'
    }
});