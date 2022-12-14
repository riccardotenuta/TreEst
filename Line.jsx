import React from "react";
import { View, FlatList, Text, ActivityIndicator, StyleSheet, TouchableHighlight } from "react-native";

export default class Line extends React.Component {


    state = {
        pressStatus_1: false,
        pressStatus_2: false
    }
  
    render() {
        console.log(this.props);
        var lineName = this.props.item.terminus1.sname + " - " + this.props.item.terminus2.sname;

        this.changeSelectedCard();

        //console.log(this.state.pressStatus_1+" "+this.state.pressStatus_2);
        
        return (
            <View style={styles.container}>
              <View>
                <Text style={styles.lineName}>{lineName}</Text>
              </View>
              <TouchableHighlight 
              onPress={() => {
                    this.props.setDirection(this.props.item.terminus1.did);
              }}
              underlayColor="#F2F2F2" 
              activeOpacity={1}
              >
                  <View style={this.state.pressStatus_1 ? styles.terminusCardPress : styles.terminusCard 
                      }>
                      <Text style={styles.terminusName}>{this.props.item.terminus1.sname}</Text>
                  </View>
              </TouchableHighlight>
              
              <TouchableHighlight
              onPress={() => {
                this.props.setDirection(this.props.item.terminus2.did);
            }}
            underlayColor="#F2F2F2" 
            activeOpacity={1}
            >
                  <View style={this.state.pressStatus_2 ? styles.terminusCardPress : styles.terminusCard}>
                      <Text style={styles.terminusName}>{this.props.item.terminus2.sname}</Text>
                  </View>
              </TouchableHighlight>
             
            </View>
          )
    }

    

    changeSelectedCard() {
        if (this.props.getSelections() == this.props.item.terminus1.did) {
            this.state.pressStatus_1 = true;
            this.state.pressStatus_2 = false;
        }
        if (this.props.getSelections() == this.props.item.terminus2.did) {
            this.state.pressStatus_1 = false;
            this.state.pressStatus_2 = true;
        }

        if (this.props.getSelections() != this.props.item.terminus1.did && this.props.getSelections() != this.props.item.terminus2.did) {
            this.state.pressStatus_1 = false;
            this.state.pressStatus_2 = false;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 30,
        marginTop: 10
    },
    indicator: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 80
    },
    terminusCard: {
        marginLeft: 50,
        marginRight: 50,
        elevation: 8,
        marginTop: 20,
        backgroundColor: '#FFFF',
        borderRadius: 25,
        padding: 30,
        textAlign: "center",
        alignItems: "center",
        borderColor: "white",
        borderWidth: 2
    },
    terminusCardPress: {
        marginLeft: 50,
        marginRight: 50,
        elevation: 8,
        marginTop: 20,
        backgroundColor: '#FFFF',
        borderRadius: 25,
        padding: 30,
        textAlign: "center",
        alignItems: "center",
        borderColor: "#911a1a",
        borderWidth: 5
    },
    terminusName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        color: "black"
    },
    lineName: {
        fontWeight: "bold",
        textAlign: "left",
        marginLeft: 20,
        fontSize: 15,
        color: "black"
    }
  });