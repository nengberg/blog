var express = require('express');
var app = express();

//Configure views
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Configure static resources
app.use("/css", express.static(__dirname + '/app/css'));
app.use("/img", express.static(__dirname + '/app/img'));
app.use("/font", express.static(__dirname + '/app/font'));

var routes = require('./app/routes/routes.js');
routes(app);

app.listen(process.env.PORT || 3000, function() {
	console.log('Server running')
});