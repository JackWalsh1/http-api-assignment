const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const routes = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getIndexCSS,
  //   '/': htmlHandler.getIndex,
  //   '/': htmlHandler.getIndex,
  //   '/': htmlHandler.getIndex,
  //   '/': htmlHandler.getIndex,
  //   '/': htmlHandler.getIndex,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const params = query.parse(parsedUrl.query);

  if (routes[parsedUrl.pathname]) {
    routes[parsedUrl.pathname](request, response, params);
  } else {
    routes.notFound(request, response, params);
  }
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
