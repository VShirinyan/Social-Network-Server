const express = require("express");

const app = express();

const port = process.env.PORT || 8081;

app.use(express.json());

const users = [];
const posts = [];

var userID = 0;
var postID = 0; 

app.post('/users', (req, res) => {
    if(users.find(item => item.username === req.body.username)) {
        res.status(500);
        res.send('There already exists a user with such username!')
    }
    else {
        const user = {
            ...req.body,
            userID: userID++
        };
        console.log(user);

        users.push(user);
        res.send(user);
    }
});

app.post('/login', (req,res) => {
    const userIndex = users.findIndex(item => item.username === req.body.username);
    console.log(userIndex);

    if(userIndex === -1 || (users[userIndex].password !== req.body.password)) {
        res.status(500);
        res.send('The user is not registered!');
    }
    else {
        let randomString = (Math.random() + 1).toString(36);
        console.log(`randomString: ${randomString}`);

        users[userIndex].randomString = randomString;
        res.send('Thanks for logging in!');
    }
});

app.post('/post', (req, res) => {
    const user = users.find(item => item.randomString === req.body.randomString);

    if(!user) {
        res.status(500);
        res.send('The user is not logged in!')
    }
    else {
        const post = {
            userID: user.userID,
            post: req.body.post,
            postID: postID++
        };
        console.log(post);

        res.send(req.body.post);
    }
});

app.listen(port, () => console.log(`Listening on port number ${port}`));