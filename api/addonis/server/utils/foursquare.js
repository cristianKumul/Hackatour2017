const clientId = 'EKW3AQH0VQHV1XKFO5G2MLZE4VLANV5AWBT0EKKMK52FEMPJ';
const secretId = 'BKIWCZWHU5NVJPCVXVVQJYFZAEXDEZ1AMAWF2BMFQDIENGDV';
const foursquare = require('node-foursquare-venues')(clientId, secretId);
const limit = 10;
var searchVenues = (location, query) => {
  return new Promise((resolve, reject) => {
    foursquare.venues.suggestcompletion({ll: location, query: query, limit:limit}, function (err, resp) {
      if (err == null && resp.meta.code === 200) {
        resolve(resp.response);
      }
      else {
        reject(err);
      }
    });
  });
};

var getVenue = (id) => {
  return new Promise((resolve, reject) => {
    foursquare.venues.venue(id, function (err, resp) {
      if (err == null && resp.meta.code === 200) {
        resolve(resp.response);
      }
      else {
        reject(err);
      }
    });
  });
};

var getTips = (id) => {
  return new Promise((resolve, reject) => {
    foursquare.venues.tips(id, {sort: 'popular', limit:limit}, function (err, resp) {
      if (err == null && resp.meta.code === 200) {
        resolve(resp.response);
      }
      else {
        reject(err);
      }
    });
  });
}

var getPhotos = (id) => {
  return new Promise((resolve, reject) => {
    foursquare.venues.photos(id, {group: 'venue', limit: limit}, function (err, resp) {
      if (err == null && resp.meta.code === 200) {
        resolve(resp.response);
      }
      else {
        reject(err);
      }
    });
  });
}


module.exports = {
  searchVenues,
  getVenue,
  getTips,
  getPhotos
};
