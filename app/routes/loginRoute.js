var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('login');
});

router.get('/page1', (req, res, next) => {
    console.log('/login/page1');
    return res.render('healthcheck');
});
module.exports = router;