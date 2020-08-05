const { admin, db, firebase } = require("../utils/admin");

// Get account list
exports.getAccounts = (req, res) => {
  db.collection("accounts")
    .get()
    .then((data) => {
      let accounts = [];
      data.forEach((doc) => {
        account = doc.data();
        account.id = doc.id;
        accounts.push(account);
      });
      return res.json(accounts);
    })
    .catch((error) => {
      console.log("Get accounts error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Get account by id
exports.getAccount = (req, res) => {
  const id = req.params.id;

  db.collection("accounts")
    .doc(id)
    .get()
    .then((doc) => {
      account = doc.data();
      account.id = id;
      return res.json(account);
    })
    .catch((error) => {
      console.error("Get account by id error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Get posts by account
exports.getPostsByAccount = (req, res) => {
  const accountId = req.params.accountId;

  db.collection("posts")
    .where("accountId", "==", accountId)
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
      console.error("Get posts by account error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Create account
exports.createAccount = (req, res) => {
  const account = req.body;

  let token, id;
  firebase
    .auth()
    .createUserWithEmailAndPassword(account.email, account.password)
    .then((data) => {
      id = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      delete account.password;
      return db.collection("accounts").doc(id).set(account);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((error) => {
      console.log("Create account error: ", error);
      return res.status(500).json({ error: error });
    });
};

// Edit account
exports.editAccount = (req, res) => {
  const account = req.body;

  db.collection("accounts")
    .doc(account.id)
    .update(account)
    .then((doc) => {
      res.json(account);
    })
    .catch((error) => {
      console.log("Edit account error: ", error);
      res.status(500).json({ error: error });
    });
};
