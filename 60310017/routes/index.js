var express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../config/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('index');
});

router.post('/add',[
  check("username","Please Input your username").not().isEmpty(),
  check("password","Please Input your password").not().isEmpty()
], function(req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  if (!result.isEmpty()){
      res.render('index',{errors:errors});
  }else{
      let user = {
      
          "username": req.body.username , 
          "password": req.body.password
      }
      let sql = ' INSERT INTO user SET ? '
      db.query(sql, user, (error, results, fields)=>{
          console.log(error)
          if(error) {
              throw error
          }   
          console.log(results.insertId)
          console.log(results)
          console.log(fields)
          res.json(results)
      })
  }}, function(err,blog){
      if(err){
          res.send(err);
      }else{
          req.flash("error","บันทึกข้อมูลเรียบร้อยแล้ว");
          res.location('/index/');
          res.redirect('/index/');
      }
  }
);

module.exports = router;
