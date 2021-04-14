"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var express_1 = __importDefault(require("express"));
var profile_1 = __importDefault(require("../controllers/profile"));
var router = express_1.default.Router();
router.post("/:uid/profile", profile_1.default.createProfileForUser);
router.get("/:uid/profile", profile_1.default.findProfileForUser);
router.get("/", profile_1.default.getAllProfiles);
// not used
router.get("/:pid", profile_1.default.getProfileById);
router.put("/:pid", profile_1.default.updateProfile);
// not used
router.delete("/:pid", profile_1.default.deleteProfile);
module.exports = router;
