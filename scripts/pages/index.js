    async function getPhotographers() {
        try {
            let response = await fetch('./data/photographers.json');
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }
            return await response.json();
        } catch (error) {
            console.error("Error:", error);
            return { photographers: [] }
        }


    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const {
            photographers
        } = await getPhotographers();
        displayData(photographers);
    };

    init();