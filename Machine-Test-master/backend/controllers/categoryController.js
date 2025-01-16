const db = require("../config/db");

exports.getCategories = (req, res) => {
  const sql = "SELECT * FROM categories";
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

exports.createCategory = (req, res) => {
  const { CategoryName } = req.body;
  db.query("SELECT COUNT(*) AS count FROM categories", (err, countResult) => {
    if (err) return res.status(500).send(err);
    const newCategoryId = countResult[0].count + 1;
    db.query(
      "INSERT INTO categories (CategoryId, CategoryName) VALUES (?, ?)",
      [newCategoryId, CategoryName],
      (err) => {
        if (err) return res.status(500).send(err);
        res.send({ CategoryId: newCategoryId, CategoryName });
      }
    );
  });
};

exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { CategoryName } = req.body;
  db.query(
    "UPDATE categories SET CategoryName = ? WHERE CategoryId = ?",
    [CategoryName, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send({ CategoryId: id, CategoryName });
    }
  );
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM categories WHERE CategoryId = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Category deleted" });
  });
};
