const { admin, db, firebase } = require("../utils/admin");

// Login
exports.login = (req, res) => {
  const account = req.body;

  let id;
  firebase
    .auth()
    .signInWithEmailAndPassword(account.email, account.password)
    .then((data) => {
      id = data.user.uid;
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ id, token });
    })
    .catch((error) => {
      console.log(error);
      if (error.code === "auth/user-not-found")
        return res.status(403).json({ general: "Tài khoản không tồn tại" });
      if (error.code === "auth/wrong-password")
        return res.status(403).json({ general: "Sai mật khẩu" });
      return res.status(403).json({ error: error });
    });
};

// Check account is logged in
exports.isLoggedIn = (req, res) => {
  const idToken = req.headers.authorization;

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      return res.json({ authorization: true });
    })
    .catch((error) => {
      console.log("Verify error: ", error);
      return res.status(403).json(error);
    });
};

// Send reset password url
exports.sendResetPasswordUrl = (req, res) => {
  firebase
    .auth()
    .sendPasswordResetEmail(req.query.email)
    .then(() => {
      return res.json("Email sent");
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error: error });
    });
};
