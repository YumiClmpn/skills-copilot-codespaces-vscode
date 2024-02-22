// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];
var server = http.createServer(function(request, response){
    // Parse url
    var parseObj = url.parse(request.url, true);
    var pathName = parseObj.pathname;
    if(pathName === '/'){
        fs.readFile('./views/index.html', function(err, data){
            if(err){
                return response.end('404 Not Found');
            }
            response.end(data);
        });
    }else if(pathName === '/post'){
        fs.readFile('./views/post.html', function(err, data){
            if(err){
                return response.end('404 Not Found');
            }
            response.end(data);
        });
    }else if(pathName.indexOf('/public/') === 0){
        fs.readFile('.' + pathName, function(err, data){
            if(err){
                return response.end('404 Not Found');
            }
            response.end(data);
        });
    }else if(pathName === '/comments'){
        var comment = parseObj.query;
        comment.dateTime = '2019-5-4 17:21:00';
        comments.push(comment);
        response.statusCode = 302;
        response.setHeader('Location', '/');
        response.end();
    }else{
        fs.readFile('./views/404.html', function(err, data){
            if(err){
                return response.end('404 Not Found');
            }
            response.end(data);
        });
    }
});
server.listen(3000, function(){
    console.log('Server is running...');
});