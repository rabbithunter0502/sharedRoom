const { db } = require("../utils/admin");

// Get post list
exports.getPosts = (req, res) => {
  db.collection("posts")
    .get()
    .then((data) => {
      let posts = [];
      data.forEach((doc) => {
        let post = doc.data();
        post.id = doc.id;
        posts.push(post);
      });
      return res.json(posts);
    })
    .catch((error) => {
      console.log("Get posts error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Get post by id
exports.getPost = (req, res) => {
  const id = req.params.id;

  db.collection("posts")
    .doc(id)
    .get()
    .then((doc) => {
      post = doc.data();
      post.id = id;
      return res.json(post);
    })
    .catch((error) => {
      console.log("Get post by id error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Create post
exports.createPost = (req, res) => {
  const post = req.body;

  db.collection("posts")
    .add(post)
    .then((doc) => {
      post.id = doc.id;
      res.json(post);
    })
    .catch((error) => {
      console.log("Create post error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Edit category
exports.editPost = (req, res) => {
  const post = req.body;

  db.collection("posts")
    .doc(post.id)
    .update(post)
    .then((doc) => {
      res.json(post);
    })
    .catch((error) => {
      console.log("Edit post error: ", error);
      return res.status(500).json({ error: error });
    });
};
