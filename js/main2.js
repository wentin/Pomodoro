window.onload = function () {
	var r = Raphael("holder", 540, 540);
		init = true,
		R = 210,
		color = "#e92b10",
		param = {stroke: color, "stroke-width": 110};
		
		
	var min = r.path().attr(param).attr({arc: [0, 25, R]});
	
	// Custom Attribute
	r.customAttributes.arc = function (value, total, R) {
		var alpha = 360 / total * value,
			a = (90 - alpha) * Math.PI / 180,
			x = 270 + R * Math.cos(a),
			y = 270 - R * Math.sin(a),
			path;
		if (total == value) {
			path = [["M", 270, 270 - R], ["A", R, R, 0, 1, 1, 269.99, 270 - R]];
		} else {
			path = [["M", 270, 270 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
		}
		return {path: path, stroke: color};
	};

	function updateVal(value, total, R, hand, id) {
		if (init) {
			hand.animate({arc: [value, total, R]}, 900, ">");
		} else {
			if (!value || value == total) {
				value = total;
				hand.animate({arc: [value, total, R]}, 750, "bounce", function () {
					hand.attr({arc: [0, total, R]});
				});
			} else {
				hand.animate({arc: [value, total, R]}, 750, "elastic");
			}
		}
	}
	
	var startTime, sHour, sMinute;
	var pauseTime, pHour = 0, pMinute = 0;
	var resumeTime, rHour= 0, rMinute = 0;
	var startFlag = false;
	var pauseFlag = false;
	var duration = 0;
	(function () {
		if(startFlag){			
			if(!pauseFlag){
				//duration++;
				duration = duration + 1;
			}
			//duration = (dHour - sHour)*60 + (dMinute - sMinute) - (rHour - pHour)*60 - (rMinute - pMinute);
			if( duration<= 25) {
				updateVal(duration, 25, 195, min, 1);
			} else if (duration > 25) {				
				duration = 0;
				addPomodoro();
				startFlag = false;
			}
		}
		//getSeconds getMinutes getHours
		setTimeout(arguments.callee, 1000);
		init = false;
	})();
	
	
	$('.start').live('click', function(){
		$(this).removeClass('start').addClass('pause');
		$(this).text('pause');
		startFlag = true;
		pauseFlag = false;
		startTime = new Date;
		sHour = startTime.getMinutes();
		sMinute = startTime.getSeconds();
	})
	
	$('.pause').live('click', function(){	
		$(this).removeClass('pause').addClass('resume');
		$(this).text('resume');
		pauseFlag = true;
		pauseTime = new Date;
		pHour = pauseTime.getMinutes();
		pMinute = pauseTime.getSeconds();
	})
	
	$('.resume').live('click', function(){
		$(this).removeClass('resume').addClass('pause');
		$(this).text('pause');
		pauseFlag = false;
		resumeTime = new Date;
		rHour = resumeTime.getMinutes();
		rMinute = resumeTime.getSeconds();
	})
	
	$('.dataButton').live('click', function(){
		over_lay();
	});
	$('#overcolor, .closeButton').live('click', function(){
		over_off();
	});
	
	function addPomodoro(){
		$('.bar').append('<span></spam>');	
		$('.button').addClass('start').removeClass('pause').text('start');
		startFlag = false;
	}
};

function addPomodoro(){
	$('.bar').append('<span></spam>');	
	$('.button').addClass('start').removeClass('pause').text('start');
	startFlag = false;
}
//overlay open
function over_lay() {
	$("#overlay").show();
	var docH = $(document).height();
	var winH = $(window).height();
	var docW = $(document).width();
	var scrH = $(window).scrollTop();
	$("#overcolor").height(docH);
	$("#overcontent").height(docH - 40);
	$("#overcontent").css("top", scrH + winH/2 - $("#overcontent").outerHeight()/2);
	$("#overcontent").css("left", docW/2 - $("#overcontent").width()/2);
	$("#overholder").fadeIn();
}

function over_off() {
	$("#overlay").hide();
}