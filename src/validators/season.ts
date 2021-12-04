import { body } from 'express-validator';

const validator = [
    body('seasonNo')
        .not()
        .isEmpty()
        .withMessage('Season number must be provided!'),
    body('description')
        .not()
        .isEmpty()
        .withMessage('Season description must be provided!'),
    body('gallery')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 season image must be provided!'),
];

export { validator as SeasonValidator };