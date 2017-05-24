var express = require('express');
var FB = require('fb');
var app = express();

app.use(express.static('public'))


app.get('/page/:pageName', function(req, res){
	console.log()
	getFacebookPageInfo(req.params.pageName).then(function(data){
		res.send({
			details: data
		})	
	}).catch(function(err){
		res.status(500).send({error: err})
	})
	
})

app.get('/', function (req, res) {

  res.sendFile(__dirname + '/public/index.html');

})

app.listen(3333, function () {
  console.log('listening on 3333!')
})

var getFacebookPageInfo = function(pageName) {
	console.log("Page nem ", pageName);
	return new Promise(function(resolve, reject) {

	//FB.setAccessToken('YOUR_ACCESS_TOKEN');
var access_token	

FB.api('oauth/access_token', {
    client_id: 'APP_ID',
    client_secret: 'APP_SECRET',
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
 
    access_token = res.access_token;


if(typeof access_token != "undefined") {
	FB.setAccessToken(access_token);
}

 FB.api( pageName+'/posts?fields=shares,comments,likes,message', function (res) {
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   reject(res.error);
  }
  else {
  	
  	resolve( res);
  }
});

});

})

} 
 /*function (pageName) {
 
 
}*/