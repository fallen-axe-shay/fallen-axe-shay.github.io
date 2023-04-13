let personElement = $('.person-container:not(.display-none)');
let personElementHeight = personElement.height();
//listen for scroll and get current scroll position
$(window).scroll(function() {
    let scrollPos = $(window).scrollTop();
    //check if scroll position is greater than 100px and if the person element is not visible
    if (scrollPos > personElementHeight) {
        togglePersonInfo(true);
    } else {
        togglePersonInfo(false);
    }
});

function togglePersonInfo(makeSmall) {
    if(makeSmall) {
        // $('.person-container.big').addClass('display-none');
        $('.person-container:not(.big)').removeClass('display-none')
    } else {
        // $('.person-container.big').removeClass('display-none');
        $('.person-container:not(.big)').addClass('display-none');
    }
}

/* add scroll listener and change opacity only on mobile screens with max-width 1000px*/
if ($(window).width() <= 1000) {
    $(window).scroll(function() {
        $('.blackout-screen').css('opacity', '0');
        $('.blackout-screen').css('z-index', '0');
    });
}

