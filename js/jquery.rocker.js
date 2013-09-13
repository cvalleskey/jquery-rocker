/*
	Copyright (c) 2013 Chris Valleskey, github.com/cvalleskey
	
	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the
	"Software"), to deal in the Software without restriction, including
	without limitation the rights to use, copy, modify, merge, publish,
	distribute, sublicense, and/or sell copies of the Software, and to
	permit persons to whom the Software is furnished to do so, subject to
	the following conditions:
	
	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

;(function($) {

	$.fn.rocker = function(method) {

		var methods = {

			init: function(options) {
				this.rocker.settings = $.extend({}, this.rocker.defaults, options);
				return this.each(function() {
					
					var $el = $(this);

					$el.addClass('js-rocker');
					$el.children().addClass('js-rocker-item');
					$el.trigger("rockerInit");

					$el.children().on('touchstart mouseenter', function(e) {

						e.preventDefault();
						e.stopPropagation();

						if (e.handled !== true) {

							$(this).siblings().removeClass('active');
							$(this).addClass('active');

						} else {
							return false;
						}

					});

				});

			},

			hide : function() {
				return this.each(function() {

					var $el = $(this);

					$el.removeClass('active');

					if (typeof $el.data('active-item') !== "undefined") {

						$el.data('active-item').siblings().removeClass('active').removeClass('inactive');
						$el.data('active-item').addClass('active').removeClass('inactive');

					} else {

						$el.children().removeClass('active');

					}

					$el.trigger("rockerHide");
				});
			},

			show : function() {
				return this.each(function() {

					var $el = $(this);

					$el.addClass('active');
					$el.trigger("rockerShow");

				});
			},

			toggle : function() {
				return this.each(function() {

					var $el = $(this);

					if ($el.hasClass('active')) {

						$el.rocker('hide');

					} else {

						$el.rocker('show');

					}
				});
			},

			setActiveItem : function(item) {
				return this.each(function() {

					var $el = $(this);

					// Remove class from the old active item
					$($el.data('active-item')).removeClass('active');
					$el.siblings('.js-rocker-item').addClass('inactive');

					// Save and set our new item to active
					$el.data('active-item', item);
					$(item).addClass('active');
					$el.trigger("rockerSetActiveItem");

				});
			},

			removeActiveItem : function() {
				
				var $el = $(this);

				if (typeof $el.data('active-item') !== "undefined" && $el.data('active-item') != null) {

					$($el.data('active-item')).removeClass('active');
					$el.removeData('active-item');
					
				}
			}

		}

		var helpers = {
			isMobile : function() {
				return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) ? true : false;
			},
			useLegacy : function() {
				return true;
			}
		}

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method "' + method + '" does not exist in rocker plugin!');
		}

	}

	$.fn.rocker.defaults = {}

	$.fn.rocker.settings = {}

})(jQuery);