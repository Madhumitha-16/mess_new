const mysql=require('mysql2');
var express = require('express');
var router = express.Router();
const conn = mysql.createConnection({
  host: 'localhost', 
  user: 'root',      
  password: 'root',      
  database: 'stock' 
}); 

conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});
const bodyParser = require('body-parser');


//api calls

router.get('/purchase/getItems', async(req,res)=>{
    
  const items = await conn.promise().query(`SELECT DISTINCT(item) FROM category ORDER BY item;`);
  res.status(200).send(items[0]);

});

router.post('/purchase/add', async (req, res) => {
  let date;
  let item=req.body.item;
  let category=req.body.category;
  let quantity=req.body.quantity;
  let amountkg=req.body.amountkg;
  let amount=quantity*amountkg;
  let sql = `INSERT INTO purchase (item,category,quantity,amountkg,amount,date) VALUES (?,?,?,?,?,NOW())`;
  await conn.promise().query(sql,[item,category,quantity,amountkg,amount,date], function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/purchase/getCategoryVendor',function(req,res){
let item=req.body.item;
console.log(item);
let sql=`select vendorName,category from vendor where category = (select category from category where item='${item}')`;
conn.query(sql,item,function(err,result){
  if(err) throw err;
  console.log(result);
  res.send(result);
})

})
module.exports = router;


