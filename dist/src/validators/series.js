"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('name')
        .not()
        .isEmpty()
        .withMessage('Series name must be provided!'),
    (0, express_validator_1.body)('description')
        .not()
        .isEmpty()
        .withMessage('Series description must be provided!'),
    (0, express_validator_1.body)('gallery')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 series image must be provided!'),
    (0, express_validator_1.body)('genre')
        .not()
        .isEmpty()
        .withMessage('Series genre must be provided!'),
];
exports.SeriesValidator = validator;
