var url = 'https://epic.gsfc.nasa.gov/api/natural/date/2022-01-13';

let itemLikes = {}

fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
      var firstLoad = true;
      if(localStorage.getItem('like-data')) {
        firstLoad = false;
      }
    for(var item of data) {
        var url = `https://epic.gsfc.nasa.gov/archive/natural/2022/01/13/png/${item.image}.png?api_key=PMn6LoxQVtRWcd3P4817c3kkgMj2Kp64sudGFLI5`;
        var curHTML = $('.images').html();
        curHTML +=  `<div class="image-card"><img src="${url}"><div class="title">${item.identifier}</div><hr><div class="caption">${item.caption}</div><div class="date">${item.date}</div><div class="animate-like"><img src="global/icons/bootstrap-icons/heart-fill.svg"/></div><div class="buttons"><img id="${item.identifier}" src="global/icons/bootstrap-icons/heart-fill.svg"/></div></div>`;
        $('.images').html(curHTML);
        if(firstLoad) {
            itemLikes[item.identifier] = {'like': false};
        }
    }
    if(!firstLoad) {
        itemLikes = JSON.parse(localStorage.getItem('like-data'));
        for(item in itemLikes) {
            if(itemLikes[item]['like']) {
                $(`#${item}`).addClass('liked');
            }
        }
    }
    $('.image-card > .buttons > img').on('click', (event)=> {
        var temp = $(event.target).parent().siblings('.title').html();
        itemLikes[temp]['like'] = !itemLikes[temp]['like'];
        itemLikes[temp]['like'] ? $(event.target).addClass('liked') : $(event.target).removeClass('liked');
        if(itemLikes[temp]['like']) {
            $(event.target).parent().siblings('.animate-like').addClass('show');
            setTimeout(()=> {
                $(event.target).parent().siblings('.animate-like').removeClass('show');
            }, 1000);
        }
        localStorage.setItem('like-data', JSON.stringify(itemLikes));
    });
  }).catch(function(error) {
    console.log(error);
  });
