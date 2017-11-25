'use strict';
const fq = require('./../../server/utils/foursquare')
module.exports = function(Location) {

  Location.getVenue = (id, cb) => {
    fq.getVenue(id).then((res)=>{
      cb(null, res);
    });
  };

  Location.getTips = (id, cb ) => {
    fq.getTips(id).then(res => cb(null, res));
  }
  Location.getPhotos = (id, cb) => {
    fq.getPhotos(id).then(res => cb(null, res));
  }

  Location.remoteMethod("getVenue", {
    http: {
      path: "/getVenue",
      verb: "get"
    },
    accepts: [
      {
        arg: "id",
        type: "string",
        http: { source: "query" }
      }
    ],
    returns: {
      arg: "venue",
      type: "object"
    }
  });
  Location.remoteMethod("getTips", {
    http: {
      path: "/getTips",
      verb: "get"
    },
    accepts: [
      {
        arg: "id",
        type: "string",
        http: { source: "query" }
      }
    ],
    returns: {
      arg: "tips",
      type: "object"
    }
  });
  Location.remoteMethod("getPhotos", {
    http: {
      path: "/getPhotos",
      verb: "get"
    },
    accepts: [
      {
        arg: "id",
        type: "string",
        http: { source: "query" }
      }
    ],
    returns: {
      arg: "photos",
      type: "object"
    }
  });

};
