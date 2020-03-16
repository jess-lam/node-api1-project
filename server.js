const express = require('express');
const db = require('./data/db');


const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send('hello world!');
  });
  
  
  server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({success: false, err: "The users information could not be retrieved."});
    });
  })
  //Get endpoint works in Postman
  
  server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('body:', userInfo);
  
    db.insert(userInfo)
    .then((user) => {
      res.status(200).json({ success: true, user});
      })
      .catch((err) => {
        res.status(400).json({success: false, message: 'Please provide name and bio for the user'});
    });
  });

  //Unsure if Post endpoint in working Postman

  server.get('/api/users/:id', (req, res) => {
      db.findById(req.params.id)
      .then(user => {
          if(user) {
              res.status(200).json({success: true, user});
          } else {
              res.status(404).json({success: false, message: 'The user with the specified ID does not exist.'})
          }
      })
      .catch(err => {
          res.status(500).json({ success: false, message: 'The user information could not be retrieved.'})
      });
  });

  //Get user based on id works in Postman
  
  server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    console.log('yeah');
  
    db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: 'id not found'});
      }
    })
    .catch(err => {
      res.status(500).json({success: false, err});
    });
  });

  //Delete endpoint works in Postman

  server.put('/api/users/:id', (req, res) => {
      const { name, bio } = req.body;

      if (!name || !bio) {
          res.status(400).json({errorMessage: 'Please provide name and bio for the user.'});
      } else {
          db.update(req.params.id, req.body)
          .then(user => {
              if (user) {
                  res.status(200).json({success: true, user});
              } else {
                  res.status(404).json({success: false, message: 'The user with the specified ID does not exist.'});
              }
          })
          .catch(err => {
              res.status(500).json({success: false, errorMessage: 'The user information cannot be modified.'});
          })
      }
  })

  //Unsure if Put endpoint works on Postman

  module.exports = server; 