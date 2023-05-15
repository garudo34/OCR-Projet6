function photographerFactory(data) {
    const {
        name,
        id,
        city,
        country,
        tagline,
        price,
        portrait
    } = data;

    const picture = `assets/images/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        const description = document.createElement('div');
        description.classList.add('description');
        const location = document.createElement('div');
        location.textContent = `${city}, ${country}`;
        location.classList.add('location');
        description.appendChild(location);

        const tagLine = document.createElement('div');
        tagLine.textContent = tagline;
        tagLine.classList.add('tagline');
        description.appendChild(tagLine);

        const prix = document.createElement('div');
        prix.textContent = `${price}€/jour`;
        prix.classList.add('price');
        description.appendChild(prix);

        article.appendChild(description)

        return (article);
    }
    return {
        name,
        id,
        city,
        country,
        tagline,
        price,
        picture,
        getUserCardDOM
    }
}