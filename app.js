const express = require('express');

const mongoose = require('mongoose');

const body_parser = require('body-parser');

const app = express();

if(process.env.ENV === 'Test'){
  console.log("This is Test");
  mongoose.connect('mongodb://localhost/bookApi_Test');

}
else{
  console.log("This is actual Application")
  mongoose.connect('mongodb://localhost/bookApi');

}

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/bookApi');

const Book = require('./models/bookModel');

const bookRouter = require('./routers/bookRouter')(Book)

app.use(body_parser.urlencoded({extended : true}));
app.use(body_parser.json());
app.use('/api',bookRouter);
app.get('/', (req, res) => {
  res.send('Welcome to RestApi');
});

app.server = app.listen(port, () => {
  console.log(`running on port  ${port}`);
});

module.exports = app;