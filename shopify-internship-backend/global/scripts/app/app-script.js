let inventoryItems = {}
const host = "https://shopify-app.jerry-allan-akshay3096.workers.dev"

// const inventoryRef = window.ref(window.database, 'items/');
// onValue(inventoryRef, (snapshot) => {
//   const data = snapshot.val();
//   console.log(data);
// });

// fetch(url).then(function(response) {
//     return response.json();
//   }).then(function(data) {
//       var firstLoad = true;
//       if(localStorage.getItem('like-data')) {
//         firstLoad = false;
//       }
//     for(var item of data) {
//         var url = `https://epic.gsfc.nasa.gov/archive/natural/2022/01/13/png/${item.image}.png?api_key=PMn6LoxQVtRWcd3P4817c3kkgMj2Kp64sudGFLI5`;
//         var curHTML = $('.images').html();
//         // curHTML +=  `<div class="image-card"><img src="${url}"><div class="title">${item.identifier}</div><hr><div class="caption">${item.caption}</div><div class="date">${item.date}</div><div class="animate-like"><img src="global/icons/bootstrap-icons/heart-fill.svg"/></div><div class="buttons"><img id="${item.identifier}" src="global/icons/bootstrap-icons/heart-fill.svg"/></div></div>`;
//         // $('.images').html(curHTML);
//         // if(firstLoad) {
//         //     itemLikes[item.identifier] = {'like': false};
//         // }
//     }
//     if(!firstLoad) {
//         itemLikes = JSON.parse(localStorage.getItem('like-data'));
//         for(item in itemLikes) {
//             if(itemLikes[item]['like']) {
//                 $(`#${item}`).addClass('liked');
//             }
//         }
//     }
//     $('.image-card > .buttons > img').on('click', (event)=> {
//         var temp = $(event.target).parent().siblings('.title').html();
//         itemLikes[temp]['like'] = !itemLikes[temp]['like'];
//         itemLikes[temp]['like'] ? $(event.target).addClass('liked') : $(event.target).removeClass('liked');
//         if(itemLikes[temp]['like']) {
//             $(event.target).parent().siblings('.animate-like').addClass('show');
//             setTimeout(()=> {
//                 $(event.target).parent().siblings('.animate-like').removeClass('show');
//             }, 1000);
//         }
//         localStorage.setItem('like-data', JSON.stringify(itemLikes));
//     });
//   }).catch(function(error) {
//     console.log(error);
//   });

getItems();

$('#export-to-csv').on('click', (event)=> {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "uid,item name,description,quantity,location\r\n";
    for(var item in inventoryItems) {
        csvContent += `${item},${inventoryItems[item]['name']},${inventoryItems[item]['desc']},${inventoryItems[item]['qty']},${inventoryItems[item]['loc']}\r\n`;
    }
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
});

$('#item-edit-btn').on('click', (event) => {
    var url = host + "/edit-item";
            var body = {
                id: curItem,
                name: $('#edit-name').val(),
                desc: $('#edit-desc').val(),
                qty: $('#edit-quantity').val(),
                loc: $('#edit-location>option:selected').val()
            }

            const init = {
                method: "POST",
                body: JSON.stringify(body)
            }
            fetch(url, init).then(function(response) {
                return response.json();
              }).then((data)=>{getItems()}).catch((error)=>{console.log(error)});
    $('#editModal').modal('toggle');
});


$('#item-add-btn').on('click', (event) => {
            const url = host + "/add-item"
            const body = {
                name: $('#item-name').val(),
                desc: $('#item-desc').val(),
                qty: $('#item-quantity').val(),
                loc: $('#item-location>option:selected').val()
            }
            const init = {
              body: JSON.stringify(body),
              method: "POST"
            }
            fetch(url, init).then(function(response) {
                return response.json();
              }).then(function(data) {
                  getItems();
              }).catch(function(error) {
                console.log(error);
              });
    $('#addModal').modal('toggle');
});

function getItems() {
    var url = host + "/get-items";
    const init = {
        method: "GET"
      }
      fetch(url, init).then(function(response) {
        return response.json();
      }).then(function(data) {
          var content = "";
          inventoryItems = data;
          for(var item in data) {
              content += `<tr><th scope="row">${item}</th><td>${data[item]['name']}</td><td>${data[item]['desc']}</td><td>${data[item]['qty']}</td><td>${data[item]['loc']}</td><td><div class="d-flex"><button type="button" class="item-edit btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button><button type="button" class="item-delete btn btn-outline-danger">Delete</button></div></td></tr>`;
          }
          $('#inventory-content').html(content);
          $('.item-edit').on('click', (event)=> {
            var temp = $(event.target).parent().parent().siblings('th');
            var itemID = $(temp).html();
          });
          $('.item-delete').on('click', (event)=> {
            var temp = $(event.target).parent().parent().siblings('th');
            var itemID = $(temp).html();
            var url = host + "/delete-item";
            const init = {
                method: "POST",
                body: JSON.stringify({name: itemID})
            }
            fetch(url, init).then(function(response) {
                return response.json();
              }).then((data)=>{getItems()}).catch((error)=>{console.log(error)});
          });
          $('.item-edit').on('click', (event)=> {
            var temp = $(event.target).parent().parent().siblings('th');
            var itemID = $(temp).html();
            curItem = itemID;
            temp = $('#edit-location>option');
            for(var item of temp) {
                $(item).attr('selected', ($(item).val()==inventoryItems[curItem]['loc']));
            }
            $('#edit-name').val(inventoryItems[curItem]['name']);
            $('#edit-desc').val(inventoryItems[curItem]['desc']);
            $('#edit-quantity').val(inventoryItems[curItem]['qty']); 
          });
      }).catch(function(error) {
        console.log(error);
      });
}

var curItem;
