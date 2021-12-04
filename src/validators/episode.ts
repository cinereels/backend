import { body } from 'express-validator';

const validator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Episode name must be provided!'),
    body('episodeNo')
        .not()
        .isEmpty()
        .withMessage('Episode number must be provided!'),
    body('description')
        .not()
        .isEmpty()
        .withMessage('Episode description must be provided!'),
    body('gallery')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 episode image must be provided!'),
    body('url')
        .not()
        .isEmpty()
        .withMessage('Episode URL must not be empty!'),
    body('duration')
        .not()
        .isEmpty()
        .withMessage('Episode Duration must be provided!'),
];

export { validator as EpisodeValidator };