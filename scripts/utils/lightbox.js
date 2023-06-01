/**
 * @property {HTMLElement} element
 * @property {string[]} images Chemins des images de la lightbox
 * @property {string} url Image actuellement affichée
 */
class Lightbox {

    static init() {
        const links = Array.from(document.querySelectorAll('.card-media'))
        const gallery = links.map(link => link.src)
        links.forEach(link => link.addEventListener('click', e => {
                e.preventDefault()
                new Lightbox(e.currentTarget.src, gallery)
            }))
    }

    /**
     * @param {string} url URL de l'image
     * @param {string[]} images Chemins des images de la lightbox
     */
    constructor(url, images) {
        this.element = this.buildDOM(url)
        this.images = images
        this.loadImage(url)
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }

    /**
     * 
     * @param {string} url URL de l'image
     */
    loadImage(url) {
        this.url = null
        const image = new Image()
        const container = this.element.querySelector('.lightbox__container')
        const loader = document.createElement('div')
        loader.classList.add('lightbox__loader')
        container.innerHTML = ''
        container.appendChild(loader)
        image.onload = () => {
            container.removeChild(loader)
            container.appendChild(image)
            this.url = url
        }
        image.src= url
    }

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    onKeyUp(e) {
        if(e.key === 'Escape') {
            this.close(e)
        } else if(e.key === 'ArrowLeft') {
            this.prev(e)
        } else if(e.key === 'ArrowRight') {
            this.next(e)
        }
    }

    /**
     * Ferme la lightbox
     * @param {MouseEvent/KeyboardEvent} e 
     */
    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
    }

    /**
     * Passe à l'image suivante
     * @param {MouseEvent/KeyboardEvent} e 
     */
    next(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        console.log(i)
        if (i === this.images.length - 1) {
            i = -1
        }
        this.loadImage(this.images[i + 1])
    }

    /**
     * Passe à l'image précédente
     * @param {MouseEvent/KeyboardEvent} e 
     */
    prev(e) {
        e.preventDefault()
        let i = this.images.findIndex(image => image === this.url)
        if (i === 0) {
            i = this.images.length
        }
        this.loadImage(this.images[i - 1])

    }


    /**
     * @param {string} url URL de l'image
     * @return {HTMLElement}
     */
    buildDOM(url) {
        const dom = document.createElement('div')
        dom.classList.add('lightbox')
        dom.innerHTML = `<button class="lightbox__close">&times;</button>
            <button class="lightbox__next">&#10095;</button>
            <button class="lightbox__prev">&#10094;</button>
            <div class="lightbox__container">
                
            </div>`
        dom.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        dom.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))

        // const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
        // const body = document.body;
        // body.style.position = 'fixed';
        // body.style.top = `-${scrollY}`;

        return dom
    }
}


