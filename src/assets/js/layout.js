$(function(){
	/* 팝업창 닫기 */
	$('.popup_layer .popup_content .close').on('click',function(){
		$(this).closest('.popup_layer').fadeOut('fast');
	});

	/* mobileGnb 뎁스메뉴 클릭
	$(document).on('click', '#memberRnb .mr_list li a', function(){
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).siblings('div').stop().slideUp();
		} else {
			$(this).parent('li').siblings('li').find('a').removeClass('active');
			$(this).parent('li').siblings('li').children('div').stop().slideUp();
			$(this).addClass('active');
			$(this).siblings('div').stop().slideDown();
		}
	}); */
	
	/* 상품 할인정보 팝업
	$(document).on('click', '.list_wrap .explain .btnExp',function(){
		$(this).siblings('.explain_pop').fadeIn();
	});
	$(document).on('click', '.list_wrap .explain .explain_pop .delete',function(){
		$(this).closest('.explain_pop').fadeOut();
	});
	*/
	/* 카테고리 닫기
	$('#lnb').after().on('click',function(){
		$('html').css({'overflow': 'auto', 'height': 'auto'});
		$('#lnb').hide();
		$('#lnb .lnb_inner').animate({
			left: "-500px",
		}, 500);
	}); */

	$.datepicker.setDefaults({
		dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		dayNames: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'],
		showMonthAfterYear: true,
	});

	$(".so-datepicker").datepicker();
});
// 상세 페이지
function fnMove(seq) {
	var offset = $("#gdsDetail" + seq).offset();
	var contract = offset.top - 60;
	$('html, body').animate({scrollTop : contract}, 400);
	//console.log(contract);
}

function btnTop() {
	$('body,html').animate({
	 scrollTop: 0
	}, 500);  
	return false;
}

/* 디바이스 사이즈
var windowWidth = $( window ).width();
if(windowWidth > 799) {
	$('html').addClass('pc');
} else if (windowWidth <= 799 && windowWidth > 640) {
	$('html').addClass('tablet');
} else {
	$('html').addClass('mobile');				
}

// 스크롤
var didScroll;
var navScroll;

$(window).scroll(function(event){
	didScroll = true;
	navScroll = true;
}); 

setInterval(function() { 
	if (didScroll) { 
		hasScrolled(); 
		didScroll = false; 
	} 
}, 250);

function hasScrolled() {
	var $st = $(this).scrollTop();
	if ( $st > 420 ){
		$('.tablet header').addClass('hover');
	} else {
		$('.tablet header').removeClass('hover');
	}

	if ( $st > 180 ){
		$('.mobile header').addClass('hover');
	} else {
		$('.mobile header').removeClass('hover');
	}
}

setInterval(function() { 
	if (navScroll) { 
		navScrolled(); 
		navScroll = false; 
	} 
});

function navScrolled() {
	var $st = $(this).scrollTop();
	if ( $st > 530 ){
		$('.pc .main #header').addClass('fixed');
	} else {
		$('.pc .main #header').removeClass('fixed');
	}
}
*/
// Category menu
function menuBtn() {
	$('html').css({'overflow': 'hidden', 'height': 'auto'});
	$('#lnb').fadeIn();
	$('#lnb .lnb_inner').animate({
		left: 0,
	}, 500);
}

function menuClose() {
	$('html').css({'overflow': 'auto', 'height': 'auto'});
	$('#lnb').hide();
	$('#lnb .lnb_inner').animate({
		left: "-500px",
	}, 500);
}
// mobile_gnb
function mGnbBtn() {
	$('html').css({'overflow': 'hidden', 'height': 'auto'});
	$('#mobileGnb').fadeIn();
	$('#mobileGnb .gnb_inner').animate({
		left: 0,
		right: 0,
	}, 500);
}

function mGnbClose() {
	$('html').css({'overflow': 'auto', 'height': 'auto'});
	$('#mobileGnb').hide();
	$('#mobileGnb .gnb_inner').animate({
		left: "-500px",
		right: "auto",
	}, 500);
}

function mRnbBtn() {
	$('html').css({'overflow': 'hidden', 'height': 'auto'});
	$('#memberRnb').fadeIn();
	$('#memberRnb .mr_inner').animate({
		right: 0,
	}, 500);
}

function mRnbClose() {
	$('html').css({'overflow': 'auto', 'height': 'auto'});
	$('#memberRnb').hide();
	$('#memberRnb .mr_inner').animate({
		right: "-500px",
	}, 500);
}



