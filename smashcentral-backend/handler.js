'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Match = require('./models/Match');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Match.create(JSON.parse(event.body))
    )
    .then(match => callback(null, {
      statusCode: 200,
      body: JSON.stringify(match)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not create the match.'
    }));
}

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Match.findById(event.pathParameters.id)
    )
    .then(match => callback(null, {
      statusCode: 200,
      body: JSON.stringify(match)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the match.'
    }));
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Match.find()
    )
    .then(matches => callback(null, {
      statusCode: 200,
      body: JSON.stringify(matches)
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the matches.'
    }))
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      Match.findByIdAndRemove(event.pathParameters.id)
    )
    .then(match => callback(null, {
      statusCode: 200,
      body: JSON.stringify({ message: 'Removed match with id: ' + match._id, match: match })
    }))
    .catch(err => callback(null, {
      statusCode: err.statusCode || 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Could not fetch the matches.'
    }));
};