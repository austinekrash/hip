const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');

const users = require('./routes/api/user');
const projects = require('./routes/api/project')

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connecting to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/projects', projects);

const port = process.env.PORT || 3000; 

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server up and running on port ${port} !`));