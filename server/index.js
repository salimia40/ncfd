var cookieSession = require("cookie-session");
var express = require("express");
var Keygrip = require("keygrip");
var bodyParser = require("body-parser");
var cors = require("cors");
var payeerControler = require("./payeerControler");
var api = require("./api");
var { auth } = require("./middlewares");
var mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/moneyy", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    authSource: "admin",
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useUnifiedTopology: true,
  })
  .then(console.log("connected"))
  .catch(console.error);

const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  var server = express();
  server.use(
    cors({
      origin: "*",
    })
  );

  server.use(
    cookieSession({
      name: "session",
      keys: new Keygrip(
        [
          ".lKhQ.[+Xduwp1rt|>>'*(!kutLAAXXGunO^Cx!1<P`y^ST0)%f}lb50/@F$h)N",
          "Pu{/>dYOoxJa/HN;7$(OaDK{}qjmjXnd4>0xt&#;bYMY1:5U,HC/S|w0Yb^ol#X",
        ],
        "SHA384",
        "base64"
      ),
      // Cookie Options
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    })
  );

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(function (req, res, next) {
    req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    next();
  });

  server.use("/api", api(app));

  server.get("/success", payeerControler.success);
  server.use("/fail", payeerControler.fail);
  server.use("/status", payeerControler.status);

  server.use("/dashboard", auth.ui);
  server.use("/deposit", auth.ui);
  server.use("/depositlist", auth.ui);
  server.use("/referal", auth.ui);
  server.use(handle);

  //   server.get('/',(req,res) =>{
  //       app.render(req,req,'index')
  //   })

  server.listen(8000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
