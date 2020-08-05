const { admin } = require("./admin");

module.exports = (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    console.log("Không tìm thấy token");
    return res.status(403).json({ error: "Unauthorization" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      return next();
    })
    .catch(error => {
      console.log("Verify error: ", error);
      return res.status(403).json(error)
    })
};
