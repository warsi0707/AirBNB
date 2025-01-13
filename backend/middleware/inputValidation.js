const { ZodError } = require("zod")
const { z } = require("zod")


const InputValidation = (schema) => (req, res, next) => {
    const validationResult = schema.safeParse(req.body)

    if (!validationResult.success) {
        return res.status(404).json({
            validationMessage: validationResult.error.issues.map((item) => item.message),
        })
    }
    req.body = validationResult.data
    next()
}

module.exports = InputValidation