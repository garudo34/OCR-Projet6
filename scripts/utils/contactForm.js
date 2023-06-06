class ContactForm{

    static init() {
        const contactForm = document.querySelector('.contact_button')
        contactForm.addEventListener('click', e => {
            e.preventDefault()
            new ContactForm()
        })
    }
    
    constructor() {
        this.element = this.buildDOM()
        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        document.getElementById('firstname').focus()
        document.addEventListener('keyup', this.onKeyUp)
    }

    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e)
        }
    }

    close(e) {
        e.preventDefault()
        this.element.parentElement.removeChild(this.element)
        document.removeEventListener('keyup', this.onKeyUp)
    }

    send(e) {
        e.preventDefault()
        for (let element of e.target.elements) {
            if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                console.log(element.value)
                element.value = ''
            }
        }
        this.element.parentElement.removeChild(this.element)
        document.removeEventListener('keyup', this.onKeyUp)
    }

    buildDOM() {
        const dom = document.createElement('div')
        dom.setAttribute('id', 'contact_modal')
        dom.innerHTML = `<div class="modal">
            <header>
            <h1>Contactez-moi</h1>
            <img class="contact__close" src="./assets/icons/close.svg" alt="Close Contact Form" />
            </header>
            <form id="contact__form"">
                <div>
                    <label for="firstname">Prénom</label>
                    <input id="firstname" name="firstname" />
                    <label for="lastname">Nom</label>
                    <input id="lastname" name="lastname" />
                    <label for="email">Email</label>
                    <input id="email" name="email" />
                    <label for="message">Message</label>
                    <textarea id="message" name="message"></textarea>
                </div>
                <button class="contact__send" aria-label="Send">Envoyer</button>
            </form>
        </div>
        `
        dom.querySelector('.contact__close').addEventListener('click', this.close.bind(this))
        dom.querySelector('#contact__form').addEventListener('submit', this.send.bind(this))

        return dom
    }

}
