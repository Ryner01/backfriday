var countdownEl = $('.countdown-timer');
var then = new Date(1448665199000);

var active = false;

var numberOfCountries = 252;
var currentDownloads = 437;
var numberOfYears = 4;
var usersNumber = 3573;

var countriesArray = [];
var downloadsArray = [];
var yearsArray = [];
var usersArray = [];

var jumpBuyButton = false;

for (var i = 1; i < 300; i++) {
	var temp = numberOfCountries / i;
	var temp2 = numberOfCountries - temp;
	countriesArray.push(temp2);

	var downloadTemp = currentDownloads / i;
	var downloadTemp2 = currentDownloads - downloadTemp;
	downloadsArray.push(downloadTemp2);

	var yearsTemp = numberOfYears / i;
	var yearsTemp2 = numberOfYears - yearsTemp;
	yearsArray.push(yearsTemp2);

	var usersTemp = usersNumber / i;
	var userTemp2 = usersNumber - usersTemp;
	usersArray.push(userTemp2);
};

var breakPoint = $('.proof').offset().top;
var breakPointBuyNow = $('#breakpoint').offset().top;

var scroll = window.requestAnimationFrame ||
             window.webkitRequestAnimationFrame ||
             window.mozRequestAnimationFrame ||
             window.msRequestAnimationFrame ||
             window.oRequestAnimationFrame ||
             function(callback){ window.setTimeout(callback, 1000/60) };

var lastPosition = -1;

function loop() {
	if (lastPosition == (window.pageYOffset + window.innerHeight)) {
      scroll(loop);
      return false;
  } else lastPosition = window.pageYOffset + (window.innerHeight);

  if (lastPosition > breakPoint && active === false) {
  	active = true;
  	updateText();
  }

  scroll(loop);
};

var cntEl = $('.country-number');
var downloads = $('.downloaded');
var years = $('.years');
var users = $('.users');

var i = 0;
function updateText() {
	setTimeout( function() {
		cntEl.html(Math.round(countriesArray[i]));
		downloads.html(Math.round(downloadsArray[i]));
		years.html(Math.round(yearsArray[i]));
		users.html(Math.round(usersArray[i]));

		i++;
    if (i < (downloadsArray.length - 1)) {
    	updateText();
    }else {
    	cntEl.html(numberOfCountries);
    	downloads.html(currentDownloads);
    	years.html(numberOfYears);
    	users.html(usersNumber);
    }
	}, 20);

}

loop();

var now  = new Date();
var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
var d = moment.duration(ms);
var s = Math.floor(d.asHours()) + 'h' + moment.utc(ms).format(" mm") + 'm' + moment.utc(ms).format(" ss") + 's';
countdownEl.html(s);

var previus = new Date();
setInterval(function() {
	var now  = new Date();
	var ms = moment(then,"DD/MM/YYYY HH:mm:ss").diff(moment(now,"DD/MM/YYYY HH:mm:ss"));
	var d = moment.duration(ms);
	var s = Math.floor(d.asHours()) + 'h' + moment.utc(ms).format(" mm") + 'm' + moment.utc(ms).format(" ss") + 's';
	if (true) {};
	if (previus != now) {
		countdownEl.html(s);
		previus = now;
	};
}, 1000)

$('.icon-warp').hover(
  function() {
  	var offset = $(this).offset();
  	console.log(offset)
  	$('.popup').css({display: 'block'});
  	$('.popup-text').html($(this).data('poptext'));
  	$('.popup').velocity({
  		translateY: (offset.top - 110) + 'px',
  		translateX: (offset.left - 60) + 'px',
  	}, 100)
  }, function() {
  	$('.popup').css({display: 'none'});
  }
);

setTimeout( function() {
	$('.buy-norris').addClass('animated tada');
}, 1000)


$('.elevator-click').on('click', function() {
  $('html').velocity('scroll', { offset: '0px', mobileHA: false });
});

var designerActivePack = false;
var developerActivePack =  false;

$('.desginer-modal-open').on('click', function(e) {
  e.stopPropagation();
  if (designerActivePack === false) {
    $('.designer-popup').css('display', 'block');
    $('.background-opacity').css('display', 'block');
    designerActivePack = true;
  }else{
    $('.designer-popup').css('display', 'none');
    $('.background-opacity').css('display', 'none');
    designerActivePack = false;
  }
})

$('.developer-modal-open').on('click', function(e) {
  e.stopPropagation();
  if (developerActivePack === false) {
    $('.developer-popup').css('display', 'block');
    $('.background-opacity').css('display', 'block');
    developerActivePack = true;
  }else{
    $('.developer-popup').css('display', 'none');
    $('.background-opacity').css('display', 'none');
    developerActivePack = false;
  }
})

$('.popupBig').on('click', function(e) {
  e.stopPropagation();
})

$(document).on('click', function (e) {
  if (designerActivePack || developerActivePack) {
    $('.designer-popup').css('display', 'none');
    $('.developer-popup').css('display', 'none');
    $('.background-opacity').css('display', 'none');
    designerActivePack =  false;
    developerActivePack = false;
  };
});

$('.popup-close').on('click', function(e) {
  if (designerActivePack || developerActivePack) {
    $('.designer-popup').css('display', 'none');
    $('.developer-popup').css('display', 'none');
    $('.background-opacity').css('display', 'none');
    designerActivePack =  false;
    developerActivePack = false;
  };
});

var windowWidth = window.innerWidth / 2;
var popWidth = $('.popupBig').width() / 2;

$(window).resize(function(event) {
  windowWidth = window.innerWidth / 2;
  popWidth = $('.popupBig').width() / 2;
});

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)

console.log(w);

console.log(windowWidth, popWidth);
if (w >= 600) {
  $('.popupBig').css({
    top: '730px',
    left: (windowWidth - popWidth) + 'px'
  });
} else {
   $('.popupBig').css({
      top: '0px',
      left: '0px',
      overflow: 'scroll',
      position: 'fixed',
      zIndex: '1000',
      width: '100vw'
    });
}



