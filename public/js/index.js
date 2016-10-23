// Enable popovers everywhere
$(function() {
    $('[data-toggle="popover"]').popover()
})
$('document').ready(function() {
    $('.popover-dismiss').popover({
        trigger: 'focus'
    })
    $('#formNext').on('click', function(e) {
    	e.preventDefault()
        $(this).addClass('hidden-xs-up')
        $('#fillOut').toggleClass('hidden-xs-up')
    })
})