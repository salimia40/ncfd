const { Router } = require("express");
const User = require("../models/User");
const Commition = require("../models/Commition");
const Deposit = require("../models/Deposit");
const Transaction = require("../models/Transaction");
const cashStore = require("../cashStore");
const papi = require("../papi");
const R = require("ramda");
const router = Router();
var { auth } = require("../middlewares");

const commons = async (req, res) => {
  var payeer = req.session.payeer;
  var loggedin, user;
  if (payeer) {
    loggedin = true;
    user = await User.findOne({ payeer });
  } else {
    loggedin = false;
    user = undefined;
  }
  var message = req.session.message ? req.session.message : undefined;
  delete req.session.message;
  return { user, loggedin, message };
};

router.get("/index", async (req, res) => {
  var payeer = req.session.payeer;
  var { user, loggedin, message } = await commons(req, res);
  var operations_withdrawal = await Transaction.find({
    status: "successful",
    type: { $in: ["withdraw", "commition"] },
  })
    .sort({ created: -1 })
    .limit(40);

  var operations_deposit = await Transaction.find({
    status: "successful",
    type: "deposit",
  })
    .sort({ created: -1 })
    .limit(40);

  var users = await User.countDocuments();

  res.json({
    success: true,
    data: {
      total_deposit: cashStore.current,
      total_paid: cashStore.paid,
      total_user: users,
      loggedin,
      user,
      operations_deposit,
      operations_withdrawal,
      message
    },
  });
});

router.get("/dashboard", auth.api, async (req, res) => {
  var payeer = req.session.payeer;
  var { user, loggedin, message } = await commons(req, res);
  console.log("user", user);

  var latestdeposits = await Deposit.find({ payeer })
    .sort({ created: -1 })
    .limit(20);

  var total_referal = await User.countDocuments({ referer: user.referid });

  var total_commition = await Commition.find({ referer: user.referid });

  total_commition = R.reduce(
    (acc, elem) => acc + elem.profit,
    0,
    total_commition
  );

  var _transactions = await Transaction.find({ payeer });
  var payout_sum = R.reduce((acc, next) => acc + next.amount, 0, _transactions);

  var active = await Deposit.find({ payeer, closed: false });
  var closed = await Deposit.find({ payeer, closed: true });

  var active_deposit_sum = R.reduce(
    (acc, next) => acc + next.amount,
    0,
    active
  );
  var deposit_sum =
    R.reduce((acc, next) => acc + next.amount, 0, closed) + active_deposit_sum;

  res.json({
    success: true,
    data: {
      loggedin,
      user,
      latestdeposits,
      total_referal,
      total_commition,
      payout_sum,
      deposit_sum,
      message
    },
  });
});

router.get("/deposit", auth.api, async (req, res) => {
  var payeer = req.session.payeer;
  var { user, loggedin, message } = await commons(req, res);
  var latestdeposits = await Deposit.find({ payeer })
    .sort({ created: -1 })
    .limit(20);

  res.json({
    success: true,
    data: {
      loggedin,
      user,
      latestdeposits,
      message
    },
  });
});

// activedeposits = [],
// closeddeposits = [],
// active_deposit_sum = 0,
// deposit_sum = 0,

router.get("/depositlist", auth.api, async (req, res) => {
  var payeer = req.session.payeer;
  var { user, loggedin, message } = await commons(req, res);
  var activedeposits = await Deposit.find({ payeer, closed: false }).sort({
    created: -1,
  });

  var closeddeposits = await Deposit.find({ payeer, closed: true })
    .sort({ created: -1 })
    .limit(20);

  var active_deposit_sum = R.reduce(
    (acc, next) => acc + next.amount,
    0,
    activedeposits
  );
  var deposit_sum =
    R.reduce((acc, next) => acc + next.amount, 0, closeddeposits) +
    active_deposit_sum;

  res.json({
    success: true,
    data: {
      loggedin,
      user,
      deposit_sum,
      activedeposits,
      active_deposit_sum,
      closeddeposits,
      message
    },
  });
});

router.get("/referal", auth.api, async (req, res) => {
  var payeer = req.session.payeer;
  var { user, loggedin, message } = await commons(req, res);
  var commitions = await Commition.find({ referer: user.referid });

  var referals = R.reduceBy(
    (acc, elem) => {
      acc.amount += elem.amount;
      acc.profit = elem.profit;
      return acc;
    },
    { amount: 0, profit: 0 },
    (elem) => elem.payeer,
    commitions
  );

  var total_referal = await User.countDocuments({ referer: user.referid });

  total_commition = R.reduce((acc, elem) => acc + elem.profit, 0, commitions);

  res.json({
    success: true,
    data: {
      loggedin,
      user,
      total_commition,
      total_referal,
      referals,
      host: req.headers.host,
      message
    },
  });
});

router.get("/transactions", auth.api, async (req, res) => {
  var payeer = req.session.payeer;
  var { user, loggedin, message } = await commons(req, res);
  var _transactions = await Transaction.find({ payeer });

  var transactions = await Transaction.find({ payeer })
    .sort({ created: -1 })
    .limit(40);

  var payout_sum = R.reduce((acc, next) => acc + next.amount, 0, _transactions);

  var deps = await Deposit.find({ payeer });
  var deposit_sum = R.reduce((acc, next) => acc + next.amount, 0, deps);

  res.json({
    success: true,
    data: {
      loggedin,
      user,
      transactions,
      payout_sum,
      deposit_sum,
      message,
    },
  });
});

module.exports = router;
