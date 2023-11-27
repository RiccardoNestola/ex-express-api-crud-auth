const AuthError = require("../exceptions/AuthError");
const jsonwebtoken = require("jsonwebtoken");

/**
 *
 * @param {import("express").Request} req
 * @param {*} res
 * @param {*} next
 */
module.exports = (req, res, next) => {
  
  const bearer = req.headers.authorization;


  if (!bearer || !bearer.startsWith("Bearer ")) {
    throw new AuthError("Bearer token mancante o malformato");
  }


  const token = bearer.split(" ")[1];


  try {
    const user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    
    throw new AuthError("Token non valido o scaduto");
  }

  
  req["user"] = user;


  next();
};

