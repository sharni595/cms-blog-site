
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage')
})

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