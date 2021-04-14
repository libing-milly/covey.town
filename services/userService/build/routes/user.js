"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
var express_1 = __importDefault(require("express"));
var user_1 = __importDefault(require("../controllers/user"));
var extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
var router = express_1.default.Router();
// not used
router.get("/authorized", extractJWT_1.default, user_1.default.validateToken);
router.post("/register", user_1.default.register);
router.post("/login", user_1.default.login);
router.get("/", user_1.default.getAllUsers);
// not used
router.delete("/:uid", user_1.default.deleteUser);
// not used
router.put(
  "/resetpassword/:uid",
  extractJWT_1.default,
  user_1.default.resetPassword
);
// not used
router.post("/forgetpassword", user_1.default.forgetPassword);
router.get("/:uid", user_1.default.getUserById);
module.exports = router;
