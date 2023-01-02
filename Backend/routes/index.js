const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
const conn=require('../dbconnection');

//api calls
router.post('/add', function (req, res) {
  let date;
  let item=req.body.item;
  let category=req.body.category;//give the select dropdown name as same as category
  let quantity=req.body.quantity;
  let amountkg=req.body.amountkg;
  let amount=quantity*amountkg;
  let sql = `INSERT INTO purchase (item,category,quantity,amountkg,amount,date) VALUES (?,?,?,?,?,NOW())`;
  conn.query(sql,[item,category,quantity,amountkg,amount,date], function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});


module.exports = router;


