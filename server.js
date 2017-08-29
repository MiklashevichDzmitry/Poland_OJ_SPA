const express = require('express');
const http = require('http');
const path = require('path');
var fs = require('fs');
const formidable = require('formidable');
const app = express();
const router = express.Router();
const host = 'sendresumehost@gmail.com';
const hostPass = 'sndRmg5l';
const recepient = 'olenka_goroshko@mail.ru';

const gmailSend = require('gmail-send')({
  user: host,
  pass: hostPass,
  to: recepient,
  subject: 'O&J Work Expert',
  text: 'New resume in attachments',
});
const env = process.env.NODE_ENV || 'development';
const httpPort = 80;
const httpsPort = 443;
const devPort = 3000;
let port = httpsPort;
let resumeCounter = 0;

if (env === 'production') {
  port = httpsPort; // or httpsPort
}

app.use(express.static('public'));
app.set('port', port);
http.createServer(app)
  .listen(app.get('port'), () => {
    console.log(`Local server listening to port ${app.get('port')}`);
  });

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

app.post('/send', function (req, res) {
  resumeCounter += 1;
  var form = new formidable.IncomingForm();
  form.uploadDir = path.join(__dirname, '/uploads');
  form.encoding = 'binary';

  form.on('file', function (field, file) {
    fs.rename(
      file.path,
      path.join(
        form.uploadDir,
        resumeCounter.toString() + '_' + file.name
      ), function(err) { if (err) console.log('Can\'t rename file' + err); }
    );
    gmailSend({ files: ['./uploads/' + resumeCounter.toString() + '_' + file.name] },
      function (err) {
        if (err) console.log(err);
      });
  });

  form.on('error', function (err) {
    console.log('An error has occured: \n' + err);
  });

  form.on('end', function () {
    res.end('success');
  });

  form.parse(req);
});

app.use('/', router);
