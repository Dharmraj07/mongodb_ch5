const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');
//const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('64b805c4eab7237609a3687f')
//     .then(user => {
//       req.user =new  User(user.name,user.email,user.cart,user._id);
//       next();
//     })
//     .catch(err => console.log(err));
//  // next();
// });
app.use((req, res, next) => {
  // User.findById('64b805c4eab7237609a3687f')
  User.findById('64cdc51e1302c5dc1acfeeda')

  
    .then(user => {
      if (user) {
        req.user = new User(user.name, user.email, user.cart, user._id);
      }
      next();
    })
    .catch(err => console.log(err));
});


app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
 // console.log(client);
  app.listen(3000);
});
