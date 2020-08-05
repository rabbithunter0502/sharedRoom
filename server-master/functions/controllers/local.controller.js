const { db } = require("../utils/admin");

exports.getLocals = (req, res) => {
  db.collection("local_v")
    .get()
    .then((data) => {
      let locals = [];
      data.forEach((doc) => {
        locals.push(doc.data());
      });
      return res.json(locals);
    })
    .catch((error) => {
      console.log("Get locals error: ", error);
      return res.status(500).json({ error: error });
    });
};
