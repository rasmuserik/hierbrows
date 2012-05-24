(function() {
    sampleData = sampleData.map(function(elem) {return elem.split("/")});
    var table = {};

    function insertDataIntoTable(data) {
        var path = table;
        for(var i = 0; i < data.length - 1; ++i) {
            var key = data[i];
            if(!path[key]) {
                path[key] = {};
            }
            path = path[key];
        }
        path[data[data.length -1]] = data.join('.');
    }
    sampleData.forEach(insertDataIntoTable);

    function buildTree(obj) {
        if(typeof obj === 'string') {
            return obj;
        }
        var result = [];
        for(var key in obj) {
            result.push(buildTree(obj[key]));
        }
        return result
    }
    sampleData = buildTree(table);
})();
