function createUniqueSlug(title) {
    // Rimuoviamo i caratteri speciali e li sostituiamo con i trattini
    const normalizedTitle = title
        .toLowerCase()
        .replace(/[^a-z0-9]/gi, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

    return `${normalizedTitle}`;
}

module.exports = createUniqueSlug;