"use strict";
const generator = require("generate-password");
module.exports = function(Traveler) {
  Traveler.validatesInclusionOf("tripMode", {
    in: ["alone", "family", "partner", "friends"],
    message: "Is not an valid lang of ['alone', 'family', 'partner', 'friends']"
  });

  Traveler.validatesInclusionOf("nationality", {
    in: ["mexicana", "otro"],
    message: "Is not an valid lang of ['mexicana','otro']"
  });
  /**
   *
   * @param {*} experiences
   */
  const findExperienceMatch = experiences => {
    var i,
      len = experiences.length,
      result = [],
      obj = {};
    for (i = 0; i < len; i++) {
      obj[experiences[i]] = 0;
    }
    for (i in obj) {
      result.push(i);
    }
    return result;
  };
  Traveler.observe("after save", (ctx, next) => {
    if (ctx.isNewInstance !== undefined && ctx.isNewInstance) {
      const app = ctx.Model.app,
        EP = app.models.experienceProfile,
        selectedExperiences = [];
      // Nationality
      if (ctx.instance.nationality === "mexicana") {
        selectedExperiences.push.apply(selectedExperiences, [
          "5a19354f7c45bc64e48e2d8b",
          "5a19354f7c45bc64e48e2d8c",
          "5a19354f7c45bc64e48e2d8d",
          "5a19354f7c45bc64e48e2d8e"
        ]);
      } else {
        selectedExperiences.push.apply(selectedExperiences, [
          "5a19354f7c45bc64e48e2d8b",
          "5a19354f7c45bc64e48e2d8d",
          "5a19354f7c45bc64e48e2d8e",
          "5a19354f7c45bc64e48e2d8f",
          "5a19354f7c45bc64e48e2d90",
          "5a19354f7c45bc64e48e2d91",
          "5a19354f7c45bc64e48e2d92",
          "5a19354f7c45bc64e48e2d93"
        ]);
      }
      let tripModeExp = [];
      switch (ctx.instance.tripMode) {
        case "partner":
          tripModeExp = [
            "5a19354f7c45bc64e48e2d8f",
            "5a19354f7c45bc64e48e2d8b",
            "5a19354f7c45bc64e48e2d8cs",
            "5a19354f7c45bc64e48e2d92",
            "5a19354f7c45bc64e48e2d93",
            "5a19354f7c45bc64e48e2d90"
          ];
          break;
        case "friends":
          tripModeExp = [
            "5a19354f7c45bc64e48e2d8d",
            "5a19354f7c45bc64e48e2d8b",
            "5a19354f7c45bc64e48e2d90",
            "5a19354f7c45bc64e48e2d93"
          ];
          break;
        case "family":
          tripModeExp = [
            "5a19354f7c45bc64e48e2d8b",
            "5a19354f7c45bc64e48e2d8cs",
            "5a19354f7c45bc64e48e2d8e",
            "5a19354f7c45bc64e48e2d91",
            "5a19354f7c45bc64e48e2d92",
            "5a19354f7c45bc64e48e2d93"
          ];
          break;
      }

      selectedExperiences.push.apply(selectedExperiences, tripModeExp);
      const matched = findExperienceMatch(selectedExperiences);
      const expProfile = {
        experiences: matched,
        travelerId: ctx.instance.id
      };
      EP.create(expProfile, null);
      //
    }
    next();
  });

  /**
   *   {
    fbId : '',
    email: '',
    name: '',
    lastName: ''
  }
   * @param {object} request
   * @param {function} cb
   */

  Traveler.createFbTraveler = (request, cb) => {
    const password = generator.generate({
      length: 10,
      numbers: true
    });
    let travelerToCreate = {
      fbId: request.fbId,
      nationality: request.nationality,
      tripMode: request.tripMode,
      age: request.age,
      realm: null,
      username: request.fbId,
      email: request.email,
      password: password
    };
    console.log("Traveler", Traveler);
    Traveler.create(travelerToCreate, (err, travelerObject) => {
      if (!err) {
        Traveler.login({ username: request.fbId, password: password }, function(
          err,
          token
        ) {
          cb(null, token.id);
          console.log(token.id);
        });
      } else {
        cb(null, null);
      }
    });
  };
  /**
   * Register remote methods
   */
  Traveler.remoteMethod("createFbTraveler", {
    http: {
      path: "/createFbTraveler",
      verb: "post"
    },
    accepts: [
      {
        arg: "request",
        type: "object",
        http: { source: "body" }
      }
    ],
    returns: {
      arg: "accessToken",
      type: "string"
    }
  });
};
