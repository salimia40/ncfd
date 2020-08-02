const { Router } = require("express");
const User = require("../models/User");
const Deposit = require("../models/Deposit");
const Transaction = require("../models/Transaction");
const cashStore = require("../cashStore");
const papi = require("../papi");
const R = require("ramda");
const router = Router();
const data = require("./data");

const m = (app) => {
  router.post("/join", async (req, res) => {
    var payeer = req.body.payeer;
    if (await User.exists({ payeer })) {
      req.session = { payeer };
      app.render(req, res, "");
      res.redirect("/dashboard");
    } else {
      // validate payeer adress

      // var validation = await papi.checkUser(payeer);
      // if (validation.errors.length !== 0) {
      //   res.json({
      //     success: true,
      //     data: {
      //       loggedin: false,
      //       message: "invalid payeer adress",
      //     },
      //   });
      // }

      var user = new User({ payeer });

      if (!R.isNil(req.session.referer)) {
        user.referer = req.session.referer;
      }

      await user.save();
      req.session = { payeer };
      // app.render(req, res, "/dashboard");
      
      res.redirect("/dashboard");
    }
  });

  router.get("/logout", async (req, res) => {
    delete req.session.payeer;

    res.redirect("/");
  });

  router.use("/data", data);

  return router;
};

router.post("/deposit", async (req, res) => {
  var payeer = req.session.payeer;
  var amount = req.body.amount;

  var tr = new Transaction({
    payeer: payeer,
    amount: amount,
    type: "deposit",
    status: "pending",
  });
  tr = await tr.save();


  var result = await papi.makeInvoice(amount, tr.id);
  var { url } = result;
  res.redirect(url);
});

router.post("/withdraw", async (req, res) => {
  var payeer = req.session.payeer;
  var id = req.body.id;

  var deposit = await Deposit.findById(id);
  var profit = deposit.profit;
  deposit.closed = true;
  await deposit.save();

  var transaction = new Transaction({
    payeer,
    amount: profit,
    type: "withdraw",
    status: "successful",
  });

  transaction = await transaction.save();
  cashStore.pay(profit);

  // todo transfer funds to payeer

  req.session.message = "withdraw successful"

  if (cashStore.current > profit)
    await papi.makePayment(profit, payeer, transaction.id);

  res.redirect("/depositlist");
});


module.exports = m;