/**
 * Primary File for All Api
 */

 // Dependencies
 var http = require('http');
 var url = require('url');
 var stringDecoder = require('string_decoder').StringDecoder;
 var config = require('./lib/config');
 var _data = require('./lib/data');
 var handlers = require('./lib/handlers');
 var helpers = require('./lib/helpers');

 //server should response with some string every time
 var server = http.createServer(function(req,res){

    // Get the url and parse it 
    var parsedURl = url.parse(req.url,true);


    // Get the Path
   var path = parsedURl.pathname;
   var trimmedPath = path.replace(/^\/+|\/+$/g,''); // repacing slaces(/) forward and bcakward from URL

   // Get the query string as an object
   var queryobject = parsedURl.query;

   // GET the HTTP method
    var method = req.method.toLowerCase();

    //Get the header as an object
    var headers = req.headers;

    //Get the payload if any
    var decoder = new stringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data){
        buffer += decoder.write(data);
    });
    req.on('end',function(){
        buffer += decoder.end();

    // Choose handler
    var choosehandlers = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Data
    var data = {
        "method":method,
        "payload":helpers.parseJsontoObject(buffer),
        "headers":headers,
        "path":trimmedPath,
        "query":queryobject
    }

    // Call the choosehanders
    choosehandlers(data,function(statuscode,payload){
        //Default StatusCode and Payload
        statuscode = typeof(statuscode) == 'number' ? statuscode :200;
        payload = typeof(payload) == 'object' ? payload :{};
  // Send the response
  res.setHeader('Content-Type','application/json');
  res.writeHead(statuscode);
  res.end(JSON.stringify(payload));

  // Log the request Path
//   console.log("requesed path is "+trimmedPath+" Method is "+ method +" query object is ",queryobject);
//   console.log("headers is ", headers);
//   console.log("payload is ",buffer);
//   console.log("statuscode is ",statuscode,payload);
    });
 })
})

 //start the server and listen on  port 3000
server.listen(config.port,(req,res)=>{
    console.log("server is running on "+config.port+" Env is "+config.envName);
});


// Define a request router
var router={
    'sample': handlers.sample,
    'user' : handlers.user,
    'tokens':handlers.tokens,
    'checks':handlers.checks
};


