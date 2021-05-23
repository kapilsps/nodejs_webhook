var express = require('express');
var router = express.Router();
const { User } = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.findAll()
  .then(result => {
    res.render('list-user', { title: 'Express', data: result });
  })
  .catch(err => {
    req.flash('fail', err.message);
    res.render('list-user', { title: 'Express'});
  });
});

router.get('/create', (req, res, next) => {
  res.render('create-user', { title: 'Express' });
});

router.post('/create', (req, res, next) => {
    User.create({
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      email: req.body.email
    })
    .then(result => {
      if (result !== null) {
        req.flash('success', 'User Registered successfully.')
        return res.redirect('/users/');
      }
      req.flash('fail', 'Something went wrong please try again')
      return res.redirect('/users/create');
    })
    .catch(err => {
      req.flash('fail', err.message)
      return res.redirect('/users/create');
    });
});


router.get('/update-user/:id', (req, res, next) => {
    User.findByPk(req.params.id)
    .then(result => {
        res.render('update',{
          title: 'Express',
          data: result
        });
    })
    .catch(err => {
        req.flash('fail', err.message);
        res.redirect('/users');
    });
});

router.post('/update/:id', (req, res, next) => {
  User.update({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email
  },{
    where:{
      id:req.params.id
    }
  })
  .then((result) => {
    req.flash('success','User updated successfully');
    res.redirect('/users');
  })
  .catch(err => {
    req.flash('fail', err.message);
    res.redirect('/users');
  });
});

router.get('/delete-user/:id', (req, res, next) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(result => {
    req.flash('success', 'user deleted successfully');
    res.redirect('/users');
  })
  .catch(err => {
    req.flash('fail', err.message);
    res.redirect('/users');
  });
});

module.exports = router;
