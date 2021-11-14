"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelValidator = void 0;
var express_validator_1 = require("express-validator");
var validator = [
    (0, express_validator_1.body)('name')
        .not()
        .isEmpty()
        .withMessage('Channel name must be provided!'),
    (0, express_validator_1.body)('channelNum')
        .not()
        .isEmpty()
        .withMessage('Channel number must be provided!')
        .isNumeric()
        .withMessage('Channel number must be a valid numeric value!'),
    (0, express_validator_1.body)('galleryIds')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 channel image must be provided!'),
    (0, express_validator_1.body)('showUrl')
        .not()
        .isEmpty()
        .withMessage('Channel show URL must not be empty!'),
    (0, express_validator_1.body)('live')
        .not()
        .isEmpty()
        .withMessage('Channel is live or not must be provided'),
];
exports.ChannelValidator = validator;
