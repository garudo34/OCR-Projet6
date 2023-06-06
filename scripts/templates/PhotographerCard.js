class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer
        
    }

    createPhotographerCard() {
        const $wrapper = document.createElement('article')

        const photographerCard = `
            <a title="page de ${this._photographer.name}" href="./photographer.html?id=${this._photographer.id}" target="blank" role="link">
                <img
                    alt="${this._photographer.name}"
                    src="${this._photographer.portrait}"
                />
                
                <h2> ${this._photographer.name}</h2>
                <div class="description">
                    <div class="location">
                        ${this._photographer.city}, ${this._photographer.country}
                    </div>
                    <div class="tagline">
                        ${this._photographer.tagline}
                    </div>
                    <div class="price">
                        ${this._photographer.price}€/jour
                    </div>
                </div>
            </a>`
        $wrapper.innerHTML = photographerCard
        return $wrapper
    }
}