// Enable popovers everywhere
$(function () {
  $('[data-toggle="popover"]').popover()
})

$('.popover-dismiss').popover({
  trigger: 'focus'
})

$('#formNext').on('click',function(){
	$(this).addClass('hidden-xs-up')
	$('#fillOut').toggleClass('hidden-xs-up')
})