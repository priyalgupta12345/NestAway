const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        geometry: Joi.array().items(Joi.number()).length(2),
        category: Joi.array()
            .items(Joi.string())
            .min(1)
            .required(),
        // FIX: image is optional here
        image: Joi.object({
            url: Joi.string(),
            filename: Joi.string(),
        }).optional()
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required().min(10),
    }).required()
});
