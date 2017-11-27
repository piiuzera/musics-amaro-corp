"use strict";

(function($scope, WebRequest) {

	var _init = function() {
		WebRequest.Get(
			'http://tudao.amarocorp.com.br/api/subject',
			callbackRequestSubject
		)
	};

	var callbackRequestSubject = function(Response) {
		console.log(Response);
	};

	$scope.Init = _init;

})(this, WebRequest);