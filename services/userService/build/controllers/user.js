"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var logging_1 = __importDefault(require("../config/logging"));
var user_1 = __importDefault(require("../models/user"));
var authJWT_1 = __importDefault(require("../functions/authJWT"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var NAMESPACE = 'User';
var validateToken = function (req, res) {
    logging_1.default.info(NAMESPACE, 'token is validated, this user is verified.');
    return res.status(200).json({
        message: 'user token is verified successfully'
    });
};
var register = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password, question1 = _a.question1, answer1 = _a.answer1, question2 = _a.question2, answer2 = _a.answer2, question3 = _a.question3, answer3 = _a.answer3;
    var _user = new user_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        email: email,
        password: password,
        question1: question1,
        answer1: answer1,
        question2: question2,
        answer2: answer2,
        question3: question3,
        answer3: answer3
    });
    user_1.default.find({ email: req.body.email })
        .exec()
        .then(function (user) {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'email already exists'
            });
        }
        else {
            return _user
                .save()
                .then(function (user) {
                return res.status(201).json({
                    response: { user: user },
                    message: 'register successfully',
                    isOK: true
                });
            })
                .catch(function (error) {
                return res.status(500).json({
                    message: error.message,
                    isOK: false
                });
            });
        }
    });
    // bcryptjs.hash(password, 10, (hashError, hash) => {
    //     if (hashError) {
    //         return res.status(401).json({
    //             message: hashError.message,
    //             error: hashError
    //         });
    //     }
    //     const _user = new User({
    //         _id: new mongoose.Types.ObjectId(),
    //         email,
    //         password: hash
    //     });
    //     return _user
    //         .save()
    //         .then((user) => {
    //             return res.status(201).json({
    //                 user
    //             });
    //         })
    //         .catch((error) => {
    //             return res.status(500).json({
    //                 message: error.message,
    //                 error
    //             });
    //         });
    // });
};
var login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    user_1.default.find({ email: email })
        .exec()
        .then(function (users) {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'user is not verified'
            });
        }
        // bcryptjs.compare(password, users[0].password, (error, result) => {
        if (password !== users[0].password) {
            return res.status(401).json({
                message: 'password does not match'
            });
        }
        else {
            // if (error) {
            //     return res.status(401).json({
            //         message: 'password does not match'
            //     });
            // } else if (result) {
            authJWT_1.default(users[0], function (_error, token) {
                if (_error) {
                    return res.status(500).json({
                        message: _error.message
                        // error: _error
                    });
                }
                else if (token) {
                    return res.status(200).json({
                        message: 'user is verified successfully',
                        response: {
                            token: token,
                            user: users[0]
                        }
                    });
                }
            });
        }
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).json({
            // error: err
            message: err.message
        });
    });
    // })
    // .catch((err) => {
    //     console.log(err);
    //     res.status(500).json({
    //         error: err
    //     });
    // });
};
var getAllUsers = function (req, res) {
    user_1.default.find()
        // .select('-password')
        .exec()
        .then(function (users) {
        return res.status(200).json({
            response: { users: users },
            isOK: true,
            message: 'get all users successfully'
        });
    })
        .catch(function (error) {
        return res.status(500).json({
            message: error.message,
            isOK: false
            // error
        });
    });
};
var deleteUser = function (req, res) {
    var id = req.params.uid;
    user_1.default.findByIdAndRemove(id)
        .exec()
        .then(function (data) {
        if (!data) {
            res.status(404).send({
                message: "user id=" + id + " was not found"
            });
        }
        else {
            res.status(200).json({
                message: 'user deleted successfully'
            });
        }
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
            // error: err
        });
    });
};
var resetPassword = function (req, res) {
    var _a;
    if (!req.body) {
        return res.status(400).send({
            message: 'password to reset can not be empty'
        });
    }
    var id = req.params.uid;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // if (token) {
    //     const decoded = jwt.verify(token, config.server.token.secret);
    //     const userId = decoded.data.userId;
    // }
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, function (error) {
            if (error) {
                return res.status(404).json({
                    message: error
                    // error
                });
            }
            else {
                user_1.default.findByIdAndUpdate(id, { password: req.body.password }, { useFindAndModify: false })
                    .then(function (data) {
                    if (!data) {
                        res.status(404).send({
                            message: "user id=" + id + " was not found"
                        });
                    }
                    else
                        res.send({ message: 'successfully reset' });
                })
                    .catch(function () {
                    res.status(500).send({
                        message: 'catch error and cannot reset'
                    });
                });
            }
        });
    }
    else {
        return res.status(401).json({
            message: 'this token is unauthorized'
        });
    }
};
var forgetPassword = function (req, res) {
    var _a = req.body, email = _a.email, answer1 = _a.answer1, answer2 = _a.answer2, answer3 = _a.answer3;
    user_1.default.find({ email: email })
        .exec()
        .then(function (users) {
        if (users.length !== 1) {
            return res.status(401).json({
                message: 'user is not verified'
            });
        }
        if (answer1 !== users[0].answer1 || answer2 !== users[0].answer2 || answer3 !== users[0].answer3) {
            return res.status(401).json({
                message: 'answer do not match'
            });
        }
        else {
            authJWT_1.default(users[0], function (_error, token) {
                if (_error) {
                    return res.status(500).json({
                        message: _error.message
                        // error: _error
                    });
                }
                else if (token) {
                    return res.status(200).json({
                        message: 'user is verified successfully',
                        response: {
                            token: token,
                            user: users[0]
                        }
                    });
                }
            });
        }
    })
        .catch(function (err) {
        console.log(err);
        res.status(500).json({
            // error: err
            message: err.message
        });
    });
};
/*
const logout = (req: Request, res: Response, next: NextFunction) => {
    // let token = req.headers.authorization?.split(' ')[1];
    // res.status(200).send({ auth: false, token: null });
    // req.logout();
    // res.redirect('/');
};
*/
var getUserById = function (req, res) {
    var id = req.params.uid;
    user_1.default.findById(id)
        .exec()
        .then(function (data) {
        if (!data)
            res.status(404).send({ message: "user id=" + id + " was not found" });
        else
            res.status(200).send({
                response: { data: data },
                isOK: true,
                message: 'get user by ID successfully'
            });
    })
        .catch(function () {
        res.status(500).send({ message: 'catch error and cannot get' });
    });
};
exports.default = { validateToken: validateToken, register: register, login: login, getAllUsers: getAllUsers, deleteUser: deleteUser, resetPassword: resetPassword, forgetPassword: forgetPassword, getUserById: getUserById };
