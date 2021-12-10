"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('seasonNo')
        .not()
        .isEmpty()
        .withMessage('Season number must be provided!'),
    (0, express_validator_1.body)('description')
        .not()
        .isEmpty()
        .withMessage('Season description must be provided!'),
];
exports.SeasonValidator = validator;
