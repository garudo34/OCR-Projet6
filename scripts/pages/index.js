class IndexApp {
    constructor() {
        this.$photographersWrapper = document.querySelector('.photographer_section')
        this.photographerApi = new PhotographerApi('./data/photographers.json')
    }

    async main() {
        const photographersData = await this.photographerApi.getPhotographers()
        console.log(photographersData)
        const { photographers } = photographersData;

        photographers
            .map(photographer => new Photographer(photographer))
            .forEach(photographer => {
                const Template = new PhotographerCard(photographer)
                this.$photographersWrapper.appendChild(
                    Template.createPhotographerCard()
                )
            })
    }
}

const app = new IndexApp()
app.main()