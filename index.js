const db = require('./data/db');

const express = require('express');

const server = express();

server.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('*** Server listening on port 4000 ***');
});


server.use(express.json());


server. get('/', (req, res) => {
  res.send('hello world!');
});


server.get('/users', (req, res) => {
  db.find()
  .then(users => {
    res.status(200).json(users);
  })
  .catch(errorMessage => {
    res.status(500).json({sucess: false, message: "The users information could not be retrieved."});
  });
})


