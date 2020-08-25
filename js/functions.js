$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').html('<div style="text-align: center; padding: 30px; font-family: Arial, sans-serif;">Ваш браузер устарел рекомендуем обновить его до последней версии<br> или использовать другой более современный</div>')
	}


	// Анимированное появление страницы
	$('body').addClass('show')


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll())

	// Кастомный select
	$('select').niceSelect()

	// Фокус при клике на название поля
	$('body').on('click', '.form .label', function() {
    	$(this).next().find('.input, textarea').focus()
	})

	// Выбор файла
	$('body').on('change', '.form input[type=file]', function(e) {
    	$(this).next().text( $(this).val() )
	})


	// Спойлер в тексте
	$('body').on('click', '.text_block .spoler_link', function(e) {
	    e.preventDefault()

	    let parent = $(this).closest('.text_block')

	    if( $(this).hasClass('active') ) {
	    	$(this).removeClass('active').text('Подробнее')

	    	parent.find('.hide').removeClass('show')
	    } else {
	    	$(this).addClass('active').text('Свернуть')

	    	parent.find('.hide').addClass('show')
	    }
	})


	// Fancybox
	$.fancybox.defaults.hash = false
	$.fancybox.defaults.touch = false
	$.fancybox.defaults.backFocus = false
	$.fancybox.defaults.autoFocus = false
	$.fancybox.defaults.animationEffect = 'zoom'
	$.fancybox.defaults.transitionEffect = 'slide'
	$.fancybox.defaults.speed = 500
	$.fancybox.defaults.gutter = 40
	$.fancybox.defaults.i18n = {
		'en' : {
			CLOSE: "Закрыть",
			NEXT: "Следующий",
			PREV: "Предыдущий",
			ERROR: "Запрошенный контент не может быть загружен.<br /> Пожалуйста, повторите попытку позже.",
			PLAY_START: "Запустить слайдшоу",
			PLAY_STOP: "Остановить слайдшоу",
			FULL_SCREEN: "На весь экран",
			THUMBS: "Миниатюры",
			DOWNLOAD: "Скачать",
			SHARE: "Поделиться",
			ZOOM: "Увеличить"
		}
	}


	// Всплывающие окна
	$('body').on('click', '.modal_link', function(e) {
		e.preventDefault()

		$.fancybox.close(true)

		$.fancybox.open({
			src  : $(this).attr('href'),
			type : 'inline'
		})
	})

	// Закрытие всплывающего окна по произвольной кнопке
	$('body').on('click', '.modal .close', function(e) {
		e.preventDefault()

		$.fancybox.close(true)
	})


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function(e){
	    e.preventDefault()

	    let modalId = $(this).data('modal-id')

	    if( $(this).hasClass('active') ){
	        $(this).removeClass('active')
	      	$('.mini_modal').removeClass('active')

	        firstClick = false

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'default')
			}

			$('.overlay').fadeOut(200)
	    }else{
	        $('.mini_modal_link').removeClass('active')
	        $(this).addClass('active')

	        $('.mini_modal').removeClass('active')
	        $(modalId).addClass('active')

	        firstClick = true

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'pointer')
			}

			$('.overlay').fadeIn(200)
	    }
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function(e){
	    if ( !firstClick && $(e.target).closest('.mini_modal').length == 0 ){
	    	if( $('.mini_modal_link').hasClass('active') ){
				$('.overlay').fadeOut(200)
			}

	        $('.mini_modal, .mini_modal_link').removeClass('active')

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'default')
			}
	    }

	    firstClick = false
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('body').on('click', '.mini_modal .close', function(e) {
	    e.preventDefault()

	    $('.mini_modal, .mini_modal_link').removeClass('active')

	    if( $(window).width() < 1024 ){
			$('body').css('cursor', 'default')
		}

		$('.overlay').fadeOut(200)

	    firstClick = false
	})


	// Аккордион
	$('body').on('click', '.accordion .item .title', function(e) {
		e.preventDefault()

		let parent = $(this).closest('.item')
		let accordion = $(this).closest('.accordion')

		if( parent.hasClass('active') ) {
			parent.removeClass('active')
			parent.find('.data').slideUp(300)
		} else {
			parent.addClass('active')
			parent.find('.data').slideDown(300)
		}
	})


	// Табы
	var loationHash = window.location.hash

	$('.tabs_container').each(function(){
	    $(this).find('> .tab_content:first').show()
	})

	$('body').on('click', '.tabs a', function(e) {
		e.preventDefault()

	    if( !$(this).hasClass('active') ) {
	    	let parent = $(this).closest('.tabs_container')
		    let activeTab = $(this).attr('href')

		    parent.find('> .tabs a').removeClass('active')
		    parent.find('> .tab_content').hide()

		    $(this).addClass('active')
		    $(activeTab).fadeIn()
	    }
	})

	if( loationHash ) {
		let activeTab = $('.tabs a[href='+ loationHash +']')
		let parent = activeTab.closest('.tabs_container')

		parent.find('> .tabs a').removeClass('active')
		parent.find('> .tab_content').hide()

		activeTab.addClass('active')
		$( activeTab.attr('href') ).fadeIn()

		$('html, body').stop().animate({
		   	scrollTop: $( activeTab.attr('href') ).offset().top
		}, 1000)
	}


	// Плавная прокрутка к якорю
	// Работает и при прокрутке к табу
	$('body').on('click', '.scroll_link', function(e) {
		e.preventDefault()

		let href      = $(this).data('anchor')
		let addOffset = 20

		if ($(this).data('offset')) {
			addOffset = $(this).data('offset')
		}

		if ($('.tabs button[data-content=' + href + ']').length) {
			let activeTab = $('.tabs button[data-content=' + href + ']')
			let parent    = activeTab.closest('.tabs_container')

			parent.find('> .tabs button').removeClass('active')
			parent.find('> .tab_content').removeClass('active')

			activeTab.addClass('active')
			$(href).addClass('active')
		}

		$('html, body').stop().animate({
			scrollTop: $(href).offset().top - addOffset
		}, 1000)
	})


	// Моб. меню
	$('body').on('click', 'header .mob_menu_link', function(e) {
    	e.preventDefault()

		$('header .menu').addClass('show')
		$('.overlay').fadeIn(300)
    })

    $('body').on('click', 'header .menu .mob_close, .overlay', function(e) {
    	e.preventDefault()

		$('header .menu').removeClass('show')
		$('.overlay').fadeOut(300)
    })

    if( is_touch_device() ){
    	$('header .menu a.sub_link').addClass('touch_link')

    	$('body').on('click', 'header .menu a.touch_link', function(e) {
    		if( $(this).next().css('visibility') == 'hidden' ) {
	    		e.preventDefault()

				$('header .menu .sub_menu').removeClass('show')

				$(this).next().addClass('show')
    		}
	    })
    }
})



// Вспомогательные функции
function is_touch_device() {
	return !!('ontouchstart' in window)
}


function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}