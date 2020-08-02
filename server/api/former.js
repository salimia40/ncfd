const { Router } = require("express");
const User = require("../models/User");
const Commition = require("../models/Commition");
const Deposit = require("../models/Deposit");
const Transaction = require("../models/Transaction");
const cashStore = require("../cashStore");
const papi = require("../papi");
const R = require("ramda");
const router = Router();

router.post("/join", async (req, res) => {
  var payeer = req.body.payeer;
  if (await User.exists({ payeer })) {
    req.session = { payeer };
    res.json({
      success: true,
      data: {
        loggedin: true,
        user: await User.findOne({ payeer }),
        redirect: "/dashboard",
      },
    });
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
    res.json({
      success: true,
      data: {
        loggedin: true,
        user: await User.findOne({ payeer }),
        redirect: "/dashboard",
      },
    });
  }
});

router.get("/check", async (req, res) => {
  var payeer = req.session.payeer;
  if (payeer) {
    res.json({
      success: true,
      data: {
        loggedin: true,
        user: await User.findOne({ payeer }),
      },
    });
  } else {
    res.json({
      success: true,
      data: {
        loggedin: false,
        user: null,
      },
    });
  }
});

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
  var { url } = result
  console.log(result)
  res.json({
    success: true,
    data: {
      url
    },
  });
});

router.get("/stats", async (req, res) => {
  var users = await User.countDocuments();

  res.json({
    success: true,
    data: {
      total_deposit: cashStore.current,
      total_paid: cashStore.paid,
      total_user: users,
    },
  });
});

router.get("/user/states", async (req, res) => {
  var payeer = req.session.payeer;

  var user = await User.findOne({ payeer });

  var transactions = await Transaction.find({
    payeer,
    type: { $in: ["withdraw", "commition"] },
  });
  var active = await Deposit.find({ payeer, closed: false });
  var closed = await Deposit.find({ payeer, closed: true });

  /**
   * TOTAL REFERRAL
   * TOTAL COMMISION
   * TOTAL WITHDRAWL
   * TOTAL DEPOSIT
   * ACTIVE DEPOSIT
   * TOTAL PAYOUT
   */

  var total_referal = await User.countDocuments({ referer: user.referid });
  var total_commition = await Commition.find({ referer: user.referid });

  total_commition = R.reduce(
    (acc, elem) => acc + elem.profit,
    0,
    total_commition
  );

  var payout_sum = R.reduce((acc, next) => acc + next.amount, 0, transactions);
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
      total_referal,
      payout_sum,
      active_deposit_sum,
      deposit_sum,
      total_commition,
    },
  });
});

router.get("/deposit", async (req, res) => {
  var payeer = req.session.payeer;
  var activedeposits = await Deposit.find({ payeer, closed: false }).sort({
    created: -1,
  });

  var closeddeposits = await Deposit.find({ payeer, closed: true })
    .sort({ created: -1 })
    .limit(20);

  var latestdeposits = R.slice(
    0,
    6,
    R.sort(
      (a, b) => a.created > b.created,
      R.concat(R.clone(activedeposits), closeddeposits)
    )
  );

  res.json({
    success: true,
    data: {
      closeddeposits,
      activedeposits,
      latestdeposits,
    },
  });
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

  if (cashStore.current > profit)
    await papi.makePayment(profit, payeer, transaction.id);

  res.json({
    success: true,
    data: {
      message: "withdraw successful",
    },
  });
});

router.get("/referals", async (req, res) => {
  var payeer = req.session.payeer;
  var user = await User.findOne({ payeer });

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

  res.json({
    success: true,
    data: {
      referals,
    },
  });
});

router.get("/transactions", async (req, res) => {
  var payeer = req.session.payeer;
  var transactions = await Transaction.find({ payeer })
    .sort({ created: -1 })
    .limit(40);

  res.json({
    success: true,
    data: {
      transactions,
    },
  });
});

router.get("/operations", async (req, res) => {
  var operations = await Transaction.find({ status: "successful" })
    .sort({ created: -1 })
    .limit(40);

  res.json({
    success: true,
    data: {
      operations,
    },
  });
});

router.get("/logout", async (req, res) => {
  delete req.session.payeer;
  res.json({
    success: true,
    data: {
      loggedin: false,
      redirect: "/",
    },
  });
});

module.exports = router;
