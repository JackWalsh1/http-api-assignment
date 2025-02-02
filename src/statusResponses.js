// function to send response
let responseObj;

const respond = (request, response, status, type, content) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const respondMeta = (request, response, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.end();
};

const success = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    responseObj = '<response>';
    responseObj = `${responseObj} <message>This is a successful response.</message>`;
    responseObj = `${responseObj} </response>`;
  } else { // must be json / defaulting
    const responseJSON = {
      message: 'This is a successful response.',
    };
    responseObj = JSON.stringify(responseJSON);
  }
  respond(request, response, 200, acceptedTypes[0], responseObj);
};

const successMeta = (request, response, acceptedTypes) => {
  respond(request, response, 200, acceptedTypes[0]);
};

const badRequest = (request, response, acceptedTypes, params) => {
  let statusCode;
  let message;

  if (!params.valid || params.valid !== 'true') {
    message = 'Missing valid query parameter set to true';
    statusCode = 400;
  } else {
    message = 'This is a valid response.';
    statusCode = 200;
  }

  if (acceptedTypes[0] === 'text/xml') {
    responseObj = '<response>';
    responseObj = `${responseObj} <message>${message}</message>`;
    if (statusCode === 400) {
      responseObj = `${responseObj} <id>badRequest</id>`;
    }
    responseObj = `${responseObj} </response>`;
  } else { // must be json / defaulting
    const responseJSON = {
      message,
    };
    if (statusCode === 400) {
      responseJSON.id = 'badRequest';
    }
    responseObj = JSON.stringify(responseJSON);
  }
  respond(request, response, statusCode, acceptedTypes[0], responseObj);
};

const badRequestMeta = (request, response, acceptedTypes, params) => {
  respond(request, response, (!params.valid || params.valid !== 'true' ? 400 : 200), acceptedTypes[0]);
};

const unauthorized = (request, response, acceptedTypes, params) => {
  let statusCode;
  let message;

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    message = 'Missing loggedIn query parameter set to yes';
    statusCode = 401;
  } else {
    message = 'This is a valid response.';
    statusCode = 200;
  }

  if (acceptedTypes[0] === 'text/xml') {
    responseObj = '<response>';
    responseObj = `${responseObj} <message>${message}</message>`;
    if (statusCode === 401) {
      responseObj = `${responseObj} <id>unauthorized</id>`;
    }
    responseObj = `${responseObj} </response>`;
  } else { // must be json / defaulting
    const responseJSON = {
      message,
    };
    if (statusCode === 401) {
      responseJSON.id = 'unauthorized';
    }
    responseObj = JSON.stringify(responseJSON);
  }
  respond(request, response, statusCode, acceptedTypes[0], responseObj);
};

const unauthorizedMeta = (request, response, acceptedTypes, params) => {
  respond(request, response, (!params.loggedIn || params.loggedIn !== 'yes' ? 401 : 200), acceptedTypes[0]);
};

const forbidden = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    responseObj = '<response>';
    responseObj = `${responseObj} <message>You do not have access to this content.</message>`;
    responseObj = `${responseObj} <id>forbidden</id>`;
    responseObj = `${responseObj} </response>`;
  } else { // must be json / defaulting
    const responseJSON = {
      message: 'You do not have access to this content',
      id: 'forbidden',
    };
    responseObj = JSON.stringify(responseJSON);
  }
  respond(request, response, 403, acceptedTypes[0], responseObj);
};

const forbiddenMeta = (request, response, acceptedTypes) => {
  respond(request, response, 403, acceptedTypes[0]);
};

const internal = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    responseObj = '<response>';
    responseObj = `${responseObj} <message>Internal Server Error. Something went wrong.</message>`;
    responseObj = `${responseObj} <id>internalError</id>`;
    responseObj = `${responseObj} </response>`;
  } else { // must be json / defaulting
    const responseJSON = {
      message: 'Internal Server Error. Something went wrong.',
      id: 'internalError',
    };
    responseObj = JSON.stringify(responseJSON);
  }
  respond(request, response, 500, acceptedTypes[0], responseObj);
};

const internalMeta = (request, response, acceptedTypes) => {
  respond(request, response, 500, acceptedTypes[0]);
};

const notImplemented = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    responseObj = '<response>';
    responseObj = `${responseObj} <message>A get request for this page has not been implemented yet. Check again later for updated content.</message>`;
    responseObj = `${responseObj} <id>notImplemented</id>`;
    responseObj = `${responseObj} </response>`;
  } else { // must be json / defaulting
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
      id: 'notImplemented',
    };
    responseObj = JSON.stringify(responseJSON);
  }
  respond(request, response, 501, acceptedTypes[0], responseObj);
};

const notImplementedMeta = (request, response, acceptedTypes) => {
  respond(request, response, 501, acceptedTypes[0]);
};

const notFound = (request, response, acceptedTypes) => {
  // error message with a description and consistent error id

  if (acceptedTypes[0] === 'text/xml') {
    responseObj = '<response>';
    responseObj = `${responseObj} <message>The page you are looking for was not found.</message>`;
    responseObj = `${responseObj} <id>notFound</id>`;
    responseObj = `${responseObj} </response>`;
  } else { // must be json / defaulting
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };

    responseObj = JSON.stringify(responseJSON);
  }

  // return obj with
  return respond(request, response, 404, acceptedTypes[0], responseObj);
};

const notFoundMeta = (request, response, acceptedTypes) => {
  respondMeta(request, response, 404, acceptedTypes[0]);
};

module.exports = {
  success,
  successMeta,
  notFound,
  notFoundMeta,
  badRequest,
  badRequestMeta,
  unauthorized,
  unauthorizedMeta,
  forbidden,
  forbiddenMeta,
  internal,
  internalMeta,
  notImplemented,
  notImplementedMeta,
};
