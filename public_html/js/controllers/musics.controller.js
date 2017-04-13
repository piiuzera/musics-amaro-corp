"use strict";

angular.module('musics')
	.controller('musicsController', ['$scope', 'Musics',
		function($scope, Musics) {

			$scope.musics = [];

			$scope.musicPlay = null;



			var getMusics = function() {
				Musics.getMusics(setMusics);
			};

			var setMusics = function(response, error) {
				if (error) {
					$scope.error = response.message;

					return;
				}

				$scope.musics = response.data.musics;
			};

			var getMusicByFilename = function(filename) {
				var request = {
					filename: filename
				};

				Musics.getMusicByFilename(
					request,
					setMusicByFilename
				);
			};

			var setMusicByFilename = function(response, error) {
				if (error) {
					$scope.error = response.message;

					return;
				}

				console.log(response);
			};


			var init = function() {
				getMusics();
			};

			$scope.getMusics			= getMusics;
			$scope.getMusicByFilename 	= getMusicByFilename;
			$scope.init 				= init;
	}]);