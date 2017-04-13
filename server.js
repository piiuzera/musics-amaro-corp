"use strict";

var BodyParser 	= require('body-parser');
var Cors 		= require('cors');
var Express 	= require('express');
var Musics 		= require('./api/musics');
var Path 		= require('path');

var app 		= Express();
var port 		= 5003;

app.set('views', './public');
app.set('view engine', 'ejs');

app.use(BodyParser.json());
app.use(Cors());
app.use(BodyParser.urlencoded({
	extended: true
}));
app.use(Express.static(Path.join(__dirname, 'public_html')));

app.get('/', function(request, response) {
	response.render('index.html');
});

app.post('/musics', function(request, response) {
	if (!request.body || !request.body.filename) {
		Musics.findAll(
			setFiles.bind(this, response)
		);

		return;
	}

	Musics.findByName(
		request.body.filename,
		setFileByName.bind(this, response, request.body.filename)
	);	
});

var setFiles = function(response, files) {
	var filesObject = [];

	if (!files) {
		response.status(404).json({
			res 	: false,
			message	: 'Não foi encontrada nenhuma música'
		});
	}

	for (var i = 0; i < files.length; ++i) {
		var splitFiles = files[i].split('.');
		var name = '';

		for (var j = 0; j < splitFiles.length; ++j) {
			if ((j + 1) !== splitFiles.length) {
				name += splitFiles[j];
			}
		}

		filesObject.push({
			filename 	: files[i],
			name 		: name,
			extension 	: splitFiles[splitFiles.length - 1]
		});
	}

	response.status(200).json({
		res: true,
		musics: filesObject
	});
};

var setFileByName = function(response, filename, file) {
	if (!file) {
		response.status(404).json({
			res 	: false,
			message	: 'Música informada não foi encontrada'
		});

		return;
	}

	response.setHeader('Content-Type', 'application/mp3');
	response.end(new Buffer(file, 'base64'));
};

app.listen(port, function() {
	console.log('Server has started: *.*.*.*:' + port);
});