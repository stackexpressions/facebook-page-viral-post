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

	FB.setAccessToken('YOUR_ACCESS_TOKEN');
 FB.api( pageName+'/posts', function (res) {
  if(!res || res.error) {
   console.log(!res ? 'error occurred' : res.error);
   return;
  }
  else {
  	
  	resolve( res);
  }
});

})

} 
 /*function (pageName) {
 
 
}*/