const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');
const User = require('./models/user')

require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const user = require('./models/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65a3dd0c9ac1a9b7bb27be33')
    .then(user => {
      req.user =user 
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);
// const PORT= process.env.PORT || 4000

async function server(){
  try {
    await mongoose.connect('mongodb+srv://udhayasurya138:MHE9hGu78Chhv0pb@cluster0.morce5g.mongodb.net/')
    const Olduser =await User.findOne()
    if(!Olduser){
      const user = new User({
        name: 'Surya',
        email: 'surya@gmail.com',
        cart: {
          items: []
        }
      })
      user.save()
    }
      app.listen(3000,()=>{
      console.log(`Server listening on 3000`)
      })
  } catch (error) {
    console.log(error)
  }
}

server();





