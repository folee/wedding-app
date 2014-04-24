// Define global mobile parameters when initialized
$(document).on('pageinit', function(event) {
	if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 7_\d/i)) {
		$('body').addClass('ios7');
		$('body').append('<div id="ios7statusbar"/>');
	}
});

$(document).on('mobileinit', function() {
    $.mobile.defaultPageTransition = 'fade';
});

console.log('Global file read.');

// Define global server and photo URL's
//if (!navigator.userAgent.toLowerCase().match('chrome')) {
	var server_url = 'http://wedding.minortechnologies.com/mobile/';
	var photo_url = 'http://wedding.minortechnologies.com/media/photos/';
//} else {
//    var server_url = 'http://localhost/weddingconnect/mobile/';
//    var photo_url = 'http://localhost/weddingconnect/media/photos/';
//}

// Function to convert current GMT time to yyyy-mm-dd hh:mm:ss format
function formatTimestamp(date) {
	var year = date.getUTCFullYear(),
	month = date.getUTCMonth() + 1,
	day = date.getUTCDate(),
	hour = date.getUTCHours(),
	minute = date.getUTCMinutes(),
	second = date.getUTCSeconds(),
	pad = function (value) {
    	value = value + '';
    	if (value.length === 1) {
    	    return '0' + value;
    	}
    	return value;
	};
	return year + '-' + pad(month) + '-' + pad(day) + ' ' + pad(hour) + ':' + pad(minute) + ':' + pad(second);
}