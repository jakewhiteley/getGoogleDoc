/*
* Google Docs Interface 
* 2014 Jake Whiteley <twentyzerotwo.co.uk>
*/
(function ( $ ) {
	$.extend({
		getGoogleDoc: function (urlKey, callback) {
			var self = this,
				// results holder
				results = []; 

			// converts the return data from Google into a usable array
			this.parseEntry = function (a) {
				var keys = [];
				// get keys
				for (k in a[0]) 
					if (k.match(/gsx/) !== null) 
						keys.push(k.replace('gsx$', ''))
				// create results array
				for (var i = 0, t = {}; i < a.length; t = {}, i++) {
					for (k in keys) 
						if (keys.hasOwnProperty(k)) {
							var result = (a[i]['gsx$' + keys[k]]['$t'].length > 0 ? a[i]['gsx$' + keys[k]]['$t'] : null);
							// push result to results holder, type cast numbers if needed
							t[ keys[k] ] = ( !isNaN( parseInt(result) ) ? parseInt(result) : result )
						}
					// add result to holder
					results.push(t)
				}
			};

			// make GET request, and return promise for chaining
			return $.getJSON(
				"https://spreadsheets.google.com/feeds/list/"+urlKey+"/od6/public/values?alt=json", 
				function (a, b, c) {
					// if the sheet was empty 
					if (typeof a.feed.entry === 'undefined') {
						console.error('$.getGoogleDoc: The sheet was empty')
					}
					else {
						// parse the results
						self.parseEntry(a.feed.entry)
						// callback
						if (typeof callback == 'function')
							callback(results)
						else if (typeof callback != 'undefined')
							console.error('$.getGoogleDoc: Please use a function as a callback. You provided a ' + typeof callback)
					}					
				}
			).fail(function () {
				console.error('$.getGoogleDoc: Invalid key provided')
				return false;
			});
		}
	});
}( jQuery ));
