import { body } from 'express-validator';

const validator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Movie name must be provided!'),
    body('description')
        .not()
        .isEmpty()
        .withMessage('Movie description must be provided!'),
    body('gallery')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 movie image must be provided!'),
    body('url')
        .not()
        .isEmpty()
        .withMessage('Movie URL must not be empty!'),
    body('genre')
        .not()
        .isEmpty()
        .withMessage('Movie genre must be provided!'),
    body('duration')
        .not()
        .isEmpty()
        .withMessage('Movie Duration must be provided!'),
];

export { validator as MovieValidator };