const functions = require("firebase-functions");
const express = require("express");
const app = express();

// CORS fix
var cors = require("cors");
app.use(cors({ origin: true }));
app.options("*", cors());

const auth = require("./utils/auth.middleware");
const { getLocals } = require("./controllers/local.controller");
const {
  createPaymentUrl,
  getVnpReturn,
} = require("./controllers/payment.controller");
const {
  login,
  isLoggedIn,
  sendResetPasswordUrl,
} = require("./controllers/auth.controller");
const {
  getAccounts,
  getAccount,
  getPostsByAccount,
  createAccount,
  editAccount,
} = require("./controllers/account.controller");
const {
  getCategories,
  getCategory,
  createCategory,
  editCategory,
} = require("./controllers/category.controller");
const {
  getPosts,
  getPost,
  createPost,
  editPost,
} = require("./controllers/post.controller");

// vnpay config
var path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// User routes
app.get("/accounts", getAccounts);
app.get("/accounts/:id", getAccount);
app.get("/accounts/:accountId/posts", auth, getPostsByAccount);
app.post("/accounts", createAccount);
app.put("/accounts/:id", auth, editAccount);

// Category routes
app.get("/categories", getCategories);
app.get("/categories/:id", getCategory);
app.post("/categories", auth, createCategory);
app.put("/categories/:id", auth, editCategory);

// Post routes
app.get("/posts", getPosts);
app.get("/posts/:id", getPost);
app.post("/posts", auth, createPost);
app.put("/posts/:id", auth, editPost);

// Payment routes
app.post("/payment/create", createPaymentUrl);
app.get("/payment/return", getVnpReturn);

// Local routes
app.get("/locals", getLocals);

// Auth routes
app.get("/is-auth", isLoggedIn);
app.post("/auth", login);
app.get("/auth/reset-password", sendResetPasswordUrl);

exports.api = functions.https.onRequest(app);
