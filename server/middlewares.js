module.exports.auth = {
  api: (req, res, next) => {
    var payeer = req.session.payeer;
    if (payeer) return next();
    else return res.sendStatus(401);
  },
  ui: (req, res, next) => {
    var payeer = req.session.payeer;
    if (!payeer) return res.redirect("/");
    return next();
  },
};
