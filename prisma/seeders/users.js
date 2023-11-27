const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const users = [
  {
    name: "Giuseppe Verdi",
    email: "beppe@gmail.com",
    password: "Password4567!",
  },
  {
    name: "Giulia Bianchi e Rossi",
    email: "giulia999@gmail.com",
    password: "Password890!",
  },
  {
    name: "Marco Neri",
    email: "marco.neri@example.com",
    password: "SecurePass123!",
  },
  {
    name: "Francesca Esposito",
    email: "francesca_espo@example.it",
    password: "MyPass789!",
  },
  {
    name: "Luigi Rossi",
    email: "luigi.rossi88@example.it",
    password: "Password1234!",
  },
  {
    name: "Sofia Conti",
    email: "sofia.conti@example.com",
    password: "ContiPassword!",
  },
];


// Funzione IIFE che si auto invoca all'avvio del file
(async function () {
  await prisma.user.createMany({
    data: users.map((user) => {
      user.password = bcrypt.hashSync(user.password, 10);
      return user;
    }),
  });
})();
