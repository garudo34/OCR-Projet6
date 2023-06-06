class Lightbox {

    static init() {
        const medias = Array.from(document.querySelectorAll('.card-media'))
        const gallery = medias.map(media => Lightbox.getSrcfromElement(media))
        
        medias.forEach(media => media.addEventListener('click', e => {
            e.preventDefault()
            new Lightbox(Lightbox.getSrcfromElement(e.currentTarget)[1], Lightbox.getSrcfromElement(e.currentTarget)[0], gallery)
        }))

        medias.forEach(function(media) {
            const linkTag = media.parentElement.parentElement

            linkTag.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    let mediaElement = e.currentTarget.querySelector('.card-media')
                    new Lightbox(Lightbox.getSrcfromElement(mediaElement)[1], Lightbox.getSrcfromElement(mediaElement)[0], gallery)
                }
            })
        })
    }

    constructor(url, mediaType, medias) {
        this.element = this.buildDOM()
        this.medias = medias
        this.loadMedia(url, mediaType)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.onKeyUp)
        document.querySelector('.lightbox__container').focus()
    }

    static getSrcfromElement(link) {
        if (link.tagName === 'IMG') {
            return [link.tagName, link.src];
        } else if (link.tagName == 'VIDEO') {
            return [link.tagName, link.firstElementChild.src];
        } else {
            return false;
        }
    }

    loadMedia(url, mediaType) {
        this.url = null;
        let media = '';
        if (mediaType === 'IMG') {
            media = document.createElement('IMG')
        } else if (mediaType === 'VIDEO') {
            media = document.createElement('VIDEO')
            media.setAttribute('controls', '')
        }
        const container = this.element.querySelector('.lightbox__container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader')
        container.innerHTML = ''
        container.appendChild(loader)
        if (mediaType === 'IMG') {
            media.onload = () => {
                container.removeChild(loader)
                container.appendChild(media)
                this.url = url
            }
        } else if (mediaType === 'VIDEO') {
            media.onloadstart = () => {
                container.removeChild(loader)
                container.appendChild(media)
                this.url = url
            }
        }
        media.src = url
    }

    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e)
        } else if (e.key === 'ArrowLeft') {
            this.prev(e)
        } else if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }

    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
    }

    next(e) {
        e.preventDefault()
        let i = this.medias.findIndex(media => media[1] === this.url)
        if (i === this.medias.length - 1) {
            i = -1
        }
        this.loadMedia(this.medias[i + 1][1], this.medias[i + 1][0])
    }

    prev(e) {
        e.preventDefault()
        let i = this.medias.findIndex(media => media[1] === this.url)
        if (i === 0) {
            i = this.medias.length
        }
        this.loadMedia(this.medias[i - 1][1], this.medias[i - 1][0])

    }


    buildDOM() {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button class="lightbox__close">&times;</button>
            <button class="lightbox__next">&#10095;</button>
            <button class="lightbox__prev">&#10094;</button>
            <div class="lightbox__container"></div>
        `
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))

        return dom
    }
}