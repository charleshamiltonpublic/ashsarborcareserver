var express = require('express');
var router = express.Router();
const BlogPost = require('../models/blogPost');
require("dotenv").config();
const nodemailer = require('nodemailer');
const {google} = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const FROM_EMAIL = process.env.FROM_EMAIL;
const TO_EMAIL = process.env.TO_EMAIL;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: FROM_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
        const mailOptions = {
            from: FROM_EMAIL,
            to: TO_EMAIL,
            subject: 'hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>'
        };
        const result = transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}


router.get('/', (req, res) => {
    sendMail()
        .then((result) => console.log('Email sent...', result))
        .catch((error) => console.log(error.message));
    BlogPost.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);

        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/save', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newBlogPost = new BlogPost(data);
    newBlogPost.save((error) => {
        if(error) {
            res.status(500).json({msg: 'Sorry, internal server error'});
            return;
        }
            //BlogPost
            return res.json({
            msg: 'Your data has been saved!!!'
            });  
        
    })
});


router.get('/name', (req, res) => {
    const data = {
        username: 'peterson',
        age: 5
    };
    res.json(data);
});

module.exports = router;