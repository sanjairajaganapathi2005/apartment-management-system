function validateMiddleware(schema) {
    return function middlewareHandler(req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: false,
                message: 'Payload validation failed: ' + error.details[0].message
            });
        }
        next();
    };
}

module.exports = validateMiddleware;
