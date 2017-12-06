$('.dropdown').click(function (e) {
    e.preventDefault();
    $('.dropdown-content').slideToggle('fast');
});


$('#nav-icon4').click(function () {
    $(this).toggleClass('open');
    $('.mobile-menu').slideToggle();
});

