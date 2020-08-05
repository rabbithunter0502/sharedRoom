const { db } = require("../utils/admin");

// Get category list
exports.getCategories = (req, res) => {
  db.collection("categories")
    .get()
    .then((data) => {
      let categories = [];
      data.forEach((doc) => {
        let category = doc.data();
        category.id = doc.id;
        categories.push(category);
      });
      return res.json(categories);
    })
    .catch((error) => {
      console.log("Get categories error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Get category by id
exports.getCategory = (req, res) => {
  const id = req.params.id;

  db.collection("categories")
    .doc(id)
    .get()
    .then((doc) => {
      category = doc.data();
      category.id = id;
      return res.json(category);
    })
    .catch((error) => {
      console.error("Get catogory by id error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Create category
exports.createCategory = (req, res) => {
  const category = req.body;

  db.collection("categories")
    .add(category)
    .then((doc) => {
      category.id = doc.id;
      res.json(category);
    })
    .catch((error) => {
      console.log("Create category error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Edit category
exports.editCategory = (req, res) => {
  const category = req.body;

  db.collection("categories")
    .doc(category.id)
    .update(category)
    .then((doc) => {
      res.json(category);
    })
    .catch((error) => {
      console.log("Edit category error: ", error);
      return res.status(500).json({ error: error });
    });
};
