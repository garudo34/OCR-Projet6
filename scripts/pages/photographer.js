class PhotographerApp {
    constructor() {
        this.$profileWrapper = document.querySelector(".photograph-header");
        this.$mediasWrapper = document.querySelector(".photograph-medias");
        this.photographerApi = new PhotographerApi('./data/photographers.json')
        this.photographerId = (new URL(document.location)).searchParams.get('id')
        this.photographer = null
        this.allMedias = []
        this.totalLikes=0
        this.likes = []
    }

    async main() {
        const photographersData = await this.photographerApi.getPhotographers()
        const {
            photographers,
            media
        } = photographersData;

        // on récupère les données du photographe
        this.photographer = this.getPhotographer(photographers);
        this.displayProfile(this.photographer);

        // on récupère les medias du photographe depuis le photographeId
        this.getMediasOfPhotographer(media);

        //on affiche le filtre custom-select
        SelectFilter.init(this.allMedias)
        // on affiche les card des medias
        this.displayMedias(this.photographer)

        // on initialise le formulaire de contact
        ContactForm.init()

        // on initialise la lightbox
        Lightbox.init()

        const $filter = document.getElementById('custom-select')
        $filter.addEventListener('change', this.order.bind(this))
        
    }


    order(e) {
        switch (e.target.value) {
            case 'title':
                this.allMedias.sort((a, b) => a.title.localeCompare(b.title))
                break;
            case 'like':
                this.allMedias.sort((a, b) => b.likes - a.likes)
                break;
            case 'date':
                this.allMedias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                break;
        }
        this.displayMedias(this.photographer)
        Lightbox.init()

    }

    displayProfile(photographer) {
        let photographerObject = new Photographer(photographer);
        const Template = new PhotographerProfile(photographerObject);
        this.$profileWrapper.appendChild(Template.createPhotographerProfile());
    }

    getPhotographer(photographers) {
        return photographers.find((photographer) => photographer.id === Number(this.photographerId));
    }


    getMediasOfPhotographer(mediaData) {
        let medias = mediaData.filter((media) => media.photographerId === Number(this.photographerId))
        this.allMedias = medias.map(media => new MediasFactory(media))
    }

    
    displayMedias(photographer) {
        const $medias_section = document.querySelector('.photograph-medias')
        $medias_section.innerHTML = ""
        this.allMedias.forEach(media => {
            let mediaObject = new MediasFactory(media)
            const Template = new MediaCard(mediaObject, photographer)
            this.$mediasWrapper.appendChild(Template.createMediaCard());
            this.totalLikes += Number(media.likes)
        })

        const $likesSpan = document.querySelector('.bottom-like');
        $likesSpan.textContent = this.totalLikes;
        const $priceSpan = document.querySelector('.bottom-price');
        $priceSpan.textContent = `${photographer.price}€ / jour`;
    }

}

const app = new PhotographerApp()
app.main()