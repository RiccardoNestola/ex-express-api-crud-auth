const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const AuthError = require("../exceptions/AuthError");

async function register(req, res) {


  const sanitizedData = matchedData(req);
  sanitizedData.password = await bcrypt.hash(sanitizedData.password, 10);

  const user = await prisma.user.create({
    data: {
      ...sanitizedData,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  // genero il token JWT
  const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ user, token });

}

async function login(req, res, next) {

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new AuthError("Utente non trovato"));
  }

  const passMatch = await bcrypt.compare(password, user.password);

  if (!passMatch) {
    return next(new AuthError("Password errata"));
  }

  const token = jsonwebtoken.sign(user, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  delete user.password;

  res.json({ user, token });
}



module.exports = {
  register,
  login
};
