"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('name')
        .not()
        .isEmpty()
        .withMessage('Episode name must be provided!'),
    (0, express_validator_1.body)('episodeNo')
        .not()
        .isEmpty()
        .withMessage('Episode number must be provided!'),
    (0, express_validator_1.body)('description')
        .not()
        .isEmpty()
        .withMessage('Episode description must be provided!'),
    (0, express_validator_1.body)('gallery')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 episode image must be provided!'),
    (0, express_validator_1.body)('url')
        .not()
        .isEmpty()
        .withMessage('Episode URL must not be empty!'),
    (0, express_validator_1.body)('duration')
        .not()
        .isEmpty()
        .withMessage('Episode Duration must be provided!'),
];
exports.EpisodeValidator = validator;
