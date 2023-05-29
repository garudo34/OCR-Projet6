class MediaCard {
    constructor(media, photographer) {
        this._media = media
        this._photographer = photographer
    }

    createMediaCard() {
        const $wrapper = document.createElement('a')
        $wrapper.setAttribute('href', '#');
        let $card;
        let src = '';
        
        if (this._media.image) {
            src = `./assets/images/photographers/${this._photographer.name}/${this._media.image}`;
            $card = `
                <figure>
                    <img src="${src}" class="card-media" data-id="${this._media.id}" alt="${this._media.title}">
                    <figcaption>
                        <span class="media-name">${this._media.title}</span>
                        <span class="media-like">${this._media.likes}</span>
                    </figcaption>
                </figure>
            `
        } else if (this._media.video) {
            src = `./assets/images/photographers/${this._photographer.name}/${this._media.video}`;
            $card = `
                <figure>
                    <video controls class="card-media" data-id="${this._media.id}"   alt="${this._media.title}">
                        <source src="${src}" type="video/mp4">
                    </video>
                    <figcaption>
                        <span class="media-name">${this._media.title}</span>
                        <span class="media-like">${this._media.likes}</span>
                    </figcaption>
                </figure>
            `
        }
        
        $wrapper.innerHTML = $card
        return $wrapper
    }
}