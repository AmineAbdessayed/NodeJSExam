const yup = require("yup");

const validateHotel = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      adresse: yup.string().required(), 
    });

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
};

module.exports = validateHotel;