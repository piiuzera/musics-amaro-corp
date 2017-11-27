"use strict";

(function($scope) {

	var _webRequest = function() {
		var _get = function(url, callback, headers) {
			var HttpRequest = getHttpRequestParams(url, 'GET', headers, callback);
			HttpRequest.send();
		};

		var _post = function(url, form, callback, headers) {
			var HttpRequest = getHttpRequestParams(url, 'POST', headers, callback);
			HttpRequest.send(JSON.stringify(form));
		};

		var _put = function(url, form, callback, headers) {
			var HttpRequest = getHttpRequestParams(url, 'PUT', headers, callback);
			HttpRequest.send(JSON.stringify(form));
		};

		var _patch = function(url, form, callback, headers) {
			var HttpRequest = getHttpRequestParams(url, 'PATCH', headers, callback);
			HttpRequest.send(JSON.stringify(form));
		};

		var _delete = function(url, callback, headers) {
			var HttpRequest = getHttpRequestParams(url, 'DELETE', headers, callback);
			HttpRequest.send();
		};

		var getHttpRequestParams = function(url, method, headers, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open(method, url, true);
			xhr.onloadend = callbackRequest.bind(this, callback, xhr);

			if (typeof headers === 'object') {
				for (var key in Object.keys(headers)) {
					xhr.setRequestHeader(key, headers[key]);
				}
			}

			return xhr;
		};

		var callbackRequest = function(callback, HttpRequest) {
			var HttpResponse = {};
			if (HttpRequest.readyState === 4) {
				HttpResponse.status 	= HttpRequest.status;
				try {
					HttpResponse.body 	= JSON.parse(HttpRequest.response);
				} catch(ex) {
					HttpResponse.body 	= HttpRequest.response;
				}
				callback(HttpResponse);
			}
		};

		this.Get 	= _get;
		this.Post 	= _post;
		this.Put 	= _put;
		this.Patch 	= _patch;
		this.Delete = _delete;
	};

	$scope.WebRequest = new _webRequest();
})(this);