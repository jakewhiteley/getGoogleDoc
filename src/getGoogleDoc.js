/*
* Google Docs Interface 
* 2014 Jake Whiteley <twentyzerotwo.co.uk>
*/
(function ( $ ) {
	$.extend({
		getGoogleDoc: function (urlKey, callback, results) {
			var self = this; 

			// converts the return data from Google into a usable array
			this.parseEntry = function (ab, results) {
				var keys = [];
				// get keys
				for (k in ab[0]) 
					if (k.match(/gsx/) !== null) 
						keys.push(k.replace('gsx$', ''));
				// create results array
				for (var i = 0, t = {}; i < ab.length; t = {}, i++) {
					for (k in keys) 
						if (keys.hasOwnProperty(k)) {
							var result = (ab[i]['gsx$' + keys[k]]['$t'].length > 0 ? ab[i]['gsx$' + keys[k]]['$t'] : null);
							// push result to results holder, type cast numbers if needed
							t[ keys[k] ] = ( !isNaN(result) ? parseFloat(result) : result );
						}
					// add result to holder
					results.push(t);
				}
				return results;
			};

			// make GET request, and return promise for chaining
			return $.getJSON(
				"https://spreadsheets.google.com/feeds/list/"+urlKey+"/od6/public/values?alt=json&callback=?", 
				function (a) {
					// if the sheet was empty 
					if (typeof a.feed.entry === 'undefined') 
						return [];
					else 
						// callback
						if (typeof callback == 'function')
							callback(self.parseEntry(a.feed.entry, []));
				}
			);
		}
	});
}(jQuery));
