const express = require("express");
const router = express.Router();
const database = require("../../database");

//Add discount to user 
router.post("/addDiscountToUser", (req, res) => {
    const user_id = req.body.user_id
    const discount_id = req.body.discount_id
    database("user_discount")
    .select("*")
    .where({user_id: user_id,
            discount_id: discount_id})
    .then(data => {
      if (data.length == 0) {
        database("user_discount")
      .insert({
        user_id: req.body.user_id,
        discount_id: req.body.discount_id,
      })
      .then(res.status(200).json("Success!"))
      .catch(err => {
        res.status(400).json("Bad request");
      });
      }else{
        res.status(400).json("Discount allready added to this user");
      }
    })
    
  });

//Delete discount_user 
router.delete("/:discount_id/:user_id", (req, res) => {
    database("user_discount")
    .where('discount_id',"=", req.params.discount_id)
    .andWhere('user_id',"=", req.params.user_id)
    .del()
    .then(data => {
          res.status(200)
            .json({
              status: 'success',
              message: `Removed discount`
            });
      })
      .catch(err => {
        res.status(400).json("Bad request");
      });
    
  });

  module.exports = router;