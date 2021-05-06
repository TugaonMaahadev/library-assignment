const express = require('express');
const insert = require('./routes/insert');
const fetch =require('./routes/fetch')
const del=require('./routes/delete')
const update =require('./routes/update')
const app = express();
const port = process.env.PORT | 8080;
app.use(express.json({}));

app.get('/', (req, res) => {
  res.send({Message: 'App Working'});
});
app.post('/register', insert.register);
app.post('/login',fetch.login);
app.post('/createUser',insert.createUser);
app.post('/createBook',insert.createBook);
app.post('/getBooks',fetch.getBooks);
app.post('/assignBooks',insert.assignBooks);
app.post('/updateBook',update.updateBook);
app.post('/deleteBook',del.deleteBook);
app.post('/updateUser',update.updateUser);
app.post('/deleteUser',del.deleteUser)
app.listen(port, () => {
  console.log('Server listening on port', port);
});
