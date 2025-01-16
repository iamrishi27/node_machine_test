
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Welcome to the backend");
});

// Routes
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});








// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql2");


// const app = express();
// app.use(cors());
// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true })); 



// const db = mysql.createConnection({
//   host: "localhost",       
//   user: "root",            
//   password: "Root",        
//   database: "product_database", 
// });

// // connection.connect((err) => {
// //   if (err) throw err;
// //   console.log('Connected to MySQL database!');
// // });


// app.get("/", (req, res) => {
//   return res.json("backend");
// });


// // CRUD Operations for Categories
// app.get("/categories",(req,res)=>{
//   const sql = 'SELECT * FROM categories';
//   db.query(sql,(err,data)=>{
//       if(err) return res.json(err);
//       return res.json(data) 
//   })
// })

// app.post('/categories', (req, res) => {
//   const { CategoryName } = req.body;
//   db.query('SELECT COUNT(*) AS count FROM categories', (err, countResult) => {
//     if (err) return res.status(500).send(err);
//     const newCategoryId = countResult[0].count + 1;
//     db.query(
//       'INSERT INTO categories (CategoryId, CategoryName) VALUES (?, ?)',
//       [newCategoryId, CategoryName],
//       (err, result) => {
//         if (err) return res.status(500).send(err);
//         res.send({ CategoryId: newCategoryId, CategoryName });
//       }
//     );
//   });
// });


// app.put('/categories/:id', (req, res) => {
//   const { id } = req.params;
//   const { CategoryName } = req.body;
//   db.query('UPDATE categories SET CategoryName = ? WHERE CategoryId = ?', [CategoryName, id], (err) => {
//     if (err) return res.status(500).send(err);
//     res.send({CategoryId: id, CategoryName });
//   });
// });

// app.delete('/categories/:id', (req, res) => {
//   const { id } = req.params;
//   db.query('DELETE FROM categories WHERE CategoryId = ?', [id], (err) => {
//     if (err) return res.status(500).send(err);
//     res.send({ message: 'Category deleted' });
//   });
// });

// // CRUD Operation for Products

// // app.get("/products",(req,res)=>{
// //   const sql = 'SELECT * FROM products';
// //   db.query(sql,(err,data)=>{
// //       if(err) return res.json(err);
// //       return res.json(data) 
// //   })
// // })

// app.get('/products', (req, res) => {
  
//   const page = parseInt(req.query.page) || 1; 
//   const pageSize = parseInt(req.query.pageSize) || 10; 

 
//   const offset = (page - 1) * pageSize;

  
//   const countSql = 'SELECT COUNT(*) AS total FROM products';


//   const paginatedSql = `SELECT * FROM products LIMIT ? OFFSET ?`;

//   db.query(countSql, (err, countResult) => {
//     if (err) return res.status(500).json(err);

//     const totalProducts = countResult[0].total; 
//     const totalPages = Math.ceil(totalProducts / pageSize);

    
//     db.query(paginatedSql, [pageSize, offset], (err, products) => {
//       if (err) return res.status(500).json(err);

      
//       return res.json({
//         products,       
//         totalProducts,  
//         totalPages,     
//         currentPage: page, 
//         pageSize,      
//       });
//     });
//   });
// });




// app.post('/products', (req, res) => {
//   const { ProductName, ProductCategory } = req.body;

  
//   const query = `
//     INSERT INTO products (ProductName, ProductCategory) 
//     VALUES (?, ?)
//   `;

//   db.query(query, [ProductName, ProductCategory], (err, result) => {
//     if (err) {
//       if (err.code === 'ER_DUP_ENTRY') {
//         return res.status(409).json({ message: 'Duplicate ProductId detected' });
//       }
//       return res.status(500).send(err);
//     }

    
//     res.status(201).send({
//       ProductId: result.insertId, 
//       ProductName,
//       ProductCategory,
//     });
//   });
// });



// app.put('/products/:id', (req, res) => {
//   const { id } = req.params;
//   const { ProductName, ProductCategory } = req.body;
//   db.query(
//     'UPDATE products SET ProductName = ?, ProductCategory = ? WHERE ProductId = ?',
//     [ProductName, ProductCategory, id],
//     (err) => {
//       if (err) return res.status(500).send(err);
//       res.send({ ProductId: id, ProductName, ProductCategory });
//     }
//   );
// });

// app.delete('/products/:id', (req, res) => {
//   const { id } = req.params;
//   db.query('DELETE FROM products WHERE ProductId = ?', [id], (err) => {
//     if (err) return res.status(500).send(err);
//     res.send({ message: 'Category deleted' });
//   });
// });

// app.listen(5000, () => {
//   console.log("server running on port 5000");
// });
