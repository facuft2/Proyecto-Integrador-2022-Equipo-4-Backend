const Ajv = require('ajv');

const validator = new Ajv({ allErrors: true, async: true });

const validateInput = (inputValidator, ctx = 'body') => (req, res, next) => {
  const validate = validator.compile(inputValidator);
  const valid = validate(req[`${ctx}`]);

  if (!valid) {
    console.log(`AJV error: {${JSON.stringify(validate.errors)}}\
  for data: ${typeof req.body === 'object' ? JSON.stringify(req.body) : req.body}`);

    return res.status(400).send({
      error: validate.errors[0].message,
    });
  }

  return next();
};

module.exports = validateInput;