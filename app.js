/* Esercizio
Partendo dall’esercizio di ieri, aggiungiamo l’autenticazione al nostro progetto!

-Create tutto il necessario(Model, Controller, rotte e validazioni) per implementare le due funzionalità principali:
-Creazione nuovo utente: rotta POST / register
-Login utente: rotta POST / login

-Proteggete, attraverso un middleware che verifichi il token JWT passato nell’header della richiesta, le rotte di creazione, modifica e cancellazione della risorsa Post.

Aggiungete la policy CORS per consentire a qualunque dominio di accedere alle API(tanto siamo in locale
    BONUS:
Aggiungete una relazione one - to - many fra i modelli User e Post.
Aggiungete un middleware che verifichi che un utente possa modificare o cancellare solo i Post a lui associati, altrimenti restituisca un errore 403. */

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const postsRouter = require("./routers/posts");
const authRouter = require("./routers/auth");

/* const errorsHandler = require("./middlewares/errorsHandler");
const routeNotFound = require("./middlewares/routeNotFound");
 */

const app = express();

dotenv.config();

app.use(express.json()); // Per parsing di JSON

//cors
app.use(cors());

// registro le rotte per i posts
app.use("/posts", postsRouter);
app.use("", authRouter) // registriamo le rotte senza alcun prefisso



//errori
/* app.use(routeNotFound);

app.use(errorsHandler); */

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});
