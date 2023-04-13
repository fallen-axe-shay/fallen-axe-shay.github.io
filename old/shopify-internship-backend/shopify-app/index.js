addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let response;
  if(request.url.includes('get-items')) {
    response = await getData(request);
  } else if(request.url.includes('add-item')) {
    response = await addData(request);
  } else if(request.url.includes('delete-item')) {
    response = await deleteData(request);
  } else if(request.url.includes('edit-item')) {
    response = await updateData(request);
  } else {
    response = new Response("Page not found", { status: 404 , headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }});
  }
  return response;
}

async function getData(request) {
  let items = await Items.get('items');
  if(items==null) {
    return new Response(JSON.stringify({}), {status: 200, headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }});
  }
  return new Response(items, {status: 200, headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  }});
}

async function updateData(request) {
  data = await request.json();
  response = {
    message: "Item successfully deleted"
  }
  try {
    let items = await Items.get('items');
    items = JSON.parse(items);
    var id = data['id'];
    delete data['id'];
    items[id] = data;
    await Items.put("items", JSON.stringify(items));
    return new Response(JSON.stringify(items), {status: 200, headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }});
  } catch(exception) {
    response['message'] = exception.toString();
  }
  return new Response(JSON.stringify(response), {status: 200, headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  }});
}

async function deleteData(request) {
  data = await request.json();
  response = {
    message: "Item successfully deleted"
  }
  try {
    let items = await Items.get('items');
    items = JSON.parse(items);
    delete items[data['name']];
    await Items.put("items", JSON.stringify(items));
    return new Response(JSON.stringify(items), {status: 200, headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }});
  } catch(exception) {
    response['message'] = exception.toString();
  }
  return new Response(JSON.stringify(response), {status: 200, headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  }});
}

async function addData(request) {
  data = await request.json();
  response = {
    message: "Item successfully added"
  }
  try {
    let items = await Items.get('items');
    if(items===null) {
      items = JSON.stringify({});
    }
    var ID = function () {
      // Math.random should be unique because of its seeding algorithm.
      // Convert it to base 36 (numbers + letters), and grab the first 9 characters
      // after the decimal.
      return Math.random().toString(36).substr(2, 6);
    };
    items = JSON.parse(items);
    items[ID()] = data;
    await Items.put("items", JSON.stringify(items));
    return new Response(JSON.stringify(items), {status: 200, headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    }});
  } catch(exception) {
    response['message'] = exception.toString();
  }
  return new Response(JSON.stringify(response), {status: 200, headers: {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  }});
}
