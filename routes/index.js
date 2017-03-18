var express = require('express');
var router = express.Router();
var fs = require('fs');
const decode = require('audio-decode');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Never Ever' });
});

router.post('/upload_voice', (req, res, next) => {
    fs.writeFileSync(`${new Date()}.mp3`, req.files.data.data);
    res.sendStatus(200);
});

function decodeBase64(input) {
    return Buffer.from(input, 'base64');
}

module.exports = router;
