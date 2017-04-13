"use strict";

angular.module('musics')
	.service('Musics', ['$http',
		function($http) {
			var getMusics = function(callback) {
				$http.post('/musics').then(
					callback,
					callback
				);
			};

			var getMusicByFilename = function(filename, callback) {
				$http.post('/musics', filename).then(
					callback,
					callback
				);
			};

			return {
				getMusics 			: getMusics,
				getMusicByFilename	: getMusicByFilename
			};
}]);