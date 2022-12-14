import React from "react";
import { View, Text, ImageBackground, TouchableHighlight, 
    StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import AppModel from "./AppModel";
import { useIsFocused } from "@react-navigation/core";
import { Icon } from "react-native-elements/dist/icons/Icon";
import StorageManager from "./StorageManager";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from 'react-native-reanimated';
import CommunicationController from "./CommunicationController";
import Post from "./Post";

class Home extends React.Component {

    state = {
        direction: null,
        loading: false,
        check: true,
        posts: [],
        refreshing: false,
        setRefreshing: false,
        bs: React.createRef()
    }

    componentDidMount() {
        StorageManager.instance.loadDataStorage()
        .then(() => {
            console.log("SID = "+AppModel.instance.getSid());
            CommunicationController.getLines(AppModel.instance.getSid())
            .then(data => {
                if (data != false) {
                    AppModel.instance.setLines(data.lines);
                    CommunicationController.getPosts(AppModel.instance.getSid(), AppModel.instance.getDirection())
                    .then(data => {
                        if (data != false) {
                            console.log("set dei post");
                        
                            AppModel.instance.setPosts(data.posts);

                            CommunicationController.getSponsors(AppModel.instance.getSid())
                            .then((data) => {
                                if (data != false) {
                                    console.log("esamefebbraio numero sponsors: "+data.sponsors.length);

                                    data.sponsors.forEach(element => {
                                        console.log("esamefebbraio nome: "+element.name+", lat: "+element.lat+", lon: "+element.lon);
                                    });

                                    AppModel.instance.setSponsors(data.sponsors);

                                    this.state.loading = true;
                                    this.setState(this.state);
                                }
                            })
                            
                        }
                    })
                }
               
            })
            .catch((error)=>{
                console.log("Api call error");
                alert(error.message);
            });
        }) 
    }

    handleRefresh = () => {
        this.state.setRefreshing = true;

        CommunicationController.getPosts(AppModel.instance.getSid(), AppModel.instance.getDirection())
        .then(data => {
            if (data != false) {
                console.log("set dei post");                    
                AppModel.instance.setPosts(data.posts);
                
                this.state.setRefreshing = false;
                this.setState(this.state);
            }
        })
    }

    refreshHome = () => {
        this.state.loading = true;
        this.setState(this.state);
    }

    render() {

        let fall = new Animated.Value(1);
  
        const { isFocused } = this.props;

        if (isFocused) {
            this.state.direction = AppModel.instance.getDirection();    
        }
    
        //let to = terminus[0];
        //console.log(terminus[0]);

        if (!this.state.loading) {
            return (
                <ImageBackground
                    source={require("../TreEst/img/layered-waves-haikei_DEF.png")}
                    style={{width: "100%", height: "100%"}}
                >
    
                    <TouchableHighlight 
                        onPress={() => {
    
                            // TODO
                            console.log("Open map");
                        }}
                        underlayColor="transparent" 
                        activeOpacity={1}
                        >
                            <View style={styles.terminusCard }>
                                <View>
                                    <ActivityIndicator size="large" color="#911a1a"
                                    style={{alignContent: "center", marginTop: 30}}
                                    ></ActivityIndicator>
                                </View>
                            </View>
                    </TouchableHighlight>

                    <View style={styles.containerPosts}>
                        <ActivityIndicator size="large" color="#911a1a"
                                    style={{alignContent: "center", marginTop: 150}}
                                    ></ActivityIndicator>
                    </View>
    
                </ImageBackground>
            )
        } else {
            
            let terminus = AppModel.instance.getTerminusFromDirection();
            let to = terminus[0];
            console.log(("dir --> "+this.state.direction));
            return (
                <ImageBackground
                    source={require("../TreEst/img/layered-waves-haikei_DEF.png")}
                    style={{width: "100%", height: "100%"}}
                >
    
                    <TouchableHighlight 
                        onPress={() => {
                            
                            this.props.navigation.navigate("Map");
                            // TODO
                            console.log("Open map");
                        }}
                        underlayColor="transparent" 
                        activeOpacity={1}
                        >
                            <View style={styles.terminusCard }>
                                <View>
                                    <View style={styles.textTerminus}>
                                        <Text style={styles.from}>da</Text>
                                        <Text style={styles.terminusName}>{terminus[0]}</Text>
                                    </View>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.from}>a</Text>
                                        <Text style={styles.terminusName}>{terminus[1]}</Text>
                                    </View>
                                </View>
                                
    
                                <TouchableHighlight
                                    onPress={() => {
                                        console.log("switch the feed");

                                        let newDirection = AppModel.instance.getDirectionFromTerminus(to);
                                        AppModel.instance.setDirection(newDirection);

                                        CommunicationController.getPosts(AppModel.instance.getSid(), AppModel.instance.getDirection())
                                        .then(data => {
                                            if (data != false) {
                                                AppModel.instance.setPosts(data.posts);

                                                StorageManager.instance.setDirectionStorage();
                                                this.setState(this.state);
                                            } 
                                        })
                                        .catch((error)=>{
                                            console.log("Api call error");
                                            alert(error.message);
                                         });
                                    
                                    }}
                                    underlayColor="transparent" 
                                    activeOpacity={0.7}
                                    >
                                    <View style={styles.switchFeed}>
                                        <Icon name="rotate-3d-variant" size={50} 
                                            color="#75230c" type="material-community">   
                                        </Icon>
                                    </View>
                                </TouchableHighlight>
                            </View>
                    </TouchableHighlight>

                    <View style={styles.containerPosts}>
                        
                    <FlatList 
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.handleRefresh}
                                ></RefreshControl>
                            }
                            style={{height: 600, marginTop: 20}} 
                            data={AppModel.instance.getPosts()}
                            renderItem={this.renderPost}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                        <View style={{position: "absolute", top: 520}}>
                    
                        <TouchableHighlight 
                                onPress={() => {
                                    this.props.navigation.navigate("addPost");
                                }}
                                underlayColor="transparent" 
                                activeOpacity={0.9}
                                
                                >
                                <View style={styles.addpost}>
                                        <Icon name="add-to-list" size={20} type="entypo"
                                    color={"white"}
                                    ></Icon>
                                </View>
                        </TouchableHighlight>


                        </View>
    
                </ImageBackground>
            )
        }

        
    }

    stopLoading = () => {
        this.state.loading = false;
        this.setState(this.state);
    }

    goAddPost = () => {
        console.log("add post");
        this.props.navigation.navigate("addPost");
    }

    renderPost = ({ item }) => {
        return (
          <Post item={item} refreshHome={this.refreshHome} stopLoading={this.stopLoading} />
        );
    }

}


const styles = StyleSheet.create({
    containerPosts: {
        flex: 1,
    },
    textTerminus: {
        flexDirection: "row",
        marginBottom: 20
    },
    terminusCard: {
        marginLeft: 20,
        marginRight: 20,
        elevation: 8,
        marginTop: 20,
        flexDirection: "row",
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 30,
        //alignItems: "center",
    },
    from: {
        textAlign: "left",
        width: 20,
    },
    terminusName: {
        fontWeight: "bold",
        marginLeft: 20,
        fontSize: 20,
        color: "black"
    },
    switchFeed: {
        backgroundColor: "white",
        position: "relative",
        marginTop: 10,
        marginLeft: 25
    },
    addpost: {
        width: 60,
        height: 60,
        elevation: 8,
        textAlign: "center",
        backgroundColor: '#911a1a',
        borderRadius: 50,
        padding: 20,
        marginLeft: 320,
        bottom: 15,
        zIndex: 1,
    },
    welcome: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        color: "#FFFF",
    }
})

export default function(props) {
    const isFocused = useIsFocused();
  
    return <Home {...props} isFocused={isFocused} />;
}