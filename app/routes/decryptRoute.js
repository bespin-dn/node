const express = require('express');
const router = express.Router();

const AWSSDK = require('aws-sdk');
const kmsClient = new AWSSDK.KMS({
    region: 'ap-northeast-2'
});


router.post('/', (req, res, next) => {
    let CiphertextBlob = Buffer.from(req.body.cipherText, 'base64');
    const KeyId = 'arn:aws:kms:ap-northeast-2:603229842386:key/6334d323-12c1-42e7-aa20-3e8d1ed765c2';
    kmsClient.decrypt({CiphertextBlob, KeyId}, (err, data) => {
        console.log("Decrypt Start");
        if (err) console.log(err, err.stack);
        else{
            console.log("Decrypt: " + data.Plaintext);
        }
        console.log("End");
        // res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
        // res.end(ejs.render(data,{
        //     result: CiphertextBlob.toString()
        // }))
        res.render("decryptResult", {
            result: CiphertextBlob.toString()
        });
    })
})

module.exports = router;