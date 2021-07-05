const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment} = require('../models');
const withAuth = require('../utils/auth.js')


//homepage, display all posts
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


//dashboard, create post if logged in
router.get('/dashboard', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
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
            res.render('dashboard', {
                posts, 
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    //query database to get all posts before res.render
});


//place code here to edit posts

//login 
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    
    res.render('login')
})

//single post page
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id : req.params.id
        },
        attributes: [
            'id', 
            'title',
            'contents',
            'created_at'        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
         if (!dbPostData) {
             res.status(400).json({ message: 'No post found with this id'});
             return;
         }
 
         //serialize the data
         const post = dbPostData.get({ plain: true });
 
         //pass data to template
         res.render('single-post', { 
           post,
           loggedIn: req.session.loggedIn
         });
     })
     .catch(err => {
         console.log(err);
         res.status(500).json(err);
     });
 });


 router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id', 
            'title', 
            'contents', 
            'created_at', 
        ],
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
            if (!dbPostData){
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            const post = dbPostData.get({ plain: true });

            res.render('edit-post', {
                post, 
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


module.exports = router;