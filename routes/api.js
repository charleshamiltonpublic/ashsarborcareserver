var express = require('express');
var router = express.Router();
const BlogPost = require('../models/blogPost');

router.get('/', (req, res) => {
    // const data = {
    //     username: 'accimeesterlin',
    //     age: 5
    // };

    BlogPost.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);

        })
        .catch((error) => {
            console.log('error: ', error);
        });
    // res.json(data);
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