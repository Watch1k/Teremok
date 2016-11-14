$(document).ready(function () {

	initSubmit();

	(function () {
		var toggleBtn = $('.js-hamburger'),
			nav = $('.js-nav');

		toggleBtn.on('click', function () {
			$(this).toggleClass('is-active');
			nav.toggleClass('is-active');
		});

		$(window).resize(function () {
			toggleBtn.removeClass('is-active');
			nav.removeClass('is-active');
		})
	})();

	// scroll next section

	(function () {
		var scrollBtn = $('.js-scroll');
		scrollBtn.on('click', function () {
			var scrollDistance = $(this).closest('section').next('section').offset().top;
			$("html, body").animate({
				scrollTop: scrollDistance
			}, 1000);
		});
	})();

	// scroll to section

	(function () {
		var nav = $('.js-nav'),
			navItem = nav.children();

		navItem.on('click', function (e) {
			e.preventDefault();
			var el = $(this).attr('href');
			$('html, body').animate({scrollTop: $(el).offset().top}, 2000);
			return false;
		});
	})();

// scroll top

	(function () {
		$('.scroll-top').click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, "slow");
			return false;
		});
	})();

	// area slider

	(function () {
		var sldArea = $('.js-area'),
			sldOutput = $('.js-area-output');

		sldArea.slider({
			range: "min",
			value: 42,
			min: 1,
			max: 99,
			slide: function (event, ui) {
				sldOutput.val(ui.value);
			}
		});
		sldOutput.val(sldArea.slider("value"));
		$('.ui-slider-handle').append(sldOutput);
		$('<span class="calculate__sup">м<sup>2</sup></span>').insertAfter(sldOutput);
	})();

	// calculate popup

	(function () {
		var popupOpen = $('.js-popup-open');

		popupOpen.click(function (e) {
			e.preventDefault();

			var _this = $(this),
				_ref = _this.data('href');

			$.get('modals/' + _ref + '.html', function (data) {
				$('body').append(data);
				$('body').addClass('is-locked');
				initSubmit();

				var popup = $('.js-popup'),
					popupClose = $('.js-popup-close');

				popup.fadeIn();
				popupClose.on('click', function(){
					$(this).closest(popup).fadeOut(function() {
						$('body').removeClass('is-locked');
						$(this).remove();
					});
				});

				popup.on('click', function (e) {
					if (!$(this).is(e.target)) {
						//code here
					} else {
						$(this).fadeOut(function () {
							$('body').removeClass('is-locked');
							$(this).remove();
						});
					}
				});
			});
		});
	})();

	// email send

	function initSubmit() {
		$(".js-calculate-form").unbind();
		$(".js-calculate-form").submit(function (e) {
			e.preventDefault();
			var th = $(this),
				popup = $('.js-popup');
			$.ajax({
				type: "POST",
				url: "mail.php",
				data: th.serialize()
			}).done(function () {
				if (popup.length) {
					popup.children().fadeOut(function () {
						$(this).remove();
						$.get('modals/modal_ty.html', function (data) {
							popup.append(data);
							popup.children().hide().fadeIn();

							var popupClose = $('.js-popup-close');
							popupClose.on('click', function () {
								$(this).closest(popup).fadeOut(function () {
									$('body').removeClass('is-locked');
									$(this).remove();
								});
							});

							popup.on('click', function (e) {
								if (!$(this).is(e.target)) {
									//code here
								} else {
									$(this).fadeOut(function () {
										$('body').removeClass('is-locked');
										$(this).remove();
									});
								}
							});
						});
					});
				} else {
					$.get('modals/modal_ty.html', function (data) {
						$('body').append('<div class="layer-popup js-popup">' + data + '</div>');
						popup = $('.js-popup');
						popup.fadeIn();

						var popupClose = $('.js-popup-close');
						popupClose.on('click', function () {
							$(this).closest(popup).fadeOut(function () {
								$('body').removeClass('is-locked');
								$(this).remove();
								th.trigger('reset');
							});
						});

						popup.on('click', function (e) {
							if (!$(this).is(e.target)) {
								//code here
							} else {
								$(this).fadeOut(function () {
									$('body').removeClass('is-locked');
									$(this).remove();
									th.trigger('reset');
								});
							}
						});
					});
				}
			});
		});
	}

	// questions accordion

	(function () {
		var allButtons = $('.js-accordion-title'),
			allPanels = $('.js-accordion-inner');

		allButtons.click(function () {
			if (!$(this).parent().hasClass('is-active')) {
				allPanels.slideUp();
				allButtons.parent().removeClass('is-active');
				$(this).parent().addClass('is-active').children().last().slideDown();
				return false;
			} else {
				$(this).parent().removeClass('is-active').children().last().slideUp();
			}
		});
	})();

	// testimonials carousel

	(function () {

		$('.js-carousel').slick({
			dots: false,
			arrows: true,
			infinite: true,
			speed: 900,
			slidesToShow: 3,
			slidesToScroll: 1,
			appendArrows: $(".js-carousel"),
			prevArrow: '<i class="testimonials__arrow testimonials__arrow--left icon-acc_arrow"></i>',
			nextArrow: '<i class="testimonials__arrow testimonials__arrow--right icon-acc_arrow"></i>',
			responsive: [
				{
					breakpoint: 1023,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});

	})();

	(function () {
		var myLatLng = [59.177373, 39.975199];
		ymaps.ready(init);
		var myMap;

		function init() {
			myMap = new ymaps.Map("map", {
				center: myLatLng,
				zoom: 13
			}, {
				searchControlProvider: 'yandex#search'
			}),
				myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
					hintContent: 'Русский Терем'
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'img/logo-map.png',
					iconImageSize: [90, 90],
					iconImageOffset: [-45, -45]
				});
			myMap.geoObjects.add(myPlacemark);
			myMap.behaviors.disable('scrollZoom');
			myMap.controls.remove('searchControl');
			myMap.controls.remove('trafficControl');
			myMap.controls.remove('typeSelector');
			myMap.controls.remove('fullscreenControl');
		}
	})();

	(function () {
		var item = $('.js-works').children(),
			btn = $('.js-works-more');

		btn.on('click', function(){
			item.fadeIn();
			$(this).remove();
		});
	})();

	(function () {
		VK.Widgets.Group("vk_groups", {mode: 3, width: "300"}, 69448292);
	})();

});
