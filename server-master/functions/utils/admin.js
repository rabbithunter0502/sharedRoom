const admin = require("firebase-admin");
const serviceAccount = require("../da2-server-firebase-adminsdk-2zsfd-73b7934d08.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://da2-server.firebaseio.com",
});

const db = admin.firestore();

const firebase = require("firebase");
const config = require("../utils/config");

firebase.initializeApp(config);

module.exports = { admin, db, firebase };
