const fs = require("fs-extra");
const path = require("path");
const R = require("ramda");


class Db {
  constructor(filePath, defaultData) {
    this.filePath = filePath;
    this.defaultData = defaultData;
  }

  read(prototype) {
    if (!fs.existsSync(this.filePath)) return this.defaultData;

    var fileContent = fs.readFileSync(this.filePath);
    if (fileContent.length === 0) return this.defaultData;

    return prototype
      ? prototype.fromJson(JSON.parse(fileContent))
      : JSON.parse(fileContent);
  }

  write(data) {
    fs.ensureDirSync(path.dirname(this.filePath));
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }
}

module.exports = Db;

class CashStore {
  constructor() {
    this.db = new Db("data/cash.json");

    // INFO: In this implementation the database is a file and every time data is saved it rewrites the file, probably it should be a more robust database for performance reasons
    this.data = this.db.read();
    // Some places uses the emitter to act after some data is changed
    this.init();
  }

  init() {

    if (Object.keys(this.data ? this.data : {}).length === 0) {
      this.data = {
        total: 0,
        paid: 0,
        current: 0,
      };
      this.db.write(this.data);
    }
  }

  charge(amount) {
    amount = R.multiply( R.divide(99,100),amount);
    this.data.current += amount;
    this.data.total += amount;
    this.db.write(this.data);
  }

  get current(){
      return this.data.current
  }

  get paid(){
      return this.data.paid
  }

  pay(amount) {
    this.data.current -= amount;
    this.db.write(this.data);
  }
}

module.exports = new CashStore()