"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('name')
        .not()
        .isEmpty()
        .withMessage('Movie name must be provided!'),
    (0, express_validator_1.body)('description')
        .not()
        .isEmpty()
        .withMessage('Movie description must be provided!'),
    (0, express_validator_1.body)('gallery')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 movie image must be provided!'),
    (0, express_validator_1.body)('url')
        .not()
        .isEmpty()
        .withMessage('Movie URL must not be empty!'),
    (0, express_validator_1.body)('genre')
        .not()
        .isEmpty()
        .withMessage('Movie genre must be provided!'),
    (0, express_validator_1.body)('duration')
        .not()
        .isEmpty()
        .withMessage('Movie Duration must be provided!'),
];
exports.MovieValidator = validator;
