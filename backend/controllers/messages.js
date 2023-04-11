const express = require('express');
const router = express.Router();
const userAuth = require("../middelware/userAuth");


const User = require('../models/userSchema');
const Message = require('../models/message');
const Chat = require('../models/chatSchema');

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-ygPi2KCFTgQRKCdzE2mW1eGE",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


//    async  function f(){const response = await openai.listEngines();
// console.log(response)}
// f()

module.exports = router.post('/getAllMsgs', userAuth, async (req, res) => {
    const selectedId = req.body.selectedId;
    const getChat = await Chat.findOne({ users: { $all: [selectedId, req.userID] } });
    const getMessages = await Message.find({ ChatId: getChat._id });

    try {

        res.status(201).send({ getAllMessages: getMessages, chatExist: getChat });

    } catch (error) {
        res.status(500).send(error.message);
        console.log(error)
    }
});



module.exports = router.post('/getAllGroupMsgs', userAuth, async (req, res) => {
    const selectedId = req.body.selectedId;
    const getChat = await Chat.findOne({ _id: selectedId });
    const getMessages = await Message.find({ ChatId: getChat._id });

    try {

        res.status(201).send({ getAllMessages: getMessages, chatExist: getChat });

    } catch (error) {
        res.status(500).send(error.message);
        console.log(error)
    }
});



module.exports = router.post('/sendingGroupMsg', userAuth, async (req, res) => {
    let { selectedId, txtInput } = req.body;
    const original = txtInput + "\n"
    console.log(selectedId)
    const arr = txtInput.split('chatgpt@')
    let message1=0
    if (arr.length >= 2) {
        txtInput = arr[1]
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: txtInput }],
        });
        console.log(completion.data.choices[0].message);
        txtInput = completion.data.choices[0].message.content
         message1 = original.concat("\n\n", txtInput)
    }
    else
    {
        message1=txtInput
    }

    // console.log('message here ',message1)
    const getChat = await Chat.findOne({ _id: selectedId });
    try {
        const newMessage = new Message({
            sender: req.userID,
            ChatId: getChat._id,
            message: message1,
        });

        await newMessage.save();

        res.status(201).send({ newMessage, getChat });
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error)
    }
});


module.exports = router.post('/sendingMsg', userAuth, async (req, res) => {
    const { selectedId, txtInput } = req.body;

    const getChat = await Chat.findOne({ users: { $all: [selectedId, req.userID] } });
    try {
        const newMessage = new Message({
            sender: req.userID,
            ChatId: getChat._id,
            message: txtInput,
        });

        await newMessage.save();

        res.status(201).send({ newMessage, getChat });
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error)
    }
});


module.exports = router.get('/allGroupChats', userAuth, async (req, res) => {
    // const findChats = await Chat.find({ users : req.userID , isGroupChat: true});
    const findChats = await Chat.find({ users: { $all: [req.userID] }, isGroupChat: true });
    try {

        res.status(201).send(findChats);
    } catch (error) {
        res.status(500).send(error.message);
        console.log(error)
    }
});

