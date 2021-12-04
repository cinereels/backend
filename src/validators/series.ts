import { body } from 'express-validator';

const validator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Series name must be provided!'),
    body('description')
        .not()
        .isEmpty()
        .withMessage('Series description must be provided!'),
    body('gallery')
        .isArray({ min: 1 })
        .withMessage('Atleast 1 series image must be provided!'),
    body('genre')
        .not()
        .isEmpty()
        .withMessage('Series genre must be provided!'),
];

export { validator as SeriesValidator };