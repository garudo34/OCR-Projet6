function openMedia() {
    document.getElementById("media-modal").style.display = "block";
}

// Close the Modal
function closeMedia() {
    document.querySelectorAll('.mySlides').forEach(e => e.style.display = 'none');
    document.getElementById("media-modal").style.display = "none";
}

// Next/previous controls
function moveSlide(move) {
    let slideIndex;
    const slidesList = document.querySelectorAll('.mySlides')
    for (const [i, value] of slidesList.entries()) {
        let styles = getComputedStyle(value)
        if (styles.display == 'block') {
            slideIndex = i
            break
        }
    }
    if (move > 0) {
        if (slideIndex + 1 == slidesList.length) {
            slidesList[0].style.display = "block"
        } else {
            slidesList[slideIndex + 1].style.display = "block"
        }
    } else {
        if (slideIndex - 1 < 0) {
            slidesList[slidesList.length - 1].style.display = "block"
        } else {
            slidesList[slideIndex - 1].style.display = "block"
        }
    }
    slidesList[slideIndex].style.display = "none"
}

