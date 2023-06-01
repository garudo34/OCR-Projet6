let params = (new URL(document.location)).searchParams;
let photographerId = params.get('id');
const likes = [];


(async () => {
    try {
        let response = await fetch('./data/photographers.json')
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const data = await response.json()

        // on récupère les infos du photographe depuis son id
        photographer = data.photographers.find((photographer) => photographer.id === Number(photographerId))

        // on récupère les medias du photographe depuis le photographeId
        medias = data.media.filter((media) => media.photographerId === Number(photographerId))
        const $contact_modal = document.getElementById('contact_modal')
        // on construit le header de la page profil
        displayHeader(photographer)
        displayMedias(photographer, medias)
        Lightbox.init()
        displayLikesAndPrice(medias, photographer.price)

        const selectInput = document.querySelector('#select')
        selectInput.addEventListener('change', function (e) {
            switch (e.target.value) {
                case 'title':
                    medias.sort((a, b) => a.title.localeCompare(b.title))
                    break;
                case 'like':
                    medias.sort((a, b) => b.likes - a.likes)
                    break;
                case 'date':
                    medias.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    break;
            }
            document.querySelectorAll('.mySlides').forEach(e => e.remove());
            displayMedias(photographer, medias)
        })

        addEventListener('keydown', (event) => {
            if ($contact_modal.style.visibility && $contact_modal.style.visibility === 'visible') {
                if (event.code === 'Escape') {
                    $contact_modal.style.visibility = 'hidden'
                }
            }
        })
    
    
    } catch (error) {
        console.error("Error:", error);
    }
})();

function displayHeader(photographer) {
    const {
        name,
        city,
        country,
        tagline,
        portrait
    } = photographer

    const picture = `assets/images/photographers/${portrait}`;

    const $profile_name = document.querySelector('.profile_name')
    const $profile_location = document.querySelector('.profile_location')
    const $profile_tagline = document.querySelector('.profile_tagline')
    const $profile_portrait = document.querySelector('.profile_portrait')

    $profile_name.textContent = name;
    $profile_location.textContent = `${city}, ${country}`;
    $profile_tagline.textContent = tagline;
    $profile_portrait.setAttribute("src", picture)
    $profile_portrait.setAttribute("alt", name)
}


function displayMedias(photographer, medias) {
    const $medias_section = document.querySelector('.photograph-medias')
    const $media_modal = document.getElementById('media-modal')
    
    $medias_section.innerHTML = ""
    for (const media of medias) {
        const {
            $link,
            $media_content,
            $name
        } = createMediaCard(media, photographer);

        // createMediaInLightBox($media_content, $name);

        // $link.addEventListener('click', function (event) {
        //     event.preventDefault()
        //     if (event.target.classList.contains('media-like')) {
        //         console.log('clic sur like !')
        //         return
        //     }
        //     let data_id_media = event.target.dataset.id
        //     let slide = document.querySelector(`.img-modal[data-id='${data_id_media}']`).closest(".mySlides");
        //     slide.style.display = "block";
        //     openMedia()
        // })

        $link.addEventListener('keydown', (event) => {
			if ($media_modal.style.display && $media_modal.style.display === 'block') {
				if (event.code === 'ArrowLeft') {
					return moveSlide(-1)
				}
				if (event.code === 'ArrowRight') {
					return moveSlide(1)
				}
				if (event.code === 'Escape') {
					return closeMedia()
                }
                if (event.code === 'ArrowUp') {
                    console.log('ca devrait monter')
                }
			} else {
                if (event.target.classList.contains('link-slide')) {
                    if (event.code === 'Enter') {
                        const data_id_media = event.target.querySelector('.card-media').dataset.id
                        let slide = document.querySelector(`.img-modal[data-id='${data_id_media}']`).closest(".mySlides");
                        slide.style.display = "block";
                        openMedia()
                    }
                    
                }
            }
        })
    }
}


function createMediaInLightBox($media_content, $name) {
    const $modal_content = document.querySelector('.modal-content');
    const $media_modal_slide = document.createElement('div');
    $media_modal_slide.classList.add('mySlides');
    $media_modal_slide.setAttribute('role', 'dialog')
    const $media_modal_figure = document.createElement('figure');
    const $media_modal_content = $media_content.cloneNode(true);
    $media_modal_content.classList.remove('card-media');
    $media_modal_content.classList.add('img-modal')
    const $media_modal_caption = $name.cloneNode(true);
    $media_modal_figure.appendChild($media_modal_content);
    const $media_modal_figcaption = document.createElement('figcaption');
    $media_modal_figcaption.appendChild($media_modal_caption);
    $media_modal_figure.appendChild($media_modal_figcaption)
    $media_modal_slide.appendChild($media_modal_figure);
    $modal_content.appendChild($media_modal_slide);
}

function createMediaCard(media, photographer) {
    const $medias_section = document.querySelector('.photograph-medias');
    const $media = document.createElement('figure');
    const $link = document.createElement('a');
    $link.setAttribute('href', '#');
    $link.classList.add('link-slide');
    let src = '';
    let $media_content;
    if (media.video) {
        $media_content = document.createElement('video')
        const $media_video_source = document.createElement('source')
        src = `./assets/images/photographers/${photographer.name}/${media.video}`;
        $media_video_source.src = src;
        $media_video_source.type = "video/mp4";
        $media_content.controls = true;
        $media_content.autoplay = false;
        $media_content.appendChild($media_video_source)
    } else {
        $media_content = document.createElement('img')
        src = `./assets/images/photographers/${photographer.name}/${media.image}`;
        $media_content.src = src;
    }
    $media_content.classList.add('card-media');
    const $caption = document.createElement('figcaption');
    const $name = document.createElement('span');
    $name.classList.add('media-name');
    const $like = document.createElement('span');
    $like.classList.add('media-like');
    $like.setAttribute('aria-label', 'likes')
    $media_content.dataset.id = media.id;
    $media_content.alt = media.title;

    $name.textContent = media.title;
    $like.textContent = media.likes;

    $like.addEventListener('click', function (ev) {
        ev.preventDefault()
        if (likes.includes(media.id)) {
            return console.log('Vous avez déjà liké ce media')
        }
        const $total_likes = document.querySelector('.bottom-like')
        $total_likes.textContent = parseInt($total_likes.textContent) + 1
        ev.target.textContent = parseInt(ev.target.textContent) + 1
        likes.push(media.id)
    })

    $caption.appendChild($name);
    $caption.appendChild($like);
    $media.appendChild($media_content);
    $media.appendChild($caption);
    $link.appendChild($media);
    $medias_section.appendChild($link);

    return {
        $link,
        $media_content,
        $name
    };
}

function displayLikesAndPrice(medias, price) {
    const $bottom_like = document.querySelector('.bottom-like')
    let number_of_likes = 0
    for (let media of medias) {
        number_of_likes += media.likes
    }
    $bottom_like.textContent = number_of_likes

    const $bottom_price = document.querySelector('.bottom-price')
    $bottom_price.textContent = `${price}€ / jour`
}