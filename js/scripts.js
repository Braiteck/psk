$(function() {
	// Боковая колонка - категории
	$('body').on('click', 'aside .cats .link .arr', function(e) {
		e.preventDefault()

		if ($(this).prev().hasClass('active')) {
			$(this).prev().removeClass('active')
			$(this).closest('.link').next().slideUp(500)
		} else {
			$(this).prev().addClass('active')
			$(this).closest('.link').next().slideDown(500)
		}
	})


	// Слайдер в тексте
	$('.slider_in_text .slider').owlCarousel({
		items      : 1,
		margin     : 0,
		loop       : true,
		dots       : true,
		smartSpeed : 500,
		nav        : true
	})


	// Отзывы
	$('.reviews .slider').owlCarousel({
		loop       : true,
		nav        : true,
		dots       : true,
		smartSpeed : 500,
		responsive : {
			0: {
				items  : 2,
				margin : 15
			},
			414: {
				items  : 3,
				margin : 13
			},
			768: {
				items  : 5,
				margin : 15
			},
			1024: {
				items  : 5,
				margin : 15
			},
			1280: {
				items  : 6,
				margin : 27
			},
			1600: {
				items  : 8,
				margin : 27
			}
		}
	})


	$('.reviews_big .slider').owlCarousel({
		loop       : true,
		nav        : true,
		dots       : true,
		smartSpeed : 500,
		dotsEach   : true,
		responsive : {
			0: {
				items  : 1,
				margin : 15
			},
			480: {
				items  : 1,
				margin : 15
			},
			768: {
				items  : 3,
				margin : 20
			},
			1600: {
				items  : 4,
				margin : 35
			}
		}
	})


	// Категория услуги
	$('.service_sub_cats .item .slider').owlCarousel({
		items      : 1,
		margin     : 0,
		loop       : true,
		dots       : false,
		smartSpeed : 500,
		nav        : true
	})


	// Товары
	$('.products_slider .slider').owlCarousel({
		loop       : true,
		nav        : true,
		dots       : true,
		smartSpeed : 500,
		dotsEach   : true,
		responsive : {
			0: {
				items  : 1,
				margin : 15
			},
			480: {
				items  : 1,
				margin : 15
			},
			768: {
				items  : 2,
				margin : 20
			},
			1280: {
				items  : 3,
				margin : 20
			},
			1600: {
				items  : 4,
				margin : 20
			}
		}
	})


	// Страница филиала - основной слайдер
	$('.branche_info .main_slider').owlCarousel({
		items      : 1,
		margin     : 20,
		loop       : true,
		dots       : true,
		smartSpeed : 500,
		nav        : true
	})

	// Страница филиала - клиенты
	$('.branche_info .clients .slider').owlCarousel({
		loop       : true,
		nav        : true,
		dots       : true,
		smartSpeed : 500,
		margin     : 5,
		responsive : {
			0: {
				items : 1
			},
			768: {
				items : 2
			},
			1280: {
				items : 3
			}
		},
		onInitialized: function(event){
			setTimeout(() => { setHeight($(event.target).find('.item')) }, 100)
		},
		onResized: function(event){
			$(event.target).find('.item').height('auto')

			setTimeout(() => { setHeight($(event.target).find('.item')) }, 100)
		}
	})


	// Отзывы об аренде
	$('.rent_reviews .slider').owlCarousel({
		loop       : true,
		nav        : true,
		dots       : true,
		smartSpeed : 500,
		items      : 1,
		margin     : 20
	})


	// Меню
	$('header .menu .item').mouseover(function() {
		if ($(this).find('> a').hasClass('sub_link')) {
			$('.overlay').fadeIn(200)
		}
	})

	$('header .menu .item').mouseleave(function() {
		if ($(this).find('> a').hasClass('sub_link')) {
			$('.overlay').fadeOut(200)
		}
	})


	// Поле ввода телефона
	var masks = {
		'ru': '+7 (999) 999-99-99',
		'by': '+375 (99) 999-99-99',
		'kz': '+7 (999) 999-99-99',
		'ua': '+38 (099) 999-99-99',
		'other': '+99999999999'
	}

	$('input[type=tel]').inputmask(masks['ru'])

	var inputPhone = $('input[type=tel]').intlTelInput({
		onlyCountries: ['ru', 'kz', 'by', 'other', 'ua'],
		initialCountry: 'ru',
		preferredCountries: ['ru'],
		localizedCountries: {
			'ru': 'Россия',
			'kz': 'Казахстан',
			'by': 'Беларусь',
			'ua': 'Украина'
		}
	})

	inputPhone.on('countrychange', function(instance) {
		let self = $(this)

		setTimeout(function() {
			let isoCode = self.attr('data-iso')

			if (masks[isoCode]) {
				$(instance.currentTarget).inputmask(masks[isoCode])

				self.attr('data-iso', isoCode)
			}
		}, 10)
	})


	// Моб. фильтр
	if ($(window).width() < 1024) {
		$('body').on('click', 'aside .filter .title', function(e) {
			e.preventDefault()

			if ($(this).hasClass('active')) {
				$(this).removeClass('active').next().slideUp(300)
			} else {
				$(this).addClass('active').next().slideDown(300)
			}
		})
	}


	// Моб. выбор фзыка
	$('body').on('click', 'header .langs .mob_link', function(e) {
		e.preventDefault()

		if ($(this).hasClass('show')) {
			$(this).removeClass('show')
			$('header .langs .list').fadeOut(300)
		} else {
			$(this).addClass('show')
			$('header .langs .list').fadeIn(300)
		}
	})


	// Карточка товара
	$product_info = $('.product_info .images .big_image .slider').owlCarousel({
		items: 1,
		margin: 20,
		loop: false,
		dots: false,
		smartSpeed: 500,
		onTranslate: function(event) {
			$('.product_info .images .thumbs a').removeClass('active')
			$('.product_info .images .thumbs a:eq(' + event.item.index + ')').addClass('active')
		},
		responsive: {
			0: {
				nav: true
			},
			768: {
				nav: false
			}
		}
	})

	$('.product_info .images .thumbs a').click(function(e) {
		e.preventDefault()

		$('.product_info .images .thumbs a').removeClass('active')

		$product_info.trigger('to.owl.carousel', $(this).data('slide-index'))

		$(this).addClass('active')
	})


	// Страница товара
	$('.product_data .images .big .slider').owlCarousel({
		items       : 1,
		margin      : 20,
		loop        : false,
		smartSpeed  : 500,
		dots        : false,
		nav         : false,
		onTranslate : (event) => {
	    	let parent = $(event.target).closest('.images')

	    	parent.find('.thumbs .slide > *').removeClass('active')
	    	parent.find('.thumbs .slide:eq('+ event.item.index +') > *').addClass('active')
	    }
	})

	$('.product_data .images .thumbs .slider').owlCarousel({
		nav        : true,
		dots       : false,
		loop       : false,
		smartSpeed : 500,
		items      : 4,
		margin     : 9
	})

	$('.product_data .images .thumbs .slide > *').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.images')

	    parent.find('.big .slider').trigger('to.owl.carousel', $(this).data('slide-index'))
	})


	// Калькулятор
	$('.calc .data .form .input').keydown(function(e) {
		let _self = $(this)
		let min = $(this).data('min')
		let max = $(this).data('max')

		setTimeout(function() {
			let value = parseInt(_self.val())

			if (value < min || value > max) {
				_self.addClass('error')
			} else {
				_self.removeClass('error')
			}
		}, 10)
	})

	$('.calc .data .form').submit(function(e) {
		e.preventDefault()

		// Минимумы и максимумы
		let heightMin = 1
		let heightMax = 5
		let areaMin = 10
		let areaMax = 2000
		let depthMin = 100
		let depthMax = 250
		let minTotalPriceWith = 4000
		let minTotalPriceWithout = 2500

		// Значения полей
		let height = parseInt($(this).find('.height_input').val())
		let area = parseInt($(this).find('.area_input').val())
		let depth = parseInt($(this).find('.depth_input').val())
		let monthsWith = parseInt($(this).find('.months_with_input').val())
		let monthsWithout = parseInt($(this).find('.months_without_input').val())

		if (isNaN(monthsWith)) {
			monthsWith = 0
		}

		if (isNaN(monthsWithout)) {
			monthsWithout = 0
		}


		// Если значение высоты меньше минимум или больше максимума
		if (height < heightMin) {
			$(this).find('.height_input').val(heightMin)
			height = heightMin
		}

		if (height > heightMax) {
			$(this).find('.height_input').val(heightMax)
			height = heightMax
		}


		// Если значение площади меньше минимум или больше максимума
		if (area < areaMin) {
			$(this).find('.area_input').val(areaMin)
			area = areaMin
		}

		if (area > areaMax) {
			$(this).find('.area_input').val(areaMax)
			area = areaMax
		}


		// Если значение толщины меньше минимум или больше максимума
		if (depth < depthMin) {
			$(this).find('.depth_input').val(depthMin)
			depth = depthMin
		}

		if (depth > depthMax) {
			$(this).find('.depth_input').val(depthMax)
			depth = depthMax
		}


		// Расчет телескопических стоек/унивилок/треног
		if (depth < 200) {
			$(this).find('.racks_input').val(Math.ceil(area * 0.7))
			$(this).find('.univilki_input').val(Math.ceil(area * 0.7))
			$(this).find('.tripods_input').val(Math.ceil(area * 0.3))
		} else {
			$(this).find('.racks_input').val(Math.ceil(area * 0.8))
			$(this).find('.univilki_input').val(Math.ceil(area * 0.8))
			$(this).find('.tripods_input').val(Math.ceil(area * 0.4))
		}

		// Расчет двутавровых балок в пересчете на 1 метр погонный
		$(this).find('.beam_input').val(Math.ceil(area * 3))

		// Расчет ламинированной фанеры 21мм в пересчете на 1м3
		$(this).find('.plywood_input').val(Math.ceil(area * 0.021 * 1.05))


		// Итоговая стоимость
		let totalPriceWith = 0
		let totalPriceWithout = 0
		let pricePerMonthWith = 0
		let pricePerMonthWithout = 0

		totalPriceWithout = Math.ceil(area * 250)
		totalPriceWith = Math.ceil(area * 400)

		if (totalPriceWith < minTotalPriceWith) {
			totalPriceWith = minTotalPriceWith
		}

		if (totalPriceWithout < minTotalPriceWithout) {
			totalPriceWithout = minTotalPriceWithout
		}

		pricePerMonthWith = Math.ceil(totalPriceWith / monthsWith)
		pricePerMonthWithout = Math.ceil(totalPriceWithout / monthsWithout)

		if (monthsWith > 0) {
			$(this).find('.price.with span').text(pricePerMonthWith.toLocaleString())
			$(this).closest('.calc').find('.bottom .total span').text(totalPriceWith.toLocaleString())
		}

		if (monthsWithout > 0) {
			$(this).find('.price.without span').text(pricePerMonthWithout.toLocaleString())
			$(this).closest('.calc').find('.bottom .total span').text(totalPriceWithout.toLocaleString())
		}
	})


	// История
	$('.history_years .mob_select select').change(function(){
		let href      = '#year'+ $(this).val()
		let addOffset = 20

		$('html, body').stop().animate({
			scrollTop: $(href).offset().top - addOffset
		}, 1000)
	})
})


$(window).on('load', function(){
	// Страница филиала - сертификаты
	$('.branche_info .certs .slider').owlCarousel({
		loop       : true,
		nav        : true,
		dots       : true,
		smartSpeed : 500,
		autoWidth  : true,
		items      : 4,
		responsive : {
			0: {
				margin : 20
			},
			1600: {
				margin : 25
			}
		}
	})
})