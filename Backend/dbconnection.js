const mysql=require('mysql2')

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