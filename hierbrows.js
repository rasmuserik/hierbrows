(function(){
// # Model
function modelFromList(list) {
    var result = Object.create(model);
    if(typeof list === "string") {
        result.html = list;
    } else {
        result.children = list.map(modelFromList);
    }
    return result;
}
var model = {fromList: modelFromList};

// # FullView
function modelToHtml(model) {
    for(var i = 0; i < model.children.length; ++i) {
        var childNode = modelToHtml(model.children[i]);
        elem.appendChild(childNode);
    }
    return elem;
}

// # PartialView
var currentVisible = [];
var viewWidth = 980;
var marginLeft = 2;
var childSpace = 2;
var marginRight = 2;
var marginTop = 2;
var marginBottom = 2;
var textHeight = 2;


function widthByDepth(depth) {
    return viewWidth - depth * (marginLeft + marginRight) + 'px';
}

function calcMaxHeight(node, depth, elem) {
    if(node.children) {
        var height = marginTop + marginBottom + (node.children.length - 1) * childSpace;
        for(var i in node.children) {
            calcMaxHeight(node.children[i], depth+1, elem);
            height += node.children[i].height;
        }
        node.maxHeight = height;
    } else {
        elem.innerHTML = node.html;
        style = elem.style;
        style.position = 'absolute';
        style.width = widthByDepth(depth);
        node.maxHeight = elem.offsetHeight;
    }
}

function renderNode(node, pos, height, depth) {
    var style = node.style;
    if(!style) {
        var elem = document.createElement('div');
        if(node.html) { 
            elem.innerHTML = node.html;
        }
        node.elem = elem;
        style = elem.style;
        node.style = style;
        style.position = 'absolute';
        document.body.appendChild(elem);
    }
    style.top = pos + 'px';
    style.left = depth * marginLeft + 'px';
    style.width = viewWidth - depth * (marginLeft + marginRight) + 'px';
    style.height = height + 'px';
}

function getN(arr, n) {
    if(n < 1) { return []; }
    if(arr.length <= n) { return arr; }
    var result = [arr[0]];
    if(n == 1) { return result; }
    n -= 2;
    function acc(start, end, n) {
        if(n < 1) { return; };
        --n;
        var pos = (start + end) / 2 | 0;
        var cut = n >> 1;
        acc(start, pos, n - cut);
        result.push(arr[pos]);
        acc(pos, end, cut);
    }
    acc(0, arr.length - 1, n);
    result.push(arr[arr.length -1]);
    return result;
}

for(var i = 0; i < 10; ++i) {
     console.log(getN([1,2,3,4,5,6,7,8,9,0], i));
}


// # Control
// # Experiments
console.log('here');
node = model.fromList(sampleData);

if(false && !node.maxHeight) {
    var elem = document.createElement('div');
    document.body.appendChild(elem);
    calcMaxHeight(node, 0, elem);
    document.body.removeChild(elem);
}
renderNode(node, 0, 500, 0);
console.log(node);

})();
