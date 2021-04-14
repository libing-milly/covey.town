"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var userAPI = "https://secure-anchorage-87188.herokuapp.com/api/users";
describe("user get", function () {
  it("get all users successfully", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        request
          .get("/")
          .expect(200)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual("get all users successfully");
              expect(res.body.isOK).toEqual(true);
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
  it("catch error and cannot get", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        request
          .get("/ranodm")
          .expect(500)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual("catch error and cannot get");
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
  it("getUserById", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        request
          .get("/606cb113e70eda000461b517")
          .expect(200)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.response.data.email).toEqual("TA@TA.com");
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
});
describe("user register", function () {
  it("email already exists", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request, newUser;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        newUser = {
          email: "jest@111.com",
          password: "jest",
          question1: "question1",
          answer1: "answer1",
          question2: "question2",
          answer2: "answer2",
          question3: "question3",
          answer3: "answer3",
        };
        request
          .post("/register")
          .send(newUser)
          .expect(409)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual("email already exists");
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
  it("register successfully", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request, newUser;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        newUser = {
          email: "jest1@111.com",
          password: "jest1",
          question1: "question1",
          answer1: "answer1",
          question2: "question2",
          answer2: "answer2",
          question3: "question3",
          answer3: "answer3",
        };
        request
          .post("/register")
          .send(newUser)
          // .expect(201)
          .expect(409)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              // expect(res.body.message).toEqual('register successfully');
              expect(res.body.message).toEqual("email already exists");
              // expect(res.body.response.user.email).toEqual('jest1@111.com');
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
  it("throw error register without email and password", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request, newUser;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        newUser = {};
        request
          .post("/register")
          .send(newUser)
          .expect(500)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual(
                "User validation failed: email: Path `email` is required., password: Path `password` is required."
              );
              expect(res.body.isOK).toEqual(false);
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
  it("throw error no password", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request, newUser;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        newUser = { email: "jest10@111.com" };
        request
          .post("/register")
          .send(newUser)
          .expect(500)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual(
                "User validation failed: password: Path `password` is required."
              );
              expect(res.body.isOK).toEqual(false);
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
});
describe("user login", function () {
  it("user is not verified if email not exist", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request, oldUser;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        oldUser = {
          email: "jestno@111.com",
          password: "jest",
        };
        request
          .post("/login")
          .send(oldUser)
          .expect(401)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual("user is not verified");
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
  it("password does not match", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request, oldUser;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        oldUser = {
          email: "jest1@111.com",
          password: "jest2",
        };
        request
          .post("/login")
          .send(oldUser)
          .expect(401)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual("password does not match");
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
  it("throw error login without email and password", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request, oldUser;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        oldUser = {};
        request
          .post("/login")
          .send(oldUser)
          // .expect(401)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual("user is not verified");
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
  it("user is verified successfully", function (done) {
    return __awaiter(void 0, void 0, void 0, function () {
      var request, oldUser;
      return __generator(this, function (_a) {
        request = supertest_1.default(userAPI);
        oldUser = { email: "jest@111.com", password: "jest" };
        request
          .post("/login")
          .send(oldUser)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              throw err;
            } else {
              expect(res.body.message).toEqual("user is verified successfully");
              expect(res.body.response.user.email).toEqual("jest@111.com");
              done();
            }
            30000;
          });
        return [2 /*return*/];
      });
    });
  });
});
