class PhotographerProfile {
    constructor(photographer) {
        this._photographer = photographer
        
    }

    createPhotographerProfile() {
        const $wrapper = document.createElement("div")
        $wrapper.classList.add('profile')

        const photographerProfile = `
            <div class="profile_description">
                <h1 class="profile_name">${this._photographer.name}</h1>
                <p class="profile_location">${this._photographer.city}, ${this._photographer.country}</p>
                <p class="profile_tagline">${this._photographer.tagline}</p>
            </div>
            <button class="contact_button" aria-label="Contact Me" >Contactez-moi</button>
            <img class="profile_portrait" src="${this._photographer.portrait}" alt="${this._photographer.name}">`
        $wrapper.innerHTML = photographerProfile
        return $wrapper
    }
}