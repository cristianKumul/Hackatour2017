const axios = require("axios"),
 jwt = require('jsonwebtoken'),
 path = require('path'),
 fs = require('fs');

const proxy = "y8OClQcRV7zynyiZ6kAJCJAhhsRETkfIWtAgjzX05ms=",
  key = "davdKspKzsxmeH4zZY95sq7h0oKlGzyXBkzKJD6fZpk=",
  baseUrl = "https://hackatour-walabi.azurewebsites.net/api/v1";
  var cert = `-----BEGIN RSA PRIVATE KEY-----
  MIIEogIBAAKCAQEA0xzfzm3xQlgXcc7thECw43u75huA+onHucz5hwR+OJpFQ7+q
  vpHRzXud5SE5zGaGz2dB3mKCFjtJINzeM35cwF6vR1OL2EIvbsnNqgUa+RGnm7Pk
  EfOMwMn5AT+EnCs8BZ+gp8+U4jwlN3gEdtlKihN11UmB7MD0uO/xfwZnMSljPe0n
  wdjc/GAMFvJZiA54mdEPgxuMkUkoBoGbpj/ks9B9faQDro0+F29TLSH5+MQzB9Hm
  F+djoc5lRIRoG4c/+aLiOo/6SaMjIM6CCwBCLzbH/pS4MyKa4OJZy1iBjNWfICWC
  jOXM5Lx532v/CC5/VFEA8Fnb7ZGHAo08dTG37wIDAQABAoIBAATZF+akrbKpVTh+
  2QN9fNJsh/8byJV4Tobcxyorlz5zhH2uzBv+O0Qtv42AetRP0m6231NdDcG28NH5
  YHzsPPMJ+Zp4t7BqrK4tojRyU5E+r4uq0OT8o9HVkYtOyxvO/lzespDH+pJLcUtZ
  zThxev26vqz8OCiYscYBdJlHK118nCZXHzQo9oGtVnhszY4PYEirRAjBUPhOkmdU
  K0bMSq5KYuDVd/ncnWKFPST6J8uiFtZOuzy7URZ7Rm6dLu5b2hUhMDw6RcF9Vjau
  6lBTOJU/hX99hHKWpp4wgv2oyasCbfuxwI9S9RZhB4YOHS+pJlugMdWGuJGmA7K9
  0mO92rkCgYEA6kI7LGMGflaz7NVvumOwDKiuBz+lAnVGKcf9urcrpCeFH3erQNo/
  S+luyV8Yjq6gym1jBZjCyXNP7EYHusvdtXuZO2mm+tmyD3MUZujaMPu3TU+b5vKP
  rS6kiriQt1VYd3WSVH2CCPwHCAK3faPB6CXKkQInK8Zx08i5ETeWhC0CgYEA5rS3
  rDnhvENhl+WcI9fV8XZmyE1wdnEjs5Zb+OxuUtHaj/7Evi4vy+JfK7P15XUF5r/t
  rbpp3RCqM/PWDoQXApX5xTFwvXqkaZNW8Do2PgcVjOHUQauMxRHQvotrMzPmcqi/
  s+pj3Ylu3rYnc6cLzPit/gLbEhFAeGm1W8sWcgsCgYAJaG+H8NIp8MF5GXlLOwWu
  /HdAw0WVO7B9rRJ7lS+jgBLQmLW//QPdwJo6bB9IW6sJdisr5l6sSH1FN+rHjbhx
  uW0F/dA+8s8735tKJr/ch79s022ncMZkZiMljxQAyOSsp4Qg8IlwYu7FW5aS7Si0
  chAYksWP9IBNyRnlnx3kYQKBgFLUy6VQWtXnM2EAFWFhGvVI13pPI3PDB1hxQbBL
  4whlRB2zERxfJNYE/rqIMF8j9ux0OHfJmDzAwPtKLq6jikdpZXYBXEMLh4BIYEx7
  +gGnNXuRkU3KtA4FaXcgQ2rs1W6RW9LS8uwVbfMUX3HMphX/qyiqCdGg1A7nlS/R
  6MslAoGAB2UWI/y84bYZ7m1gwqvViFa8DaDToGCjIaqAGPcU0m9WU+NWuJsp3AaX
  6cUbED+9vKNhDyPo8iH9BS4eekrGB3fXxGIvuf3OLSiCOCyba6O1mNgmS6uOVm+6
  0Tls0CNgoa2EYC+qCeSfptu1ecDF3ki89l6yJjKuzXGSfsL/GYw=
  -----END RSA PRIVATE KEY-----`;

  var absolutePath = path.resolve('./../../../cert/key.pem');
  var privateKey = fs.readFileSync(absolutePath, "utf8");
var instance = axios.create({
  baseURL: "https://hackatour-walabi.azurewebsites.net/api/v1"
});
//instance.defaults.baseURL = 'https://hackatour-walabi.azurewebsites.net/api/v1';
instance.defaults.headers.common["Authorization"] = key;
instance.defaults.headers.post["Proxy"] = proxy;

const createWallet = model => {
  const wallet = {
    telefono: model.username,
    password: "qwerty",
    email: model.email,
    nombre: model.realm,
    apellidos: "Gonzuela",
    imei: model.username
  };
  return instance.post("ext/createwallet", wallet);
};

const getBalance = userName => {
  const request = {
    telefono: userName
  };
  return instance.post("ext/getbalance", request);
};

const addAmount = (traveler, objectId, type, amount) => {
  console.log(privateKey);
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

  console.log(token);
};



addAmount('5555555555','123123123','single', 10);//.then((res) => {console.log(res)});
