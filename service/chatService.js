import { fetchCollection } from "../mongodb/chatMongoClient.js";

export function saveBroadcast(broadcast) {
    const data = {
        title: broadcast.title,
        content: broadcast.content
    };

    return fetchCollection("broadcast").insertOne(data);
} 

export function fetchAllBroadcasts() {
    return fetchCollection("broadcast").find().toArray();
}

export function saveChannel(channel) {
    const data = {
        id: channel.id,
        subject: channel.subject,
        messages: [],
    };
    
    return fetchCollection("channel").insertOne(data);
}

export function fetchAllChannels() {
    const projection = { subject: 1, _id: 0};
    return fetchCollection("channel").find().project(projection).toArray();
}

export function deleteChannel(channelId) {
    return fetchCollection("channel").deleteOne({ id: channelId });
}

export function createMessage(channelId, message) {
    const data = {
      sender: message.sender,
      content: message.content,
      date: new Date(),
    };
    console.log(data);
  
    return fetchCollection("channel").updateOne(
      { id: channelId },
      { $push: { messages:  {content: data} }}
    );
  }

export function getChannelMessages(channelId) {
    return fetchCollection("channel")
    .aggregate([
        {
           $match: { id: channelId }, 
        }, 
        {
            $project: {
                _id: 0, 
                messages: 1,
            },
        },
    ])
    .toArray()
    .then((result) => {
        return result[0].messages;
    });
}

