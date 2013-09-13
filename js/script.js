var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) ? true : false;

$(function() {

	// Rudimentary mobile/desktop CSS class hook
	$('html').addClass(isMobile ? 'is-mobile' : 'is-desktop');

	// Initiate the rocker menu
	$('#menu').on({
		rockerShow: function(event, data) {
			$('.btn-menu').addClass('active');
		},
		rockerHide: function(event, data) {
			$('.btn-menu').removeClass('active');
		}
	}).rocker();

	//$('#menu').rocker('show');

	// Nav button actions
	$('.btn-menu').on('click touchstart', function(e) {

		e.preventDefault();
		e.stopPropagation();

		if (e.handled !== true) {
			$('#menu').rocker('toggle');
			e.handled = true;
		} else {
			return false;
		}
	});
	$('#menu').on('click touchstart', function(e) {
		e.stopPropagation();
	});
	$('body').on('click touchstart', function(e) {
		$('#menu').rocker('hide');
	});
});