const Joi = require('joi')

const messageSchema = Joi.object({
    sender: Joi.string().min(1).required().messages({
        'string.empty':'Sender cannot be empty',
        'any.required': 'Sender is required'
    }),
    message: Joi.string().min(1).required().messages({
        'string.empty': 'Message cannot be empty',
        'any.required': 'Message is required'
    })
})

module.exports = messageSchema;