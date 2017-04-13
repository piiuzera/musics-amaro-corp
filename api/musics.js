"use strict";

var Fs = require('fs');

var getFindAll = function(callback) {
	Fs.readdir(
		'./musics/',
		setFindAll.bind(this, callback)
	);
};

var setFindAll = function(callback, error, files) {
	if(error) {
		callback(null);

		return;
	}

	callback(files);
};

var getFindByName = function(name, callback) {
	Fs.readFile(
		'./musics/' + name,
		setFindByName.bind(this, callback)
	);
};

var setFindByName = function(callback, error, file) {
	if(error) {
		callback(null);

		return;
	}

	callback(file);
};

exports.findAll 	= getFindAll;
exports.findByName 	= getFindByName;