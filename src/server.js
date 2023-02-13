const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const statusHandler = require('./statusResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const routes = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getIndexCSS,
    '/success': statusHandler.success,
    '/badRequest': statusHandler.badRequest,
    '/unauthorized': statusHandler.unauthorized,
    '/forbidden': statusHandler.forbidden,
    '/internal': statusHandler.internal,
    '/notImplemented': statusHandler.notImplemented,
    notFound: statusHandler.notFound,
  },
  HEAD: {
    '/success': statusHandler.successMeta,
    '/badRequest': statusHandler.badRequestMeta,
    '/unauthorized': statusHandler.unauthorizedMeta,
    '/forbidden': statusHandler.forbiddenMeta,
    '/internal': statusHandler.internalMeta,
    '/notImplemented': statusHandler.notImplementedMeta,
    notFound: statusHandler.notFoundMeta,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedUrl.query);

  if (!routes[request.method]) {
    return routes.HEAD.notFound(request, response, acceptedTypes);
  }

  if (routes[request.method][parsedUrl.pathname]) {
    return routes[request.method][parsedUrl.pathname](request, response, acceptedTypes, params);
  }
  return routes[request.method].notFound(request, response, acceptedTypes);
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
