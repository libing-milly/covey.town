"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var logging_1 = __importDefault(require("../config/logging"));
var NAMESPACE = 'Authorization';
var extractJWT = function (req, res, next) {
    var _a;
    logging_1.default.info(NAMESPACE, 'is validating token');
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (token) {
        jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, function (error, decoded) {
            if (error) {
                return res.status(404).json({
                    message: error,
                    error: error
                });
            }
            else {
                res.locals.jwt = decoded;
                next();
            }
        });
    }
    else {
        return res.status(401).json({
            message: 'this token is unauthorized'
        });
    }
};
exports.default = extractJWT;
