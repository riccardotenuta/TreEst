import { Alert } from "react-native";
//import NetInfo from "@react-native-community/netinfo";

export default class CommunicationController {
    static BASE_URL = "https://ewserver.di.unimi.it/mobicomp/treest/";

    static async request(endpoint, parameters) {
        let url = this.BASE_URL + endpoint + ".php";

        //console.log(url);

        try {
            
                let response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(parameters)
                });
        
                const status = response.status;
                console.log(status);
                if (status == 200) {
                    let resultObj = await response.json();
                    return resultObj;
                } else {
                    Alert.alert(
                        "Errore di connessione",
                        "Ci sono problemi di connessione al momento. Controlla la tua connessione o riprova più tardi.",
                        [
                            { 
                              text: "RIPROVA", 
                              onPress: () => {
                                  console.log("retry api call");
                                  CommunicationController.request(endpoint, parameters);
                              }
                            }
                        ]
                      );
                    return false;
                } 
        } catch (error) {
            Alert.alert(
                "Errore di connessione",
                "Ci sono problemi di connessione al momento. Controlla la tua connessione o riprova più tardi.",
                [
                    { 
                      text: "OK", 
                      onPress: () => {
                          console.log("retry api call");
                          //CommunicationController.request(endpoint, parameters);
                      }
                    }
                ]
              );

              return false;
        }

    }

    static async getLines(sid) {
        const endPoint = "getLines";
        const parameter = {
            sid: sid
        };
        return await CommunicationController.request(endPoint, parameter);
    }

    static async register() {
        const endPoint = "register";
        const parameter = {};
        return await CommunicationController.request(endPoint, parameter);
    }

    static async getPosts(sid, did) {
        const endPoint = "getPosts";
        const parameter = {
            sid: sid,
            did: did
        }
        return await CommunicationController.request(endPoint, parameter);
    }

    static async getStations(sid, did) {
        const endPoint = "getStations";
        const params = {
            sid: sid,
            did: did
        }
        return await CommunicationController.request(endPoint, params);
    }

    static async addPost(sid, did, delay, status, comment) {
        const endPoint = "addPost";

        const params = {
            sid: sid,
            did: did
        }

        if (delay != -1) {
            params.delay = delay;
        }

        if (status != -1) {
            params.status = status;
        }

        if (comment != "") {
            params.comment = comment;
        }

        console.log("delay = " + delay + " status = " + status + " comment = " + comment);

        if (delay != -1 || status != -1 || comment != "") {
            return await CommunicationController.request(endPoint, params);
        } else {
            console.log("CIAO ERRORE");
            Alert.alert("Completa almeno un campo!");
            return false;
        }
    }

    static async getUserPicture(sid, uid) {
        const endPoint = "getUserPicture";

        const params = {
            sid: sid,
            uid: uid
        }

        return await CommunicationController.request(endPoint, params);
    }

    static async getProfile(sid) {
        const endPoint = "getProfile";

        const params = {
            sid: sid
        }

        return await CommunicationController.request(endPoint, params);
    }

    static async setProfile(sid, name, picture) {
        const endPoint = "setProfile";

        const params = {
            sid: sid,
            name: name,
            picture: picture
        }

        return await CommunicationController.request(endPoint, params);
    }

    static async follow(sid, uid) {
        const endPoint = "follow";

        const params = {
            sid: sid,
            uid: uid
        }

        return await CommunicationController.request(endPoint, params);
    }

    static async unfollow(sid, uid) {
        const endPoint = "unfollow";

        const params = {
            sid: sid,
            uid: uid
        }

        return await CommunicationController.request(endPoint, params);
    }

    static async getSponsors(sid) {
        const endPoint = "locspons";

        const params = {
            sid: sid
        }

        return await CommunicationController.request(endPoint, params);
    }

}