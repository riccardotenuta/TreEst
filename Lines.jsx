import React from "react";
import { View, Text, ActivityIndicator, FlatList, TouchableHighlight, StyleSheet } from "react-native";
import Line from "./Line";
import CommunicationController from "./CommunicationController";
import AppModel from "./AppModel";

class Lines extends React.Component {

    state = {
        loading: false,
        selectedDirection: null,
        posts: []
    }

    componentDidMount() {
        this.setLinesState();
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

    setDirection = (direction) => {
        this.state.selectedDirection = direction;
        AppModel.instance.setDirection(direction);

        this.setState(this.state);

        console.log(AppModel.instance.getDirection());
        CommunicationController.getPosts(AppModel.instance.getSid(), AppModel.instance.getDirection())
        .then(data => {
            if (data != false) {
                AppModel.instance.setPosts(data.posts);
                this.props.navigation.navigate("Feed della tratta");
            }
        })
        

        console.log("direction ----> "+this.state.selectedDirection);
    }

    getSelections = () => {
        return this.state.selectedDirection;
    }

    renderLine = ({ item }) => {
        return (
          <Line item={item} setDirection={this.setDirection} getSelections={this.getSelections}/>
        );
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
                            style={{height: 600}} 
                            data={AppModel.instance.getLines()}
                            renderItem={this.renderLine}
                            keyExtractor={item => item.terminus1.did}
                        />
                        
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

export default Lines;