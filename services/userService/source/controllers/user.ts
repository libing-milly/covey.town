import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import logging from '../config/logging';
import User from '../models/user';
import signJWT from '../functions/authJWT';
import jwt from 'jsonwebtoken';
import config from '../config/config';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'token is validated, this user is verified.');

    return res.status(200).json({
        message: 'user token is verified successfully'
    });
};

const register = (req: Request, res: Response, next: NextFunction): void => {
    let { email, password, question1, answer1, question2, answer2, question3, answer3 } = req.body;

    const _user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: email,
        password: password,
        question1: question1,
        answer1: answer1,
        question2: question2,
        answer2: answer2,
        question3: question3,
        answer3: answer3
    });

    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'email already exists'
                });
            } else {
                return _user
                    .save()
                    .then((user) => {
                        return res.status(201).json({
                            response: { user },
                            message: 'register successfully',
                            isOK: true
                        });
                    })
                    .catch((error) => {
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

const login = (req: Request, res: Response, next: NextFunction): void => {
    let { email, password } = req.body;

    User.find({ email })
        .exec()
        .then((users) => {
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
            } else {
                // if (error) {
                //     return res.status(401).json({
                //         message: 'password does not match'
                //     });
                // } else if (result) {
                signJWT(users[0], (_error, token) => {
                    if (_error) {
                        return res.status(500).json({
                            message: _error.message
                            // error: _error
                        });
                    } else if (token) {
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
        .catch((err) => {
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

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        // .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({
                response: { users },
                isOK: true,
                message: 'get all users successfully'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                isOK: false
                // error
            });
        });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.uid;

    User.findByIdAndRemove(id)
        .exec()
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `user id=${id} was not found`
                });
            } else {
                res.status(200).json({
                    message: 'user deleted successfully'
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: err.message
                // error: err
            });
        });
};

const resetPassword = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'password to reset can not be empty'
        });
    }

    const id = req.params.uid;

    let token = req.headers.authorization?.split(' ')[1];
    // if (token) {
    //     const decoded = jwt.verify(token, config.server.token.secret);
    //     const userId = decoded.data.userId;
    // }

    if (token) {
        jwt.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error
                    // error
                });
            } else {
                User.findByIdAndUpdate(id, { password: req.body.password }, { useFindAndModify: false })
                    .then((data) => {
                        if (!data) {
                            res.status(404).send({
                                message: `user id=${id} was not found`
                            });
                        } else res.send({ message: 'successfully reset' });
                    })
                    .catch((err) => {
                        res.status(500).send({
                            message: 'catch error and cannot reset'
                        });
                    });
            }
        });
    } else {
        return res.status(401).json({
            message: 'this token is unauthorized'
        });
    }
};

const forgetPassword = (req: Request, res: Response, next: NextFunction) => {
    let { email, answer1, answer2, answer3 } = req.body;

    User.find({ email })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'user is not verified'
                });
            }

            if (answer1 !== users[0].answer1 || answer2 !== users[0].answer2 || answer3 !== users[0].answer3) {
                return res.status(401).json({
                    message: 'answer do not match'
                });
            } else {
                signJWT(users[0], (_error, token) => {
                    if (_error) {
                        return res.status(500).json({
                            message: _error.message
                            // error: _error
                        });
                    } else if (token) {
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
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                // error: err
                message: err.message
            });
        });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
    // let token = req.headers.authorization?.split(' ')[1];
    // res.status(200).send({ auth: false, token: null });
    // req.logout();
    // res.redirect('/');
};

const getUserById = (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params.uid;

    User.findById(id)
        .exec()
        .then((data) => {
            if (!data) res.status(404).send({ message: `user id=${id} was not found` });
            else
                res.status(200).send({
                    response: { data },
                    isOK: true,
                    message: 'get user by ID successfully'
                });
        })
        .catch((err) => {
            res.status(500).send({ message: 'catch error and cannot get' });
        });
};

export default { validateToken, register, login, getAllUsers, deleteUser, resetPassword, forgetPassword, getUserById };
