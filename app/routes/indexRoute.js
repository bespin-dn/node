const mysql = require('mysql');
const express = require('express');
const http = require('http');

var router = express.Router();

const conn = mysql.createConnection({
    host:process.env.RDS_HOST,
    user:process.env.RDS_USERNAME,
    password:process.env.RDS_PWD,
    port:process.env.RDS_PORT,
    database:process.env.RDS_DBNAME
});

router.get('/',(req, res, next) => {
    console.log("Host: "+ req.headers.host);
    console.log("User-Agent: "+ req.headers['user-agent']);
    console.log("IP: "+ req.socket.remoteAddress);

    // ALB에서 Client-IP 확인을 위한 X-Forwarded-For 확인.
    console.log("X-Forwarded-For: "+ req.headers['X-Forwarded-For']);
    console.log("X-Forwarded-For: "+ req.ip);

    // CloudFront에서 Header 추가하여 정상 동작하는지 확인.
    console.log("CloudFront-Viewer-Country: " + req.headers['cloudfront-viewer-country']);
    console.log("CloudFront-Viewer-Country-Region: " + req.headers['cloudfront-viewer-country-region']);
    console.log("CloudFront-Viewer-Country-Name:" + req.headers['cloudfront-viewer-country-name']);

    var country = req.headers['cloudfront-viewer-country'];
    if(country=='KR'){
        return res.render('index-ko');
    }
    else if (country=='US'){
        return res.render('index-us');
    }
    else{
        return res.render('index');
    }
});
router.post('/insertValue', (req, res, next) => {
    conn.query(`insert into ${process.env.RDS_DBNAME} values ${req.body.content}`);
});

module.exports = router;