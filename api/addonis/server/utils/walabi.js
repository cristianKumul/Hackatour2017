const axios = require("axios"),
 jwt = require('jsonwebtoken'),
 path = require('path'),
 fs = require('fs');

const proxy = "y8OClQcRV7zynyiZ6kAJCJAhhsRETkfIWtAgjzX05ms=",
  key = "davdKspKzsxmeH4zZY95sq7h0oKlGzyXBkzKJD6fZpk=",
  baseUrl = "https://hackatour-walabi.azurewebsites.net/api/v1";


  var absolutePath = path.resolve('./private.key');
  var privateKey = fs.readFileSync( __dirname + '/private.key', "utf8");
var instance = axios.create({
  baseURL: "https://hackatour-walabi.azurewebsites.net/api/v1"
});

instance.defaults.headers.common["Authorization"] = key;
instance.defaults.headers.post["Proxy"] = proxy;

const createWallet = model => {
  const wallet = {
    telefono: model.telefono,
    password: "qwerty",
    email: model.email,
    nombre: model.nombre,
    apellidos: "Gonzuela",
    imei: model.imei
  };
  return instance.post("ext/createwallet", wallet);
};

const getBalance = userName => {
  const request = {
    telefono: userName
  };
  return instance.post("ext/getbalance", request);
};
/**
 *
 * @param {string} traveler traveler id
 * @param {string} objectId taret object id
 * @param {string} type type single/route location
 * @param {number} amount amount
 */
const getSingPayload = (traveler, objectId, type, amount ) => {
  const t = new Date(), f = new Date();
  t.setSeconds(t.getSeconds() + 10);
  const req = {
    iss: "cristian.kumul@gmail.com",
    iat: t.getTime(),
    exp: f.getTime(),
    context: {
      seller: key,
      reference: `${objectId}|type`,
      phone: traveler,
      wallet: "addonis",
      amount: amount
    }
  };
  const token = jwt.sign(req, privateKey, { algorithm: 'RS256'});
  return token;
}
/**
 *
 * @param {string} traveler traveler id
 * @param {string} objectId object id from redemption
 * @param {srting} type type route or single destination
 * @param {*} amount amount
 */
const addAmount = (traveler, objectId, type, amount) => {
  const token = getSingPayload(traveler, objectId, type, amount);
  return instance.post('tppwllt',{token: token});
};
/**
 *
 * @param {string} traveler traveler user
 * @param {string} objectId id of product redeemed
 * @param {*} amount amount
 */
const redemPoints  = (traveler, objectId, amount) => {
  const token = getSingPayload(traveler, objectId, 'REDEM', amount);
  return instance.post('pay',{token: token});
}




module.exports = {
  getBalance,
  addAmount,
  redemPoints,
  createWallet
};

//addAmount('5555555555','123123123','single', 10).then((res) => {console.log(res)});
//getBalance('wallet0001').then(res =>  console.log(res.data));
//redem('5555555555','123123123', 10).then(res =>  console.log(res.data));
