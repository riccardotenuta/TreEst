import React from "react";
import CommunicationController from "./CommunicationController";

class AppModel extends React.Component {

    static instance = new AppModel();

    state = {
        lines: [],
        posts: [],
        counterPost: 0,
        stations: [],
        sponsors: [],
        sid: "",
        direction: null,
        uid: "",
        pinName: "",
        pinAdv: "",
        pinUrl: "",
        pinImage: ""
    }
 
    setSid = (sid) => {
        this.state.sid = sid;

        console.log("sid ----> "+this.state.sid);
    }

    setUid = (uid) => {
        this.state.uid = uid;
    }

    setLines = (lines) => {
        this.state.lines = lines;

        console.log("lines ----> "+this.state.lines[0].terminus2.sname);
    }

    setSponsors = (sponsors) => {
        this.state.sponsors = sponsors;

        console.log("set sponsors");
    }

    setPinName = (pinName) => {
        this.state.pinName = pinName;
    }

    setPinAdv = (pinAdv) => {
        this.state.pinAdv = pinAdv;
    }

    setPinUrl = (pinUrl) => {
        this.state.pinUrl = pinUrl;
    }

    setPinImage = (pinImage) => {
        this.state.pinImage = pinImage;
    }

    getPinName = () => {
        return this.state.pinName;
    }

    getPinAdv = () => {
        return this.state.pinAdv;
    }

    getPinUrl = () => {
        return this.state.pinUrl;
    }

    getPinImage = () => {
        return this.state.pinImage;
    }

    getSponsors = () => {
        return this.state.sponsors;
    }

    incrementCounterPost = () => {
        this.state.counterPost++;
    }

    resetCounterPost = () => {
        this.state.counterPost = 0;
    }

    getCounterPost = () => {
        return this.state.counterPost;
    }

    setPosts = (posts) => {

        this.state.posts = posts;
        this.resetCounterPost();

        this.state.posts.forEach(element => {
            console.log(element);
        });

        console.log("posts ----> "+this.state.posts);
    }

    getSizePosts = () => {
        return this.state.posts.length;
    }

    setStations = (stations) => {
        this.state.stations = stations;

        console.log("stations ----> "+this.state.stations);
    }

    getStations = () => {
        return this.state.stations;
    }

    getPosts = () => {
        return this.state.posts;
    }

    getSid = () => {
        return this.state.sid;
    }

    getUid = () => {
        return this.state.uid;
    }

    getLines = () => {
        return this.state.lines;
    }

    setDirection = (direction) => {
        this.state.direction = direction;
        
        console.log("New direction --> "+this.state.direction);
    }

    getDirection = () => {
        return this.state.direction;
    }

    getTerminusFromDirection = () => {
        let terminus = [];
        console.log(this.state.direction);
        console.log("linnnn "+this.state.lines);

        this.state.lines.forEach(element => {
            if (element.terminus1.did == this.state.direction) {
                terminus.push(element.terminus2.sname);
                terminus.push(element.terminus1.sname);
            }

            if (element.terminus2.did == this.state.direction) {
                terminus.push(element.terminus1.sname);
                terminus.push(element.terminus2.sname);
            }

        });

        console.log(terminus);

        return terminus;
    }

    getDirectionFromTerminus = (terminus) => {
        console.log("new terminus "+terminus);

        let did;

        this.state.lines.forEach(element => {
            if (element.terminus1.sname == terminus) did = element.terminus1.did;
            if (element.terminus2.sname == terminus) did = element.terminus2.did;
        })

        return did;
    }

    render() {}
}

export default AppModel;