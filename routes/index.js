var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Never Have I Ever...' });
});

router.post('/upload_voice', (req, res, next) => {
    fs.writeFileSync(`${new Date()}.mp3`, req.files.data.data);
    res.sendStatus(200);
});

module.exports = router;
