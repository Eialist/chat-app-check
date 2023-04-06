import { fetchCollection } from "../mongodb/chatMongoClient.js";

export function saveUser(user) {
    const data = {
        username: user.username,
        password: user.password,
    };
    return fetchCollection("user").insertOne(data);
}

export function fetchUser(username) {
    return fetchCollection("user").findOne({ username: username });
}