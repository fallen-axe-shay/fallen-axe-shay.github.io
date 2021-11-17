$('#universal-interpreter-link').on('click', ()=> {
    $('#projects-accordion .accordion-button').addClass('collapsed');
    $('#projects-accordion .accordion-collapse').removeClass('show');
    $('.universal-interpreter-content').addClass('show');
    $('.universal-interpreter').removeClass('collapsed');
    $(".universal-interpreter").get(0).scrollIntoView(true);
});

$('.address-content').on('click', ()=> {
    window.open("https://goo.gl/maps/1oBe3XaiihLqrvvN7", "_blank");
});