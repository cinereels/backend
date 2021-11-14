import { body } from 'express-validator';

const validator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Channel name must be provided!'),
    body('channelNum')
        .not()
        .isEmpty()
        .withMessage('Channel number must be provided!')
        .isNumeric()
        .withMessage('Channel number must be a valid numeric value!'),
    body('galleryIds')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 channel image must be provided!'),
    body('showUrl')
        .not()
        .isEmpty()
        .withMessage('Channel show URL must not be empty!'),
    body('live')
        .not()
        .isEmpty()
        .withMessage('Channel is live or not must be provided'),
];

export { validator as ChannelValidator };