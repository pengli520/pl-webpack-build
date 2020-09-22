/*
 * @Author: your name
 * @Date: 2020-09-17 11:54:03
 * @LastEditTime: 2020-09-19 13:29:16
 * @LastEditors: Please set LastEditors
 * @Description: supervisor
 * @FilePath: \node-demo\ci.js
 */
const got = require('got');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/travis', function (req, res) {
  let travisSignature = Buffer.from(req.headers.signature, 'base64');
  let payload = req.body.payload;
  let status = false;
  got('https://api.travis-ci.org/config', {
      timeout: 10000
  })
  .then(response => {
    let travisPublicKey =
      JSON.parse(response.body).config.notifications.webhook.public_key;
    let verifier = crypto.createVerify('sha1');
    verifier.update(payload);
    status = verifier.verify(travisPublicKey, travisSignature);
  })
  .catch(error => {
    console.log('Something went wrong:\n' + error)
  })
  .then(() => {
    if (status) {
      payload = JSON.parse(payload);
      console.log(payload, '-------', payload.message, typeof payload);
      const url = 'https://oapi.dingtalk.com/robot/send?access_token=41cf9bbfbe8f4cd474e6c0f895cd4f0a12c08c63a0db1a237d4a18edb10e293b';
      got.post(url, {
        json: {
            msgtype: 'markdown',
            markdown: {
              title: '通知',
              text: `##### 更新内容(${!!payload.status ? '构建失败' : '构建成功'})\n###### ${payload.message}`,
            },
            at:{
              isAtAll:true
            }
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((data) => {
        console.log(data, 'data');
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log('失败', err);
        res.sendStatus(200);
      })
    }
  });
});

app.listen(8001, function () {
  console.log('Example app listening on port 3000!');
});