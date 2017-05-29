var express = require('express');
var router = express.Router();
var OAuth = require('wechat-oauth');
var client = new OAuth('wxf53ebc8656c7b6c2', 'ef3649c7af8eb1edcd3c6a2f56fd52b6');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = client.getAuthorizeURL('http://wxgzhpaytest.maxtropy.com/wechat/openid', 'AUTH', 'snsapi_userinfo');
  request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
          console.log(body) // Print the google web page.
       }
  })
  res.render('/index.html');
});

router.get('/openid', function(req, res, next) {
  var code = req.param('code');
  console.log(code)
  client.getAccessToken(code, function (err, result) {
    var accessToken = result.data.access_token;
    var openid = result.data.openid;
    client.getUser(openid, function (err, result) {
      $('#openid').val(result);
      res.send(result);
    });
  });
});

module.exports = router;
