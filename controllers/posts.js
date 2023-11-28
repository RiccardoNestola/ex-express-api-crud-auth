const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createUniqueSlug = require("../functions/createUniqueSlug");
const ValidationError = require("../exceptions/ValidationError");
const { validationResult } = require("express-validator");

async function index(req, res) {

  const data = await prisma.post.findMany({
  });

  return res.json(data);
}

async function show(req, res, next) {

  try {

    const { slug } = req.params;
    const data = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        tags: true,
        category: true
      }
    });
    
    if (!data) {
      throw new Error("Post not found");
    }
    
    return res.json(data);
  } catch (error) {
    next(error);
  }
}


async function store(req, res, next) {

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return next(
      new ValidationError("Controllare i dati inseriti", validation.array())
    );
  }



  const datiInIngresso = req.body;
  console.log(datiInIngresso);

  if (!datiInIngresso || !datiInIngresso.title) {
    return res.status(400).send("Titolo del post mancante o dati di ingresso non validi");
  }

/*   if (!Array.isArray(datiInIngresso.tags)) {
    return res.status(400).send("I tag devono essere un array");
  } */

  const UniqueSlug = createUniqueSlug(datiInIngresso.title);

  try {
    const newPost = await prisma.post.create({
      data: {
        title: datiInIngresso.title,
        slug: UniqueSlug,
        image: datiInIngresso.image,
        content: datiInIngresso.content,
        published: datiInIngresso.published,
        categoryId: datiInIngresso.categoryId,
      
        /* userId: datiInIngresso.userId, */
       /*  tags: {
          create: datiInIngresso.tags.map((idTags) => ({
            name: idTags,
          })),
        } */},
      
      include: {
        tags: true,
        category: true
      }
      
      
      
      });

    return res.json(newPost);
  } catch (error) {
    console.error(error)
    return res.status(500).send("Errore durante la creazione del post");
  }
}


async function update(req, res) {
  const { id } = req.params;
  const datiInIngresso = req.body;

  console.log("Id ricevuto:", id);
  console.log("Dati in ingresso:", datiInIngresso);

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    console.log("Post trovato:", post);

    if (!post) {
      console.error('Post non trovato per:', id);
      return res.status(404).send('Not found');
    }

    const postAggiornato = await prisma.post.update({
      data: datiInIngresso,
      where: {
        id: parseInt(id),
      },
    });

    console.log("Post aggiornato:", postAggiornato);

    return res.json(postAggiornato);
  } catch (error) {
    console.error("Errore durante l'aggiornamento del post:", error);
    return res.status(500).send('Errore interno del server');
  }
}


async function destroy(req, res) {
  const { id } = req.params;

  try {
    await prisma.post.delete({
      where: {
        id: parseInt(id)
      },
    });

    return res.json({ message: "Post eliminato" });
  } catch (error) {
    console.error("Errore durante l'eliminazione del post:", error);
    return res.status(500).send('Errore interno del server');
  }
}


module.exports = {
  index,
  show,
  store,
  update,
  destroy
};
