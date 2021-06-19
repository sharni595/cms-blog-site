const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
        'id',
        'title',
        'contents', 
        'created_at'
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User, 
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true}));
            res.render('homepage', {
                posts, 
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
    //query database to get all posts before res.render
})

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login')
})

router.get('/post/:id', (req, res) => {
    res.render('single-post')
})


module.exports = router;