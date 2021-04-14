"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var profile_1 = __importDefault(require("../models/profile"));
var createProfileForUser = function (req, res, next) {
  var _a = req.body,
    username = _a.username,
    imageUrl = _a.imageUrl,
    selfIntro = _a.selfIntro,
    roomId = _a.roomId;
  var userId = req.params.uid;
  var profile = new profile_1.default({
    _id: new mongoose_1.default.Types.ObjectId(),
    userId: userId,
    username: username,
    imageUrl: imageUrl,
    selfIntro: selfIntro,
    roomId: roomId,
  });
  profile_1.default
    .find({ userId: req.params.uid })
    .exec()
    .then(function (user) {
      if (user.length >= 1) {
        return res.status(409).json({
          response: {},
          message: "user profile already exists",
          isOK: false,
        });
      } else {
        return profile
          .save()
          .then(function (result) {
            return res.status(201).json({
              response: { result: result },
              message: "create profile for user successfully",
              isOK: true,
            });
          })
          .catch(function (error) {
            return res.status(500).json({
              response: {},
              message: error.message,
              isOK: false,
            });
          });
      }
    });
};
var getProfileById = function (req, res, next) {
  var id = req.params.pid;
  profile_1.default
    .findById(id)
    .exec()
    .then(function (data) {
      if (!data)
        res.status(404).send({
          response: {},
          message: "profile id=" + id + " was not found",
          isOK: false,
        });
      else
        res.status(200).send({
          response: { data: data },
          isOK: true,
          message: "get profile by ID successfully",
        });
    })
    .catch(function (err) {
      res.status(500).send({
        response: {},
        message: "catch error and cannot get",
        isOK: false,
      });
    });
};
var getAllProfiles = function (req, res, next) {
  profile_1.default
    .find()
    .exec()
    .then(function (profiles) {
      return res.status(200).json({
        response: { profiles: profiles },
        isOK: true,
        message: "get all profiles successfully",
      });
    })
    .catch(function (error) {
      return res.status(500).json({
        response: {},
        message: error.message,
        isOK: false,
      });
    });
};
var updateProfile = function (req, res, next) {
  if (!req) {
    return res.status(400).send({
      response: {},
      message: "data to update can not be empty",
      isOK: false,
    });
  }
  var id = req.params.pid;
  profile_1.default
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(function (data) {
      if (!data) {
        res.status(404).send({
          response: {},
          message: "profile id=" + id + " was not found",
          isOK: false,
        });
      } else
        res.send({
          response: {},
          message: "successfully update",
          isOK: true,
        });
    })
    .catch(function (err) {
      res.status(500).send({
        response: {},
        message: "catch error and cannot update",
        isOK: false,
      });
    });
};
var deleteProfile = function (req, res, next) {
  var id = req.params.pid;
  profile_1.default
    .findByIdAndRemove(id)
    .then(function (data) {
      if (!data) {
        res.status(404).send({
          message: "profile id=" + id + " was not found",
        });
      } else {
        res.send({
          message: "successfully delete",
        });
      }
    })
    .catch(function (err) {
      res.status(500).send({
        message: "catch error and cannot delete",
      });
    });
};
var findProfileForUser = function (req, res, next) {
  var userId = req.params["uid"];
  profile_1.default
    .findOne({ userId: req.params["uid"] })
    .exec()
    .then(function (data) {
      if (!data)
        res.status(404).send({
          response: {},
          message: "user id=" + userId + " was not found",
          isOK: false,
        });
      else
        res.send({
          response: { data: data },
          isOK: true,
          message: "find profile for user successfully",
        });
    })
    .catch(function (err) {
      res.status(500).send({
        message: "catch error and cannot get",
        isOK: false,
      });
    });
};
exports.default = {
  createProfileForUser: createProfileForUser,
  getAllProfiles: getAllProfiles,
  getProfileById: getProfileById,
  updateProfile: updateProfile,
  deleteProfile: deleteProfile,
  findProfileForUser: findProfileForUser,
};
