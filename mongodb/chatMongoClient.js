import { MongoClient } from "mongodb";

let db = undefined; 
const appDbName = "chat-project";
const username = "eia-chat";
const password = "eia-chat-password";



export function fetchCollection(name) {
    return fetchDatabase().collection(name);
}

function fetchDatabase() {
    if (db != undefined) {
        return db;
    }

    const url = `mongodb://${username}:${password}@ac-spmxpzp-shard-00-00.xufoymd.mongodb.net:27017,ac-spmxpzp-shard-00-01.xufoymd.mongodb.net:27017,ac-spmxpzp-shard-00-02.xufoymd.mongodb.net:27017/?ssl=true&replicaSet=atlas-xa0j5e-shard-0&authSource=admin&retryWrites=true&w=majority`;
    const client = new MongoClient(url);

    db = client.db(appDbName);

    return db;
};