// https://docs.aws.amazon.com/ko_kr/kms/latest/developerguide/programming-encryption.html

var express = require('express');
var router = express.Router();

const AWS = require('aws-sdk');
const kmsClient = new AWS.KMS({
    region: 'ap-northeast-2'
});

router.get('/', (req, res, next) => {
    res.render('encrypt');
});
router.get('/encryptResult', (req, res, next) => {
    res.render('result');
})
router.post('/', (req, res, next) => {
    const Plaintext = req.body.plainText;
    console.log("Start Encrypt");
    let CiphertextBlob;

    // Key Info
    const KeyId = 'arn:aws:kms:ap-northeast-2:603229842386:key/6334d323-12c1-42e7-aa20-3e8d1ed765c2';

    // Encrypt
    kmsClient.encrypt({KeyId, Plaintext}, (err, data) => {
        if (err) console.log(err, err.stack);
        else {
            CiphertextBlob = Buffer.from(data.CiphertextBlob).toString('base64');
            console.log("Encrypt: "+ CiphertextBlob);
        }
        console.log("End");
        res.render("encryptResult", {
            plainText: Plaintext,
            result: CiphertextBlob
        });
    })
})

module.exports = router;