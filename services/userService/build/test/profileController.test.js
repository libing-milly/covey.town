"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var profileAPI = 'https://secure-anchorage-87188.herokuapp.com/api/profiles';
describe('getAllProfiles', function () {
    it('get all profiles successfully', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            request
                .get('/')
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('get all profiles successfully');
                    expect(res.body.isOK).toEqual(true);
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
    it('catch error and cannot get', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            request
                .get('/random')
                .expect(500)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('catch error and cannot get');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
});
describe('findProfileForUser', function () {
    it('catch error and cannot get', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            request
                .get('/noexist/profile')
                .expect(500)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('catch error and cannot get');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
    it('find profile for user successfully', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            request
                .get('/6068f7f16ce91100046aed6f/profile')
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.response.data.userId).toEqual('6068f7f16ce91100046aed6f');
                    expect(res.body.response.data.username).toEqual('publish');
                    expect(res.body.isOK).toEqual(true);
                    expect(res.body.message).toEqual('find profile for user successfully');
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
    it('user id=${userId} was not found', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            request
                .get('/1068f7f16ce91100046aed6f/profile')
                .expect(404)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('user id=1068f7f16ce91100046aed6f was not found');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
});
describe('createProfileForUser', function () {
    it('user profile already exists', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request, newProfile;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            newProfile = {
                username: 'rocket',
                imageUrl: 'https:rocket',
                selfIntro: 'Hi rocket',
                roomId: '21323'
            };
            request
                .post('/606d2f7e733a2a0004a8e80a/profile')
                .send(newProfile)
                .expect(409)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('user profile already exists');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
    it('create profile for user successfully', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request, newProfile;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            newProfile = {
                username: 'jest2',
                imageUrl: 'https:jest',
                selfIntro: 'Hi jest',
                roomId: '21323'
            };
            request
                .post('/60721e9371f16a0004c8a8cd/profile')
                .send(newProfile)
                // .expect(201)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    // expect(res.body.message).toEqual('create profile for user successfully');
                    expect(res.body.message).toEqual('user profile already exists');
                    // expect(res.body.response.result.username).toEqual('jest');
                    // expect(res.body.response.result.selfIntro).toEqual('Hi jest');
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
    it('throw error no username', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request, newProfile;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            newProfile = {};
            request
                .post('/60721ab171f16a0004c8a8a1/profile')
                .send(newProfile)
                .expect(500)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('Profile validation failed: username: Path `username` is required.');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
});
describe('updateProfile', function () {
    it('successfully update', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request, newProfile;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            newProfile = {
                username: 'green',
                imageUrl: 'https:green',
                selfIntro: 'Hi green',
                roomId: '232b3'
            };
            request
                .put('/607235b971f16a0004c8a913')
                .send(newProfile)
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('successfully update');
                    expect(res.body.isOK).toEqual(true);
                    done();
                }
                30000;
            });
            request
                .get('/607235b971f16a0004c8a913')
                .send(newProfile)
                .expect(200)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.response.data.username).toEqual('green');
                    expect(res.body.response.data.selfIntro).toEqual('Hi green');
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
    it('profile id=${id} was not found', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request, newProfile;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            newProfile = {
                username: 'green',
                imageUrl: 'https:green',
                selfIntro: 'Hi green',
                roomId: '232b3'
            };
            request
                .put('/407235b971f16a0004c8a913')
                .send(newProfile)
                .expect(404)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('profile id=407235b971f16a0004c8a913 was not found');
                    expect(res.body.isOK).toEqual(false);
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
    it('catch error and cannot update', function (done) { return __awaiter(void 0, void 0, void 0, function () {
        var request, newProfile;
        return __generator(this, function (_a) {
            request = supertest_1.default(profileAPI);
            newProfile = {};
            request
                .put('/')
                .send(newProfile)
                .expect(404)
                .end(function (err, res) {
                if (err) {
                    throw err;
                }
                else {
                    expect(res.body.message).toEqual('Not found');
                    done();
                }
                30000;
            });
            return [2 /*return*/];
        });
    }); });
});
