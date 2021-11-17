$('#universal-interpreter-link').on('click', ()=> {
    $('.universal-interpreter-content').addClass('show');
    $('.universal-interpreter').removeClass('collapsed');
    $(".universal-interpreter").get(0).scrollIntoView(true);
});