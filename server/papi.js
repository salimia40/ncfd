const axios = require("axios");
const qs = require("qs");
const config = require("../config.json");

function PApi(account, apiId, apiPass, m_shop) {
  this.account = account;
  this.apiId = apiId;
  this.apiPass = apiPass;
  this.m_shop = m_shop;

  this.makeInvoice = async function (amount, id) {
    var body = {
      account: this.account,
      apiId: this.apiId,
      apiPass: this.apiPass,
      m_shop: this.m_shop,
      action: "invoiceCreate",
      m_orderid: id,
      m_amount: amount,
      m_curr: "RUB",
      m_desc: "Test%20Invoice",
    }

    return await axios({
      method: 'post',
      url: "https://payeer.com/ajax/api/api.php",
      data: qs.stringify(body),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(res => res.data)
  };

  this.makePayment = async function (amount, payeer, id) {
    var body = {
      account: this.account,
      apiId: this.apiId,
      apiPass: this.apiPass,
      m_shop: this.m_shop,
      action: "transfer",
      sum: amount,
      curIn: "RUB",
      curOut: "RUB",
      to: payeer,
      m_desc: "withdrawal from xxx",
      referenceId: id,
    };
    return await axios({
      method: 'post',
      url: "https://payeer.com/ajax/api/api.php",
      data: qs.stringify(body),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(res => res.data)
  };

  this.makePayment = async function (payeer) {
    var body = {
      account: this.account,
      apiId: this.apiId,
      apiPass: this.apiPass,
      m_shop: this.m_shop,
      user: payeer,
    };

    return await axios({
      method: 'post',
      url: "https://payeer.com/ajax/api/api.php",
      data: qs.stringify(body),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(res => res.data)

  };
}

module.exports = new PApi(
  config.account,
  config.apiId,
  config.apiPass,
  config.m_shop
);
