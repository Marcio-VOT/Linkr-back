export function validateQuerySchema(schema) {
  return (req, res, next) => {
    const { value, error: err } = schema.validate(req.query, {
      abortEarly: false,
    });

    if (err) {
      const errorMessages = err.details.map((err) => err.message);
      return res.status(422).send(errorMessages);
    }
    req.query = { ...value };
    next();
  };
}
