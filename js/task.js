// JavaScript Document
$(function(){
	var setFlag = false;
	$('tr.add td i').live('mouseenter', function(){
		$(this).nextAll('i').andSelf().addClass('set');
		$(this).prevAll('i').removeClass('set');
	});
	$('tr.add td i').live('mouseleave', function(){
		$(this).siblings('i').andSelf().removeClass('set');
	})	
	$('tr.add td i').live('click', function(){
		if($('#quickTask').val() != ''){
			$(this).prevAll('i').remove();
			$(this).parent().children().removeClass('set');			
			$(this).parents('.add').before('<tr><td>'
					+ $('#quickTask').val()
					+'</td><td align="right">'
					+ $(this).parent().html()
                    +'</td></tr>');
			
			$('#quickTask').val('');
			$(this).parent().html('<i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>');
		} else {
			$('#quickTask').focus();
		}
	})	
	
	$('.tab').click(function(e){
		e.preventDefault();
		$(this).addClass('active').siblings().removeClass('active');
		$($(this).attr('href')).addClass('active').siblings('.tabContent').removeClass('active');
	});
	
	$('#dataVisualization').removeClass('active');
})

