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
  .catch(err => {
    res.status(500).json({success: false, err: "The users information could not be retrieved."});
  });
})

server.post('/users', (req, res) => {
  const userInfo = req.body;
  console.log('body:', userInfo);

  db.add(userInfo)
  .then((user) => {
    res.status(201).json({ success: true, user});
    .catch((err) => {
      res.status(500.json({sucess:false, err}));
    });
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = rq.params;
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


