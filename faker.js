const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function createCategoryIfNotExists(categoryName) {
    let category = await prisma.category.findUnique({
        where: { name: categoryName },
    });

    if (!category) {
        category = await prisma.category.create({
            data: { name: categoryName },
        });
    }

    return category;
}

async function createPostWithCategory(categoryId) {
    return await prisma.post.create({
        data: {
            title: faker.lorem.sentence(),
            slug: faker.lorem.slug(),
            image: faker.image.url(),
            content: faker.lorem.paragraphs(),
            published: faker.datatype.boolean(),
            categoryId: categoryId,
        },
    });
}

async function addTagsToPost(postId, tagNames) {
    for (const tagName of tagNames) {
        let tag = await prisma.tag.findUnique({
            where: { name: tagName },
        });

        if (!tag) {
            tag = await prisma.tag.create({
                data: { name: tagName },
            });
        }

        await prisma.post.update({
            where: { id: postId },
            data: {
                tags: {
                    connect: { id: tag.id },
                },
            },
        });
    }
}

async function generateData(numberOfPosts = 10) {
    for (let i = 0; i < numberOfPosts; i++) {
        const category = await createCategoryIfNotExists(faker.lorem.word());
        const post = await createPostWithCategory(category.id);
        await addTagsToPost(post.id, [faker.lorem.word(), faker.lorem.word()]);
    }
}

generateData().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
