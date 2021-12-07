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
exports.SignupRouter = void 0;
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var user_1 = require("../../models/user");
var auth_1 = require("../../validators/auth");
var validate_request_1 = require("../../middlewares/validate-request");
var nodemailer_1 = require("nodemailer");
var verifier_1 = require("../../models/verifier");
var Router = express_1.default.Router();
exports.SignupRouter = Router;
var randomNum = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
Router.post('/api/auth/signup', auth_1.AuthValidator, validate_request_1.validateRequest, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, verifierId, verificationCode, verifier, passwordHash, color, isAdmin, user, token, expiryDate, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password, verifierId = _a.verifierId, verificationCode = _a.verificationCode;
                return [4 /*yield*/, verifier_1.Verifier.findById(verifierId)];
            case 1:
                verifier = _b.sent();
                if (!verifier || (verifier.code !== verificationCode)) {
                    throw new Error('Invalid verification code!');
                }
                return [4 /*yield*/, bcryptjs_1.default.hash(password, 12)];
            case 2:
                passwordHash = _b.sent();
                color = randomNum(0, 14);
                isAdmin = false;
                user = user_1.User.build({
                    email: email,
                    password: passwordHash,
                    color: color,
                    isAdmin: isAdmin
                });
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                token = jsonwebtoken_1.default.sign({ email: email, id: user.id, isAdmin: isAdmin }, 'secret', {
                    expiresIn: '24h',
                });
                expiryDate = Math.round(new Date().getTime() / 1000) + 24 * 3600;
                res.status(201).send({
                    message: 'User signed up successfully',
                    token: token,
                    id: user.id,
                    expiryDate: expiryDate,
                    isAdmin: isAdmin,
                });
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
Router.post('/api/auth/verify', auth_1.AuthValidator, validate_request_1.validateRequest, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, existingUser, transporter, verificationCode, verifier, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = req.body.email;
                return [4 /*yield*/, user_1.User.findOne({ email: email })];
            case 1:
                existingUser = _a.sent();
                if (existingUser) {
                    throw new Error("Email address already exists!");
                }
                transporter = (0, nodemailer_1.createTransport)({
                    service: 'Gmail',
                    auth: {
                        user: 'cinereelsapp@gmail.com',
                        pass: 'startup247'
                    }
                });
                verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
                verifier = verifier_1.Verifier.build({
                    code: verificationCode,
                    email: email,
                });
                return [4 /*yield*/, verifier.save()];
            case 2:
                _a.sent();
                return [4 /*yield*/, transporter.sendMail({
                        from: 'cinereelsapp@gmail.com',
                        to: email,
                        subject: 'Email verification of your cinereels account',
                        html: "\n                <h4>This is an email verification mail sent for verifying your provided email address. Below provided is a 6 digit verification code for completing the sign-up process. Please enter the following verification code on the cinereels application.</h4>\n                <h1>".concat(verificationCode, "</h1>\n            "),
                    })];
            case 3:
                _a.sent();
                res.status(201).send({
                    message: 'Verification code generated',
                    verifierId: verifier.id,
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
