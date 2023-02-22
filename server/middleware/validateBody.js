const httpError = require("../utilities/httpError");

const validateBody = schema => {
  const func = (req, _, next) => {
    const formData = req.body;
    const { error } = schema.validate(formData);
    if (error) {
      throw httpError(400, error.message);
    }
    next();
  };

  return func;
};

module.exports = validateBody;
