const httpError = require("../utilities/httpError");

const validateBody = schema => {
  const func = async (req, _, next) => {
    try {
      const formData = req.body;
      const { error } = schema.validate(formData);
      if (error) {
        throw httpError(400, error.message);
      }
      next();
    } catch (err) {
      next(err);
    }
  };

  return func;
};

module.exports = validateBody;
