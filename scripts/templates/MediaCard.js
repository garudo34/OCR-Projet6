class MediaCard {
    constructor(media, photographer) {
        this._media = media
        this._photographer = photographer
        this._likes = []
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
                        <span class="media-like" tabindex="0">${this._media.likes}</span>
                    </figcaption>
                </figure>
            `
        } else if (this._media.video) {
            src = `./assets/images/photographers/${this._photographer.name}/${this._media.video}`;
            $card = `
                <figure>
                    <video controls class="card-media" data-id="${this._media.id}" alt="${this._media.title}">
                        <source src="${src}" type="video/mp4">
                    </video>
                    <figcaption>
                        <span class="media-name">${this._media.title}</span>
                        <span class="media-like" tabindex="0">${this._media.likes}</span>
                    </figcaption>
                </figure>
            `
        }

        $wrapper.innerHTML = $card

        const $likeSpan = $wrapper.querySelector('.media-like')

        $likeSpan.addEventListener('click', this.like.bind(this), true)
        $likeSpan.addEventListener('keydown', this.onKeyDown.bind(this), true)

        return $wrapper
    }

    onKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.like(e)
        }
    }

    like(e) {
        e.preventDefault()
        e.stopPropagation()
        if (this._likes.includes(this._media.id)) {
            return console.log('Vous avez déjà liké ce media')
        }
        const $total_likes = document.querySelector('.bottom-like')
        $total_likes.textContent = parseInt($total_likes.textContent) + 1
        e.target.textContent = parseInt(e.target.textContent) + 1
        this._likes.push(this._media.id)
    }
}