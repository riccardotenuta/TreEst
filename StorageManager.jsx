import * as SQLite from 'expo-sqlite';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import AppModel from './AppModel';

export default class StorageManager {

    static instance = new StorageManager();

    async checkFirstRun() {

        let runUI;

        const firstRun = await AsyncStorageLib.getItem("direction");
        console.log("storage --> "+firstRun);
        if (firstRun != null) runUI = "Tabs";
        else runUI = "Welcome";

        return runUI;
    }

    async setupCompleted() {
        await AsyncStorageLib.setItem("direction", AppModel.instance.getDirection().toString());
        await AsyncStorageLib.setItem("sid", AppModel.instance.getSid());
        await AsyncStorageLib.setItem("uid", AppModel.instance.getUid());
        console.log("ASYNC SID "+AppModel.instance.getSid());
    }

    async clearStorage() {
        await AsyncStorageLib.clear();
    }

    async loadDataStorage() {
        let sid = await AsyncStorageLib.getItem("sid");
        let direction = await AsyncStorageLib.getItem("direction");
        let uid = await AsyncStorageLib.getItem("uid");

        if (sid != null) AppModel.instance.setSid(sid);
        console.log("SIDDDDD --> "+sid);
        if (direction != null) AppModel.instance.setDirection(direction);
        console.log("DIRECTION --> "+direction);
        if (uid != null) AppModel.instance.setUid(uid);
        console.log("UID --> "+AppModel.instance.getUid());
    }

    async setDirectionStorage() {
        await AsyncStorageLib.setItem("direction", AppModel.instance.getDirection().toString());
    }

    constructor() {
        this.db = SQLite.openDatabase("myDB");
        //this.db.transactionPromise = transactionPromise;
        this.initDB();
    }
    
    async getGreetingById(id) {
        return await this.db.transactionPromise(transactionCode);
    }

    async initDB() {
        const query = "CREATE TABLE IF NOT EXISTS profile ("+
            "userid varchar(20) PRIMARY_KEY NOT NULL,"+
            "pversion varchar(10) NOT NULL,"+
            "picture longtext NOT NULL)";

        this.db.transaction(tx => {
            tx.executeSql(query, [], 
                () => {console.log("Query complete --> CREATE TABLE");},
                () => {console.log("error on create table");});
            
        })
    }

    async getUser(id) {
        const query = "SELECT * FROM profile WHERE userid = ?";

        this.db.transaction(tx => {
            tx.executeSql(query, [id], 
                (tx, queryResult) => {
                    console.log("Query complete --> GET USER");
                    if (queryResult.rows.length > 0) {
                       return true; 
                    }
                },
                () => {console.log("error get user");});
            
        })
    }

    async insertUser(id, pversion, picture) {
        const query = "INSERT INTO profile (userid, pversion, picture)"+
        "VALUES (?, ?, ?)";

        this.db.transaction(tx => {
            tx.executeSql(query, [id, pversion, picture], 
                () => {
                    //console.log("Query complete --> INSERT USER");
                },
                () => {console.log("error insert user");});
            
        })        
    }

    async checkUserPicture(id, pversion) {
        const query = "SELECT * FROM profile WHERE userid = ? AND pversion = ?";

        this.db.transaction(tx => {
            tx.executeSql(query, [id, pversion], 
                (tx, queryResult) => {
                    console.log("Query complete --> CHECK USER PICTURE");
                    if (queryResult.rows.length > 0) {
                       return true; 
                    }
                },
                () => {console.log("error check user picture");});
            
        })
    }

    async updateUserPicture(id, picture) {
        const query = "UPDATE profile"+
        "SET picture = ? WHERE userid = ?";

        this.db.transaction(tx => {
            tx.executeSql(query, [picture, id], 
                () => {console.log("Query complete --> UPDATE USER");},
                () => {console.log("error update user");});
            
        })
    }

    async getPicture(id) {
        const query = "SELECT picture FROM profile WHERE userid = ?";

        this.db.transaction(tx => {
            tx.executeSql(query, [id], 
                (tx, queryResult) => {
                    console.log("Query complete --> GET PICTURE");
                    if (queryResult.rows.length > 0) {
                       return queryResult.rows._array[0].value; 
                    }
                },
                () => {console.log("error get picture");});
            
        })
    }

}