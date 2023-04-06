import express from 'express';
import { saveBroadcast, fetchAllBroadcasts, saveChannel, fetchAllChannels, deleteChannel, createMessage, getChannelMessages } from '../service/chatService.js';
import { saveUser, fetchUser } from '../service/userService.js';

const router = express.Router();


router.post("/register", async (req, res) => {
    console.log(req.body);
  
    const { username, password } = req.body;
    if (!username || typeof username !== "string") {
      return res.status(400).send("Invalid username");
    }
  
    if (!password || typeof password !== "string") {
      return res.status(400).send("Invalid password");
    }
  
    if (password.length < 5) {
      return res.status(400).send("Password too short");
    } try {
      const result = await saveUser({ username, password });
      console.log("User created successfully: ", result);
    } catch (error) {
      throw error;
    }
  
    res.send({ status: "ok" });
  });


router.post("/broadcast", async (req, res) => {
    const broadcast = req.body;
    console.log(broadcast);
    const result = await saveBroadcast(broadcast);
    console.log(result);

    const responseData = {
        content: broadcast,
        event: "Created new broadcast",
    };

    res.send(responseData);
})

router.get("/broadcast", async (req, res) => {
    const allBroadcasts = await fetchAllBroadcasts();
    console.log(allBroadcasts);

    res.send(allBroadcasts);
})

router.put("/channel", async (req, res) => {
    const channel = req.body;
    console.log(channel);
    const result = await saveChannel(channel);
    console.log(result);

    const responseData = {
        content: channel,
        event: "Created new chat channel"
    };

    res.send(responseData);
})

router.get("/channel", async (req, res) => {
    const allChannels = await fetchAllChannels();
    console.log(allChannels);

    res.send(allChannels);
})

router.delete("/channel/:id", async (req, res) => {
    let channelId = req.params.id; 
    await deleteChannel(channelId); 

    const responseData = {
        content: channelId, 
        event: "Deleted channel with Id: " + channelId
    };

    res.send(responseData);
})

router.post("/channel/:id", async (request, response) => {
    const channelId = request.params.id;
    const message = {
      sender: request.body.sender,
      content: request.body.content,
    };
  
    const result = await createMessage(channelId, message);
    console.log(result)

    const responseData = {
      content: message,
      event: "Created a new message for channel: " + channelId,
    };
  
    response.send(responseData);
  });

router.get("/channel/:id", async (req, res) => {
    let channelId = req.params.id;
    let messages = await getChannelMessages(channelId);

    res.send(messages);
})


export default router;