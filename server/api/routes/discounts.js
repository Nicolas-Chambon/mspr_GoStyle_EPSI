// simple-api/api/routes/users.js
const express = require("express");
const router = express.Router();
const database = require("../../database");

//Get discount by id
router.get('/id/:id', (req, res) => {
  database
    .select()
    .where("discount_id", "=", req.params.id)
    .from("discount")
    .then(data => {
      if (data.length <= 0) {
        res.status(400)
          .json({
            status: 'fail',
            message: 'Invalid discount ID'
          });
      }
      else {
        res.status(200)
          .json({
            status: 'success',
            data: data[0],
            message: 'Retrieved ONE discount'
          });
      }
    })
    .catch(err => {
      res.status(400).json("Bad request");
    });
});

//Get discount by link
router.get('/link/:link', (req, res) => {
  database
    .select("discount_id", "discount_name", "discount_brand", "discount_description")
    .where("discount_link", "=", req.params.link)
    .from("discount")
    .then(data => {
      if (data.length <= 0) {
        res.status(400)
          .json({
            status: 'fail',
            message: 'Invalid discount ID'
          });
      }
      else {
        res.status(200)
          .json({
            status: 'success',
            data: data[0],
            message: 'Retrieved ONE discount'
          });
      }
    })
    .catch(err => {
      res.status(400).json("Bad request");
    });
});

//Get all discounts
router.get('/', (req, res) => {
  database
    .select()
    .from('discount AS d')
    .then(data => {
      if (data.length <= 0) {
        res.status(400)
          .json({
            status: 'fail',
            message: 'Invalid user ID'
          });
      }
      else {
        res.header("Access-Control-Allow-Origin", "*")
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved all discounts for this user'
          });
      }
    })
    .catch(err => {
      res.status(400).json("Bad request");
    });
});

//Get all discounts by user
router.get('/:idUser', (req, res) => {
  database
    .select()
    .from('discount AS d')
    .join('user_discount', 'user_discount.discount_id', 'd.discount_id')
    .where("user_discount.user_id", "=", req.params.idUser)
    .then(data => {
      if (data.length <= 0) {
        res.status(400)
          .json({
            status: 'fail',
            message: 'Invalid user ID'
          });
      }
      else {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved all discounts for this user'
          });
      }
    })
    .catch(err => {
      res.status(400).json("Bad request");
    });
});

//Update discount
router.post('/update', (req, res) => {
  database
    .select()
    .from('user_discount')
    .where("user_discount.user_id", "=", req.body.id_user)
    .andWhere("user_discount.discount_id", "=", req.body.id_discount)
    .update({
      used: req.body.used
    })
    .then(data => {
      if (data.length <= 0) {
        res.status(400)
          .json({
            status: 'fail',
            message: ''
          });
      }
      else {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'discount update'
          });
      }
    })
    .catch(err => {
      res.status(400).json("Bad request");
    });
});


//Get discount by id with the "used" state
router.get('/:id/:idUser', (req, res) => {
  database
    .select()
    .from("discount as d")
    .join("user_discount as ud", "ud.discount_id", "d.discount_id")
    .where("d.discount_id", "=", req.params.id)
    .andWhere("ud.user_id" ,"=",req.params.idUser)
    .then(data => {
      if (data.length <= 0) {
        res.status(400)
          .json({
            status: 'fail',
            message: 'Invalid discount ID'
          });
      }
      else {
        res.status(200)
          .json({
            status: 'success',
            data: data[0],
            message: 'Retrieved ONE discount'
          });
      }
    })
    .catch(err => {
      res.status(400).json("Bad request");
    });
});

module.exports = router;
