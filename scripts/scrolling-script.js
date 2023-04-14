// create an array of the significant USC backgroundColors
let backgroundColors = [
    '#FFC72C',
    '#9D2235',
    '#FFFFFF',
    '#57068c'
];

let colors = [
    '#9D2235',
    '#FFC72C',
    '#9D2235',
    '#FFFFFF'
];

let dividerColors = [
    '#9D2235',
    '#9D2235',
    '#9D2235',
    '#9D2235'
];

// read ../content.json file
let CONTENT;
$.ajax({
    url: '../content.json',
    async: false,
    dataType: 'json',
    success: function (response) {
      CONTENT = response;
    }
  });

let bounceBack = false;

function createNewItem(id, data) {
    // Create the item element and set its ID and class
    let item = document.createElement('div');
    item.classList.add('item');
    item.setAttribute('id', id);
  
    // Create the item content element and append it to the item element
    let itemContent = document.createElement('div');
    itemContent.classList.add('item-content');
    item.appendChild(itemContent);
  
    // Create the degree and major text element and append it to the item content element
    let degreeMajorText = `${data['degree']} | ${data['major']}`;
    let itemContentText = document.createElement('p');
    let itemContentTextBold = document.createElement('div');
    itemContentTextBold.style.fontWeight = 'bold';
    itemContentTextBold.style.fontSize = 'x-large';
    itemContentTextBold.innerHTML = degreeMajorText;
    itemContentText.appendChild(itemContentTextBold);
    itemContent.appendChild(itemContentText);
  
    // Create the name and location text element and append it to the item content element
    let itemContentTextName = document.createElement('p');
    let itemContentTextNormal = document.createElement('div');
    itemContentTextNormal.style.fontSize = 'large';
    let itemContentTextNormalBold = document.createElement('span');
    itemContentTextNormalBold.style.fontWeight = 'bold';
    itemContentTextNormalBold.innerHTML = `${data['name']}`;
    let itemContentTextNormalNormal = document.createElement('span');
    itemContentTextNormalNormal.innerHTML = ` | ${data['location']}`;
    itemContentTextNormal.appendChild(itemContentTextNormalBold);
    itemContentTextNormal.appendChild(itemContentTextNormalNormal);
    itemContentTextName.appendChild(itemContentTextNormal);
    itemContent.appendChild(itemContentTextName);
  
    // Create the content text element and append it to the item content element
    let itemContentTextContent = document.createElement('p');
    itemContentTextContent.innerHTML = data['content'];
    itemContent.appendChild(itemContentTextContent);
  
    // Create the duration text element and append it to the item content element
    let itemContentTextDuration = document.createElement('p');
    itemContentTextDuration.style.fontSize = 'medium';
    itemContentTextDuration.style.fontStyle = 'italic';
    itemContentTextDuration.innerHTML = data['duration'];
    itemContent.appendChild(itemContentTextDuration);
  
    // Create the divider line element and append it to the item element
    let dividerLine = document.createElement('div');
    dividerLine.classList.add('divider-line');
    dividerLine.style.backgroundColor = data['divider-color'];
    item.appendChild(dividerLine);

    item.style.backgroundColor = data['background-color'];
    item.style.color = data['color'];
  
    // Return the item element
    return item;
} 
  
  

let slideContainers = document.getElementsByClassName('slides-container');

// iterate through slideContainers and assign random background-color to each
for(const element of slideContainers) {
    // find id of the element
    let id = $(element).parent().attr('id');
    // find the corresponding data in content.json
    let data = CONTENT[id];
    try {
        for(const key of Object.keys(data)) {
            let item = createNewItem(key, data[key]);
            $(element).append(item);
        }
        // make the first item selected
        $(element).find('.item').first().addClass('selected');

    } catch(err) {
        console.log(err);
    }
}

function itemOnHover(item) {
    // find parent slide-container
    let parent = $(item).parent()[0];
    // find all .item divs in parent
    let items = parent.getElementsByClassName('item');
    // iterate through .item divs and remove class 'selected'
    for(const element of items) {
        $(element).removeClass('selected');
    }
    $(item).addClass('selected');
    // get id of the .item element
    let id = $(item).attr('id');
    // get parent id of the .item element
    let parentId = $(item).parent().parent().attr('id');
    let listHeader = $(item).parent().parent().find('.list-header');
    listHeader.css('background-image', `url(${CONTENT[parentId][id]['picture']})`);
    listHeader.css('background-color', 'rgba(0, 0, 0, 0.5)');
    // find .divider-line element 
    let dividerColor = $(item).find('.divider-line').css('background-color');
    let bgColor = $(item).css('background-color');
    let color = $(item).css('color');
    // find parents data-target attribute
    let dataTarget = $(parent).attr('data-target');
    let dataTargetBgColor = dividerColor == bgColor ? dividerColor : color;
    let dataTargetColor = dividerColor == bgColor ? color : bgColor;
    // change the background-color of the data-target element
    $(dataTarget).css('background-color', dataTargetBgColor);
    $(dataTarget).find('.slides-arrow').css('background-color', dataTargetBgColor);
    let filterVal = generateFilter(dataTargetColor);
    $(dataTarget).find('img').css('filter', filterVal);
    $(dataTarget).find('.content').css('color', dataTargetColor);
    // get contribution data
    populateContributionData(dataTarget, $(item).parent(), id);
}

function itemAfterHover(item) {
    let listHeader = $(item).parent().parent().find('.list-header');
    listHeader.css('background-color', 'rgba(0, 0, 0, 1)');
    // let dataTarget = $(item).attr('data-target');
    // $(dataTarget).css('background-color', 'rgba(0, 0, 0, 1)');
    // $(dataTarget).find('.slides-arrow').css('background-color', 'rgba(0, 0, 0, 1)');
    // let filterVal = generateFilter('rgb(255, 255, 255)');
    // $(dataTarget).find('img').css('filter', filterVal);
}

// on hover, add class 'selected' to hovered item
$('.item').hover(function() {
    itemOnHover(this);
}, function() {
    // find parents data-target
    // let dataTarget = $(this).parent().attr('data-target');
    // let isExpanded = $(dataTarget).hasClass('selected');
    // if(!isExpanded) {
        // find parent's first .item child
        // let firstItem = $(this).parent().children()[0];
        // $(this).removeClass('selected');
        // $(firstItem).addClass('selected');
    //}
    // Do nothing
    itemAfterHover(this);
});

$('.slides-arrow').click(function() {
    // find parent .slides-data and add class 'selected' to it
    let parent = $(this).parent();
    // toggle class 'selected' on parent
    $(parent).toggleClass('selected');
});

let slidesContainers = $('.slides-container');

for(const element of slidesContainers) {

    $(element).hover(function() {
        // change opacity value to 0.6
        $('.blackout-screen').css('opacity', '0.7');
        $('.blackout-screen').css('z-index', '19');
        $(element).addClass('bring-to-front');
        // find data-target attribute of the element
        let dataTarget = $(element).attr('data-target');
        $(dataTarget).addClass('bring-to-front');
        $(dataTarget).addClass('hovered');
        $(element).parent().find('.list-header').addClass('bring-to-front');
    }, function() {
        // change opacity value to 0
        $('.blackout-screen').css('opacity', '0');
        $('.blackout-screen').css('z-index', '0');
        $(element).removeClass('bring-to-front');
        let dataTarget = $(element).attr('data-target');
        $(dataTarget).removeClass('bring-to-front');
        $(dataTarget).removeClass('hovered');
        $(element).parent().find('.list-header').removeClass('bring-to-front');
    });
    setupContributionContainer(element);
    setDefaultPullDownColor(element);
};

function setupContributionContainer(container) {
    // find data-target attribute of the element
    let dataTarget = $(container).attr('data-target');
    // find .content
    let content = $(dataTarget).find('.content');
    let header = document.createElement('h1');
    header.innerHTML = 'Contributions';
    content.append(header);
    let div = document.createElement('div');
    content.append(div);
}

function setDefaultPullDownColor(container) {
    // find data-target attribute of the element
    let dataTarget = $(container).attr('data-target');
    let dataTargetDividerColor = $(container).find('.item').first().find('.divider-line').css('background-color');
    let dataTargetColor = $(container).find('.item').first().css('color');
    let dataTargetBgColor = $(container).find('.item').first().css('background-color');
    let targetColor = dataTargetDividerColor == dataTargetBgColor ? dataTargetColor : dataTargetBgColor;
    let targetBgColor = dataTargetDividerColor == dataTargetBgColor ? dataTargetDividerColor : dataTargetColor;
    // change the background-color of the data-target element
    $(dataTarget).css('background-color', targetBgColor);
    $(dataTarget).find('.slides-arrow').css('background-color', targetBgColor);
    let filterVal = generateFilter(targetColor);
    $(dataTarget).find('img').css('filter', filterVal);
    $(dataTarget).find('.content').css('color', targetColor);

    populateContributionData(dataTarget, container, $(container).find('.item').first().attr('id'));
    
}

function populateContributionData(dataTarget, container, itemId) {
    //set default content
    let content = CONTENT[$(container).parent().attr('id')][itemId];
    // delete all children of $(dataTarget).find('.content div')
    $(dataTarget).find('.content div').empty();
    // create ul and populate with li from content['contributions'] array. Append this to $(dataTarget).find('.content div')
    let ul = document.createElement('ul');
    if(content['contributions'] && content['contributions'].length != 0) {
        for(const item of content['contributions']) {
            let li = document.createElement('li');
            $(li).text(item);
            $(ul).append(li);
        }
        $(dataTarget).find('.content div').append(ul);
    }
    // create a ul without markers and append every link from content['links'] array to $(dataTarget).find('.content div')
    if(content['links'] && content['links'].length != 0) {
        let ul2 = document.createElement('ul');
        $(ul2).css('list-style-type', 'none');
        for(const item of content['links']) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            $(a).attr('href', item['url']);
            $(a).attr('target', '_blank');
            $(a).text(item['text']);
            $(li).append(a);
            $(ul2).append(li);
        }
        $(dataTarget).find('.content div').append(ul2);
    }
    // create a flexbox div and append every item from content['skills'] array to it. Append the class .skill to it
    if(content['skills'] && content['skills'].length != 0) {
        let div = document.createElement('div');
        $(div).addClass('skill-container');
        for(const item of content['skills']) {
            let skill = document.createElement('div');
            $(skill).addClass('skill');
            $(skill).text(item);
            $(div).append(skill);
        }
        // add h1 tag with text 'Skills'
        let h1 = document.createElement('h1');
        $(h1).text('Skills');
        $(dataTarget).find('.content div').append(h1);
        $(dataTarget).find('.content div').append(div);
    }
}

