let inventoryItems = {}
const host = "https://shopify-app.jerry-allan-akshay3096.workers.dev"

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
