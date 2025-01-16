const db = require("../config/db");

exports.getProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const offset = (page - 1) * pageSize;

  const countSql = "SELECT COUNT(*) AS total FROM products";
  const paginatedSql = "SELECT * FROM products LIMIT ? OFFSET ?";

  db.query(countSql, (err, countResult) => {
    if (err) return res.status(500).json(err);

    const totalProducts = countResult[0].total;
    const totalPages = Math.ceil(totalProducts / pageSize);

    db.query(paginatedSql, [pageSize, offset], (err, products) => {
      if (err) return res.status(500).json(err);

      res.json({
        products,
        totalProducts,
        totalPages,
        currentPage: page,
        pageSize,
      });
    });
  });
};

exports.createProduct = (req, res) => {
  const { ProductName, ProductCategory } = req.body;

  const query = "INSERT INTO products (ProductName, ProductCategory) VALUES (?, ?)";
  db.query(query, [ProductName, ProductCategory], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Duplicate ProductId detected" });
      }
      return res.status(500).send(err);
    }

    res.status(201).send({
      ProductId: result.insertId,
      ProductName,
      ProductCategory,
    });
  });
};

exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { ProductName, ProductCategory } = req.body;

  db.query(
    "UPDATE products SET ProductName = ?, ProductCategory = ? WHERE ProductId = ?",
    [ProductName, ProductCategory, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ ProductId: id, ProductName, ProductCategory });
    }
  );
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE ProductId = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Product deleted" });
  });
};
