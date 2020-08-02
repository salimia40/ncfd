var Transaction = require("./models/Transaction");
var Deposit = require("./models/Deposit");
var Commition = require("./models/Commition");
var User = require("./models/User");
var cashStore = require("./cashStore");
var papi = require("./papi");
var R = require("ramda");

module.exports.success = async (req, res) => {
  var payeer = req.session.payeer;
  var { m_orderid, m_amount: amount } = req.query;

  var user = await User.findOne({ payeer });

  var transaction = await Transaction.findById(m_orderid);
  transaction.status = "successful";
  await transaction.save();

  cashStore.charge(amount);

  if (!R.isNil(user.referer)) {
    var referer = await User.findOne({ referid: user.referer });

    var tr = new Transaction({
      payeer: referer.payeer,
      amount: R.multiply(R.divide(15, 100), amount),
      type: "commition",
      status: "successful",
    });
    tr = await tr.save();

    var commition = new Commition({
      payeer,
      referer: user.referer,
      amount: amount,
      profit: R.multiply(R.divide(15, 100), amount),
    });
    await commition.save();

    var ref = await User.findOne({referid: user.referer})

    //todo send funds to payeer
    await papi.makePayment(tr.amount,ref.payeer, tr.id)
  }

  var profit = amount * 1.32;
  var deposit = new Deposit({ payeer, amount, profit });

  await deposit.save();
  req.session.message = "thanks for payment"
  res.redirect('/depositlist')
};

module.exports.fail = async (req, res) => {
  res.sendStatus(200);
};

module.exports.status = async (req, res) => {
  res.sendStatus(200);
};
