const express = require('express')
const bodyParser = require ('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require( 'cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : ' postgresql-elliptical-40499',
    user : 'postgres',
    password : '',
    database : 'smartbrain'
  }
});

//console.log(postgres.select('name', 'email', 'entries').from('users'));

const app= express();


app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res)=>{
  res.send('It is working!')
});

app.post('/signin', (req, res)=>{ signin.handleSignin(req, res, db, bcrypt)} );

app.post('/register',  (req, res)=>{ register.handleRegister(req, res, db, bcrypt)} );

app.get('/profile/:id', (req, res)=>{ profile.handleProfile(req, res, db)} );

app.put('/image', (req, res)=>{ image.handleImage(req, res, db ) });

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`App running on port ${process.env.PORT}`);
});
