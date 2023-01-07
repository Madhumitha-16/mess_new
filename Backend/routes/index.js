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
  console.log("jus print");
  var arr = req.body.arr;
  console.log(req.body.arr);
  var length = arr.length;
  let date=req.body.date;
  for(let i=0;i<length;i++){
  var item=arr[i].item;
  var category=arr[i].category;
  var quantity=arr[i].quantity;
  var amountkg=arr[i].amount;
  var amount=arr[i].total;
  var sql = `INSERT INTO purchase (item,category,quantity,amountkg,amount,date) VALUES (?,?,?,?,?,?)`;
  await conn.promise().query(sql,[item,category,quantity,amountkg,amount,date], function(err, result) {
    if (err) throw err;
  });
}
  res.send("Items inserted");

});

router.post('/purchase/getCategoryVendor',function(req,res){
let item=req.body.item;
let sql=`select vendorName,category from vendor where category = (select distinct(category) from category where item='${item}')`;
conn.query(sql,item,function(err,result){
  if(err) throw err;
  res.send(result);
})

})
module.exports = router;


