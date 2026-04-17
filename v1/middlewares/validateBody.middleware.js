export const validateBodyMiddleware = (schema) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body, {
      abortEarly: false,
    });
    console.log(error);
    if (error) {
      return res.status(400).json({ error: error.details });
    }
    req.validatedBody = value;
    next();
  };
};
