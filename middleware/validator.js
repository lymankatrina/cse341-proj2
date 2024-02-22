const { body, validationResult } = require('express-validator');
const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const ownerValidationRules = (method) => {
  const rules = [
    // first name validation
    body('firstName')
      .notEmpty()
      .isLength({ min: 2, max: 20 })
      .withMessage('Valid first name is required'),
    // last name validation
    body('lastName')
      .notEmpty()
      .isLength({ min: 2, max: 20 })
      .withMessage('Valid last name is required'),
    // birthdate validation
    body('birthdate')
      .notEmpty()
      .matches(/^(0[1-9]|1[1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])(\/|-)(19|20)\d{2}$/)
      .withMessage('Must be a valid date MM/DD/YYYY'),
    // phone number validation
    body('phone')
      .notEmpty()
      .isInt()
      .isLength({ min: 10, max: 10 })
      .withMessage('Must be a 10 digit US Phone Number without any spaces, dashes, or dots.'),
    // address validation
    body('address')
      .notEmpty()
      .isLength({ min: 2, max: 30 })
      .withMessage('Valid address is required'),
    // city validation
    body('city').notEmpty().isLength({ min: 2, max: 30 }).withMessage('Valid City is required'),
    // state validation
    body('state')
      .notEmpty()
      .isLength({ min: 2, max: 2 })
      .withMessage('Enter US State Abbreviation, example, AL'),
    // zip code validation
    body('zip')
      .notEmpty()
      .isInt()
      .isLength({ min: 5, max: 5 })
      .withMessage('Enter a five digit US Postal Code'),
    // pets validation
    body('pets')
      .optional({ checkFalsy: true })
      .isArray()
      .custom(async (value) => {
        if (!value) {
          return true; // Skip validation if value is empty
        }

        for (let i = 0; i < value.length; i++) {
          const petId = value[i];

          if (!ObjectId.isValid(petId)) {
            throw new Error('Invalid Pet Id');
          }

          const pet = await mongodb
            .getDb()
            .db()
            .collection('pets')
            .findOne({ _id: new ObjectId(petId) });

          if (!pet) {
            throw new Error(`Pet not found for id: ${petId}`);
          }
        }

        return true; // Validation passed
      })
  ];

  // Add email validation rule for POST requests
  if (method === 'POST') {
    rules.push(
      body('email')
        .notEmpty()
        .isEmail()
        .withMessage('Must be a valid email')
        .custom(async (value) => {
          const existingOwner = await mongodb
            .getDb()
            .db()
            .collection('owners')
            .findOne({ email: value });

          if (existingOwner) {
            throw new Error('Owner with this email address already exists');
          }

          return true; // Validation passed
        })
    );
  }

  return rules;
};

const petValidationRules = () => {
  return [
    // first name validation
    body('petName')
      .notEmpty()
      .isLength({ min: 2, max: 30 })
      .withMessage('Valid pet name is required'),
    // pet species validation
    body('species').notEmpty().isIn(['DOG', 'CAT']).withMessage('Species must be DOG or CAT'),
    // pet breed validation
    body('petBreed')
      .notEmpty()
      .isArray({ min: 1 })
      .isLength({ min: 4, max: 45 })
      .withMessage('Enter the pet breed or breeds')
      .custom((value) => {
        if (Array.isArray(value) && value.length === 0) {
          throw new Error('Enter at least one pet breed');
        }
        return true;
      }),
    // mixed breed validation
    body('mixedBreed').notEmpty().isBoolean().withMessage('Response must be either true or false'),
    // pet markings validation
    body('petMarkings')
      .notEmpty()
      .isLength({ min: 2, max: 45 })
      .withMessage('Enter the pets distinguishing markings or colors. Limit 45 characters'),
    // pet sex validation
    body('petSex')
      .notEmpty()
      .isIn(['MALE', 'FEMALE'])
      .withMessage('Pet sex must be either MALE or FEMALE'),
    // pet image validation
    body('petImage').isURL().withMessage('Provide a URL for the pet image'),
    // pet owner validation
    body('petOwner')
      .optional({ checkFalsy: true })
      .custom(async (value) => {
        if (!value) {
          return true; // Skip validation if value is empty
        }

        if (!ObjectId.isValid(value)) {
          throw new Error('Invalid ObjectId');
        }

        const owner = await mongodb
          .getDb()
          .db()
          .collection('owners')
          .findOne({ _id: new ObjectId(value) });
        if (!owner) {
          throw new Error('Owner not found');
        }

        return true; // Validation passed
      })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  ownerValidationRules,
  petValidationRules,
  validate
};
